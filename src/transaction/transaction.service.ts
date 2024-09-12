import { Injectable } from '@nestjs/common';
import { Transaction, PrismaClient } from '@prisma/client';
import { CreateTransactionDto } from '../dto/transactions/create-transaction-dto';
import { UpdateTransactionDto } from '../dto/transactions/update-transaction-dto';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as moment from 'moment';

@Injectable()
export class TransactionService {
    private prisma = new PrismaClient();

    async findAll(): Promise<Transaction[]> {
        return await this.prisma.transaction.findMany();
    }

    async findOne(id: string): Promise<Transaction | null> {
        return await this.prisma.transaction.findUnique({
            where: { id: id.toString() },
        });
    }

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        return await this.prisma.transaction.create({
            data: createTransactionDto,
        });
    }

    async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
        return await this.prisma.transaction.update({
            where: { id: id.toString() },
            data: updateTransactionDto,
        });
    }

    async remove(id: string): Promise<Transaction> {
        return await this.prisma.transaction.delete({
            where: { id: id.toString() },
        });
    }

    async importCsv(filePath: string): Promise<void> {
        const transactions: any[] = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv({ headers: false }))
                .on('data', async (row) => {
                    const amount = parseFloat(row[1]);
                    const transactionTypeId = amount < 0 ? TransactionType.EXPENSE : TransactionType.INCOME;

                    const transaction = {
                        description: row[2],
                        amount: amount,
                        transactionDate: moment.utc(row[0], 'DD/MM/YYYY').toISOString(),
                        transactionTypeId: transactionTypeId,
                    };

                    // Check if the transaction already exists
                    const existingTransaction = await this.prisma.transaction.findUnique({
                        where: {
                            description_transactionDate: {
                                description: transaction.description,
                                transactionDate: transaction.transactionDate,
                            },
                        },
                    });

                    if (!existingTransaction) {
                        transactions.push(transaction);
                    }
                })
                .on('end', async () => {
                    try {
                        if (transactions.length > 0) {
                            await this.prisma.transaction.createMany({ data: transactions });
                        }
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }
}

export enum TransactionType {
    EXPENSE = '1405a8a0-d448-4d08-833f-ee859df3d181',
    INCOME = 'dc2fe1d7-cd9a-41e9-8bb9-20684fcd9f76'
}
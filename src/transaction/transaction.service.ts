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

    async findTransactionsBetween(budgetStartDate: string, budgetEndDate: string): Promise<Transaction[]> {
        return await this.prisma.transaction.findMany({
            where: {
                transactionDate: {
                    gte: moment.utc(budgetStartDate, 'YYYY-MM-DD').toISOString(),
                    lte: moment.utc(budgetEndDate, 'YYYY-MM-DD').toISOString(),
                },
            },
        });
    }

    async importCsv(filePath: string): Promise<void> {
        const transactions: any[] = [];
        const promises: Promise<void>[] = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv({ headers: false }))
                .on('data', async (row) => {
                    const promise = (async () => {
                        try {
                            const amount = parseFloat(row[1]);
                            const totalAmount = parseFloat(row[3]);
                            const transactionTypeId = amount < 0 ? TransactionType.EXPENSE : TransactionType.INCOME;

                            const transaction = {
                                description: row[2],
                                amount: amount,
                                transactionDate: moment.utc(row[0], 'DD/MM/YYYY').toISOString(),
                                totalAmount: totalAmount,
                                transactionTypeId: transactionTypeId,
                            };

                            // Check if the transaction already exists
                            const existingTransaction = await this.prisma.transaction.findUnique({
                                where: {
                                    description_transactionDate_amount_totalAmount: {
                                        description: transaction.description,
                                        transactionDate: transaction.transactionDate,
                                        amount: transaction.amount,
                                        totalAmount: transaction.totalAmount,
                                    },
                                },
                            });

                            if (!existingTransaction) {
                                transactions.push(transaction);
                            }
                        } catch (error) {
                            console.error(`Error processing row: ${JSON.stringify(row)}, Error: ${error.message}`);
                        }
                    })();
                    promises.push(promise);
                })
                .on('end', async () => {
                    try {
                        await Promise.all(promises);
                        console.log(`Transactions before filtering: ${transactions.length}`);

                        // Filter out duplicate transactions
                        const uniqueTransactions = transactions.filter((transaction, index, self) =>
                            index === self.findIndex((t) => (
                                t.description === transaction.description &&
                                t.transactionDate === moment.utc(transaction.transactionDate, 'DD/MM/YYYY').toISOString() &&
                                t.amount === transaction.amount &&
                                t.totalAmount === transaction.totalAmount
                            ))
                        );

                        console.log(`Transactions after filtering: ${uniqueTransactions.length}`);

                        if (uniqueTransactions.length > 0) {
                            await this.prisma.transaction.createMany({ data: uniqueTransactions });
                        }

                        // Delete the file after successful processing
                        await fs.promises.access(filePath, fs.constants.F_OK);
                        await fs.promises.unlink(filePath);
                        console.log(`File deleted successfully: ${filePath}`);
                        resolve();

                    } catch (error) {
                        if (error.code === 'P2002') {
                            console.error('Unique constraint violation:', error.meta.target);
                        } else {
                            console.error('Error inserting transactions:', error.message);
                        }
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
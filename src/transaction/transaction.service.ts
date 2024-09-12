import { Injectable } from '@nestjs/common';
import { Transaction, PrismaClient } from '@prisma/client';
import { CreateTransactionDto } from '../dto/transactions/create-transaction-dto';
import { UpdateTransactionDto } from '../dto/transactions/update-transaction-dto';

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
}
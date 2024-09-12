import { Injectable } from '@nestjs/common';
import { PrismaClient, TransactionCategory } from '@prisma/client';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category-dto';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category-dto';

@Injectable()
export class TransactionCategoryService {
    private prisma = new PrismaClient();

    async findAll(): Promise<TransactionCategory[]> {
        return await this.prisma.transactionCategory.findMany();
    }

    async findOne(id: string): Promise<TransactionCategory | null> {
        return await this.prisma.transactionCategory.findUnique({
            where: { id: id.toString() },
        });
    }

    async create(createTransactionCategoryDto: CreateTransactionCategoryDto): Promise<TransactionCategory> {
        return await this.prisma.transactionCategory.create({
            data: createTransactionCategoryDto,
        });
    }

    async update(id: string, updateTransactionCategoryDto: UpdateTransactionCategoryDto): Promise<TransactionCategory> {
        return await this.prisma.transactionCategory.update({
            where: { id: id.toString() },
            data: updateTransactionCategoryDto,
        });
    }

    async remove(id: string): Promise<TransactionCategory> {
        return await this.prisma.transactionCategory.delete({
            where: { id: id.toString() },
        });
    }
}

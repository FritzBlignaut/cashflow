import { Injectable } from '@nestjs/common';
import { PrismaClient, TransactionType } from '@prisma/client';
import { CreateTransactiontypeDto } from './dto/create-transactiontype-dto';
import { UpdateTransactiontypeDto } from './dto/update-transactiontype-dto';

@Injectable()
export class TransactionTypeService {
    private prisma = new PrismaClient();

    async findAll(): Promise<TransactionType[]> {
        return await this.prisma.transactionType.findMany();
    }

    async findOne(id: string): Promise<TransactionType | null> {
        return await this.prisma.transactionType.findUnique({
            where: { id: id.toString() },
        });
    }

    async create(createTransactionTypeDto: CreateTransactiontypeDto): Promise<TransactionType> {
        return await this.prisma.transactionType.create({
            data: createTransactionTypeDto,
        });
    }

    async update(id: string, updateTransactionTypeDto: UpdateTransactiontypeDto): Promise<TransactionType> {
        return await this.prisma.transactionType.update({
            where: { id: id.toString() },
            data: updateTransactionTypeDto,
        });
    }

    async remove(id: string): Promise<TransactionType> {
        return await this.prisma.transactionType.delete({
            where: { id: id.toString() },
        });
    }
}

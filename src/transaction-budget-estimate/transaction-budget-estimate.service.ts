import { Injectable } from '@nestjs/common';
import { PrismaClient, TransactionBudgetEstimate } from '@prisma/client';
import { UpdateTransactionBudgetEstimateDto } from './dto/update-transaction-budget-estimate';
import { CreateTransactionBudgetEstimateDto } from './dto/create-transaction-budget-estimate';

@Injectable()
export class TransactionBudgetEstimateService {
    private prisma = new PrismaClient();

    async findAll(): Promise<TransactionBudgetEstimate[]> {
        return await this.prisma.transactionBudgetEstimate.findMany();
    }

    async findOne(id: string): Promise<TransactionBudgetEstimate | null> {
        return await this.prisma.transactionBudgetEstimate.findUnique({
            where: { id: id.toString() },
        });
    }

    async create(createTransactionBudgetEstimateDto: CreateTransactionBudgetEstimateDto): Promise<TransactionBudgetEstimate> {
        return await this.prisma.transactionBudgetEstimate.create({
            data: createTransactionBudgetEstimateDto,
        });
    }

    async update(id: string, updateTransactionBudgetEstimateDto: UpdateTransactionBudgetEstimateDto): Promise<TransactionBudgetEstimate> {
        return await this.prisma.transactionBudgetEstimate.update({
            where: { id: id.toString() },
            data: updateTransactionBudgetEstimateDto,
        });
    }

    async remove(id: string): Promise<TransactionBudgetEstimate> {
        return await this.prisma.transactionBudgetEstimate.delete({
            where: { id: id.toString() },
        });
    }
}

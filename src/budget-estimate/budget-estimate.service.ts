import { Injectable } from '@nestjs/common';
import { BudgetEstimate, PrismaClient } from '@prisma/client';
import { UpdateBudgetEstimateDto } from './dto/update-budget-estimate-dto';
import { CreateBudgetEstimateDto } from './dto/create-budget-estimate-dto';

@Injectable()
export class BudgetEstimateService {
    private prisma = new PrismaClient();

    async findAll(): Promise<BudgetEstimate[]> {
        return await this.prisma.budgetEstimate.findMany();
    }

    async findOne(id: string): Promise<BudgetEstimate | null> {
        return await this.prisma.budgetEstimate.findUnique({
            where: { id: id.toString() },
        });
    }

    async create(createBudgetEstimateDto: CreateBudgetEstimateDto): Promise<BudgetEstimate> {
        return await this.prisma.budgetEstimate.create({
            data: createBudgetEstimateDto,
        });
    }

    async update(id: string, updateBudgetEstimateDto: UpdateBudgetEstimateDto): Promise<BudgetEstimate> {
        return await this.prisma.budgetEstimate.update({
            where: { id: id.toString() },
            data: updateBudgetEstimateDto,
        });
    }

    async remove(id: string): Promise<BudgetEstimate> {
        return await this.prisma.budgetEstimate.delete({
            where: { id: id.toString() },
        });
    }
}

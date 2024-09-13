import { Injectable } from '@nestjs/common';
import { Budget, PrismaClient } from '@prisma/client';
import { CreateBudgetDto } from './dto/create-budget-dto';
import { UpdateBudgetDto } from './dto/update-budget-dto';

@Injectable()
export class BudgetService {
    private prisma = new PrismaClient();

    async findAll(): Promise<Budget[]> {
        return await this.prisma.budget.findMany();
    }

    async findOne(id: string): Promise<Budget | null> {
        return await this.prisma.budget.findUnique({
            where: { id: id.toString() },
        });
    }

    async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
        createBudgetDto.setStartOfDay();
        createBudgetDto.setEndOfDay();
        return await this.prisma.budget.create({
            data: createBudgetDto,
        });
    }

    async update(id: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
        return await this.prisma.budget.update({
            where: { id: id.toString() },
            data: updateBudgetDto,
        });
    }

    async remove(id: string): Promise<Budget> {
        return await this.prisma.budget.delete({
            where: { id: id.toString() },
        });
    }
}

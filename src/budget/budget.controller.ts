import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget-dto';
import { UpdateBudgetDto } from './dto/update-budget-dto';

@Controller('budgets')
export class BudgetController {
    constructor(private readonly budgetService: BudgetService) { }

    @Get()
    async findAll() {
        return this.budgetService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.budgetService.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createBudgetDto: CreateBudgetDto) {
        return this.budgetService.create(createBudgetDto);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
        return this.budgetService.update(id, updateBudgetDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.budgetService.remove(id);
    }
}

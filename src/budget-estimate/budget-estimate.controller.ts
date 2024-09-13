import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BudgetEstimateService } from './budget-estimate.service';
import { UpdateBudgetEstimateDto } from './dto/update-budget-estimate-dto';
import { CreateBudgetEstimateDto } from './dto/create-budget-estimate-dto';

@Controller('budget-estimates')
export class BudgetEstimateController {
    constructor(private readonly budgetEstimateService: BudgetEstimateService) { }

    @Get()
    async findAll() {
        return this.budgetEstimateService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.budgetEstimateService.findOne(id);
    }

    @Post()
    async create(@Body() createBudgetEstimateDto: CreateBudgetEstimateDto) {
        return this.budgetEstimateService.create(createBudgetEstimateDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateBudgetEstimateDto: UpdateBudgetEstimateDto) {
        return this.budgetEstimateService.update(id, updateBudgetEstimateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.budgetEstimateService.remove(id);
    }
}

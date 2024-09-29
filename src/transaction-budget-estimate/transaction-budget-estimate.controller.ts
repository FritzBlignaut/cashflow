import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionBudgetEstimateService } from './transaction-budget-estimate.service';
import { UpdateTransactionBudgetEstimateDto } from './dto/update-transaction-budget-estimate';
import { CreateTransactionBudgetEstimateDto } from './dto/create-transaction-budget-estimate';

@Controller('transaction-budget-estimates')
export class TransactionBudgetEstimateController {
    constructor(private readonly transactionBudgetEstimateService: TransactionBudgetEstimateService) { }

    @Get()
    async findAll() {
        return this.transactionBudgetEstimateService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.transactionBudgetEstimateService.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createTransactionDto: CreateTransactionBudgetEstimateDto) {
        return this.transactionBudgetEstimateService.create(createTransactionDto);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionBudgetEstimateDto) {
        return this.transactionBudgetEstimateService.update(id, updateTransactionDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.transactionBudgetEstimateService.remove(id);
    }
}

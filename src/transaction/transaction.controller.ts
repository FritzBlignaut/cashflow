import { Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from '../dto/transactions/create-transaction-dto';
import { UpdateTransactionDto } from '../dto/transactions/update-transaction-dto';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Get()
    async findAll() {
        return this.transactionService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.transactionService.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionService.create(createTransactionDto);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
        return this.transactionService.update(id, updateTransactionDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.transactionService.remove(id);
    }
}
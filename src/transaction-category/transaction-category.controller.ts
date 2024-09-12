import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionCategoryService } from './transaction-category.service';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category-dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category-dto';

@Controller('transaction-categories')
export class TransactionCategoryController {
    constructor(private readonly transactionCategoryService: TransactionCategoryService) { }

    @Get()
    async findAll() {
        return this.transactionCategoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.transactionCategoryService.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createTransactionCategoryDto: CreateTransactionCategoryDto) {
        return this.transactionCategoryService.create(createTransactionCategoryDto);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Param('id') id: string, @Body() updateTransactionCategoryDto: UpdateTransactionCategoryDto) {
        return this.transactionCategoryService.update(id, updateTransactionCategoryDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.transactionCategoryService.remove(id);
    }
}

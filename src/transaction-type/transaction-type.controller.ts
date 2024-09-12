import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionTypeService } from './transaction-type.service';
import { CreateTransactiontypeDto } from './dto/create-transactiontype-dto';
import { UpdateTransactiontypeDto } from './dto/update-transactiontype-dto';

@Controller('transaction-types')
export class TransactionTypeController {
    constructor(private readonly transactionTypeService: TransactionTypeService) { }

    @Get()
    async findAll() {
        return this.transactionTypeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.transactionTypeService.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createTransactionDto: CreateTransactiontypeDto) {
        return this.transactionTypeService.create(createTransactionDto);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactiontypeDto) {
        return this.transactionTypeService.update(id, updateTransactionDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.transactionTypeService.remove(id);
    }
}

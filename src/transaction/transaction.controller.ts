import { Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, Query, Header } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from '../dto/transactions/create-transaction-dto';
import { UpdateTransactionDto } from '../dto/transactions/update-transaction-dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { extname } from 'path';
import * as fs from 'fs';
import { Multer, diskStorage } from 'multer'; // Import diskStorage from multer

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Get()
    async findAll() {
        console.log(`TEST FINDALL`);
        return this.transactionService.findAll();
    }

    @Get('between-dates')
    async findTransactionsBetween(@Query('budgetStartDate') budgetStartDate: string, @Query('budgetEndDate') budgetEndDate: string) {
        return this.transactionService.findTransactionsBetween(budgetStartDate, budgetEndDate);
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

    @Post('import')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({ // Use diskStorage instead of diskStorage
                destination: './uploads',
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    async importCsv(@UploadedFile() file: Multer.File) {
        await this.transactionService.importCsv(file.path);
        fs.unlink(file.path, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${file.path}`, err);
            }
        });
        return { message: 'CSV file processed successfully' };
    }
}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';
import { TransactionTypeController } from './transaction-type/transaction-type.controller';
import { TransactionTypeService } from './transaction-type/transaction-type.service';
import { TransactionCategoryController } from './transaction-category/transaction-category.controller';
import { TransactionCategoryService } from './transaction-category/transaction-category.service';

@Module({
  imports: [],
  controllers: [AppController, TransactionController, TransactionTypeController, TransactionCategoryController],
  providers: [AppService, TransactionService, TransactionTypeService, TransactionCategoryService],
})
export class AppModule {}

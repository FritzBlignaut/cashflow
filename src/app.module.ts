import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';
import { TransactionTypeController } from './transaction-type/transaction-type.controller';
import { TransactionTypeService } from './transaction-type/transaction-type.service';

@Module({
  imports: [],
  controllers: [AppController, TransactionController, TransactionTypeController],
  providers: [AppService, TransactionService, TransactionTypeService],
})
export class AppModule {}

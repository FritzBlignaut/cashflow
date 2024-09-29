import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';
import { TransactionTypeController } from './transaction-type/transaction-type.controller';
import { TransactionTypeService } from './transaction-type/transaction-type.service';
import { TransactionCategoryController } from './transaction-category/transaction-category.controller';
import { TransactionCategoryService } from './transaction-category/transaction-category.service';
import { BudgetController } from './budget/budget.controller';
import { BudgetService } from './budget/budget.service';
import { BudgetEstimateController } from './budget-estimate/budget-estimate.controller';
import { BudgetEstimateService } from './budget-estimate/budget-estimate.service';
import { TransactionBudgetEstimateController } from './transaction-budget-estimate/transaction-budget-estimate.controller';
import { TransactionBudgetEstimateService } from './transaction-budget-estimate/transaction-budget-estimate.service';

@Module({
  imports: [],
  controllers: [AppController, TransactionController, TransactionTypeController, TransactionCategoryController, BudgetController, BudgetEstimateController, TransactionBudgetEstimateController],
  providers: [AppService, TransactionService, TransactionTypeService, TransactionCategoryService, BudgetService, BudgetEstimateService, TransactionBudgetEstimateService],
})
export class AppModule {}

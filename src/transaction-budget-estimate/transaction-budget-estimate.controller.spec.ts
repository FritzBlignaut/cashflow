import { Test, TestingModule } from '@nestjs/testing';
import { TransactionBudgetEstimateController } from './transaction-budget-estimate.controller';

describe('TransactionBudgetEstimateController', () => {
  let controller: TransactionBudgetEstimateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionBudgetEstimateController],
    }).compile();

    controller = module.get<TransactionBudgetEstimateController>(TransactionBudgetEstimateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

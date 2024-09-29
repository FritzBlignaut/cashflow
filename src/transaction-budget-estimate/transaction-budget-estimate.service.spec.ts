import { Test, TestingModule } from '@nestjs/testing';
import { TransactionBudgetEstimateService } from './transaction-budget-estimate.service';

describe('TransactionBudgetEstimateService', () => {
  let service: TransactionBudgetEstimateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionBudgetEstimateService],
    }).compile();

    service = module.get<TransactionBudgetEstimateService>(TransactionBudgetEstimateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

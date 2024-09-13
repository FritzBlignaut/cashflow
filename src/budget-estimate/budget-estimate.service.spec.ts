import { Test, TestingModule } from '@nestjs/testing';
import { BudgetEstimateService } from './budget-estimate.service';

describe('BudgetEstimateService', () => {
  let service: BudgetEstimateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetEstimateService],
    }).compile();

    service = module.get<BudgetEstimateService>(BudgetEstimateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

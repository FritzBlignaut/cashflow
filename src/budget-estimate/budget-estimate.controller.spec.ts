import { Test, TestingModule } from '@nestjs/testing';
import { BudgetEstimateController } from './budget-estimate.controller';

describe('BudgetEstimateController', () => {
  let controller: BudgetEstimateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetEstimateController],
    }).compile();

    controller = module.get<BudgetEstimateController>(BudgetEstimateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

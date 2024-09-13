import { Test, TestingModule } from '@nestjs/testing';
import { BudgetEstimateController } from './budget-estimate.controller';
import { BudgetEstimateService } from './budget-estimate.service';

describe('BudgetEstimateController', () => {
  let controller: BudgetEstimateController;
  let service: BudgetEstimateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetEstimateController],
      providers: [
        {
          provide: BudgetEstimateService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BudgetEstimateController>(BudgetEstimateController);
    service = module.get<BudgetEstimateService>(BudgetEstimateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TransactionTypeController } from './transaction-type.controller';
import { TransactionTypeService } from './transaction-type.service';

describe('TransactionTypeController', () => {
  let controller: TransactionTypeController;
  let service: TransactionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionTypeController],
      providers: [
        {
          provide: TransactionTypeService,
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

    controller = module.get<TransactionTypeController>(TransactionTypeController);
    service = module.get<TransactionTypeService>(TransactionTypeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCategoryController } from './transaction-category.controller';
import { TransactionCategoryService } from './transaction-category.service';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category-dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category-dto';

describe('TransactionCategoryController', () => {
  let controller: TransactionCategoryController;
  let service: TransactionCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionCategoryController],
      providers: [
        {
          provide: TransactionCategoryService,
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

    controller = module.get<TransactionCategoryController>(TransactionCategoryController);
    service = module.get<TransactionCategoryService>(TransactionCategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all transaction categories', async () => {
    const result = [{ id: '1', transactionCategory: 'Test Category', description: 'Test Description', budgetId: '1', createdAt: new Date(), updatedAt: new Date() }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
  });

  it('should return a single transaction category', async () => {
    const result = { id: '1', transactionCategory: 'Test Category', description: 'Test Description', budgetId: '1', createdAt: new Date(), updatedAt: new Date() };
    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne('1')).toBe(result);
  });

  it('should create a new transaction category', async () => {
    const createTransactionCategoryDto: CreateTransactionCategoryDto = { transactionCategory: 'New Category', description: '' };
    const result = { id: '1', ...createTransactionCategoryDto, createdAt: new Date(), updatedAt: new Date(), budgetId: '' };
    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(createTransactionCategoryDto)).toBe(result);
  });

  it('should update a transaction category', async () => {
    const updateTransactionCategoryDto: UpdateTransactionCategoryDto = { transactionCategory: 'Updated Category' };
    const result = { id: '1', createdAt: new Date(), updatedAt: new Date(), budgetId: '', description: '', ...updateTransactionCategoryDto };
    jest.spyOn(service, 'update').mockResolvedValue(result as { id: string; transactionCategory: string; description: string; createdAt: Date; updatedAt: Date; budgetId: string; });

    expect(await controller.update('1', updateTransactionCategoryDto)).toBe(result);
  });

  it('should delete a transaction category', async () => {
    const result = { id: '1', transactionCategory: 'Test Category', description: '', budgetId: '', createdAt: new Date(), updatedAt: new Date() };
    jest.spyOn(service, 'remove').mockResolvedValue(result);

    expect(await controller.remove('1')).toBe(result);
  });
});

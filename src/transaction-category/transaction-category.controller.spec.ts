import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCategoryController } from './transaction-category.controller';

describe('TransactionCategoryController', () => {
  let controller: TransactionCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionCategoryController],
    }).compile();

    controller = module.get<TransactionCategoryController>(TransactionCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

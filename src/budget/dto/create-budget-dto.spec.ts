import { CreateBudgetDto } from './create-budget-dto';

describe('CreateBudget', () => {
  it('should be defined', () => {
    expect(new CreateBudgetDto()).toBeDefined();
  });
});

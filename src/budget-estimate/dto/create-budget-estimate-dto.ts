import { IsNumber, IsString, isString } from "class-validator";

export class CreateBudgetEstimateDto {
    @IsNumber()
    budgetAmount: number;

    @IsString()
    budgetId: string;

    @IsString()
    transactionCategoryId: string;
}

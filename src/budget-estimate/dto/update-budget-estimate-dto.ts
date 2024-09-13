import { IsNumber, IsString } from "class-validator";

export class UpdateBudgetEstimateDto {
    @IsNumber()
    budgetAmount: number;

    @IsString()
    budgetId: string;

    @IsString()
    transactionCategoryId: string;
}

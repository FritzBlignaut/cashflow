import { IsString } from "class-validator";

export class CreateTransactionBudgetEstimateDto {
    @IsString()
    transactionId: string;

    @IsString()
    budgetEstimateId: string;
}

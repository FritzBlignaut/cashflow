import { IsOptional, IsString } from "class-validator";

export class UpdateTransactionBudgetEstimateDto {
    @IsOptional()
    @IsString()
    transactionId: string;

    @IsOptional()
    @IsString()
    budgetEstimateId: string;
}

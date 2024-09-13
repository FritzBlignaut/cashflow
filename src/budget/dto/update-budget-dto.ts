import { IsOptional } from "class-validator";

export class UpdateBudgetDto {
    @IsOptional()
    budgetName?: string;
    budgetActive: boolean;
}

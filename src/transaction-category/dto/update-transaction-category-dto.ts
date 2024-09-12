import { IsOptional, IsString } from "class-validator";

export class UpdateTransactionCategoryDto {
    @IsOptional()
    @IsString()
    transactionCategory?: string;

    @IsOptional()
    @IsString()
    description?: string;
}

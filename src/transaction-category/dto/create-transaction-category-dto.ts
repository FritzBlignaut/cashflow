import { IsString } from "class-validator";

export class CreateTransactionCategoryDto {
    @IsString()
    transactionCategory: string;

    @IsString()
    description: string;
}

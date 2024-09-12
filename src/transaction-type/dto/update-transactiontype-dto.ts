import { IsOptional, IsString } from "class-validator";

export class UpdateTransactiontypeDto {
    @IsOptional()
    @IsString()
    transactionTypeName?: string;

    @IsOptional()
    @IsString()
    description?: string;
}

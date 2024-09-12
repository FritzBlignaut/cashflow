import { IsString } from "class-validator";

export class CreateTransactiontypeDto {
    @IsString()
    transactionTypeName: string;

    @IsString()
    description: string;
}

import { IsNumber, IsString, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ParseDatePipe } from '../../pipes/parse-date-pipe.pipe';

export class CreateTransactionDto {
    @IsNumber()
    amount: number;

    @IsString()
    transactionTypeId: string;

    @IsString()
    description: string;

    @Transform(({ value }) => new ParseDatePipe().transform(value))
    @IsDateString()
    transactionDate: string;
}
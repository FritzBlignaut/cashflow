import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ParseDatePipe } from '../../pipes/parse-date-pipe.pipe';

export class UpdateTransactionDto {
    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsString()
    transactionTypeId?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @Transform(({ value }) => new ParseDatePipe().transform(value))
    @IsDateString()
    transactionDate?: string;
}
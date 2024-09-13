import { Transform } from "class-transformer";
import { IsDateString } from "class-validator";
import { ParseDatePipe } from "../../pipes/parse-date-pipe.pipe";

export class CreateBudgetDto {
    budgetName: string;

    @Transform(({ value }) => new ParseDatePipe().transform(value))
    @IsDateString()
    budgetStartDate: string;

    @Transform(({ value }) => new ParseDatePipe().transform(value))
    @IsDateString()
    budgetEndDate: string;
    budgetActive: boolean;

    setStartOfDay(): void {
        const date = new Date(this.budgetStartDate);
        const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
        this.budgetStartDate = utcDate.toISOString();
    }

    setEndOfDay(): void {
        const date = new Date(this.budgetEndDate);
        const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - 1, 23, 59, 59, 999));
        this.budgetEndDate = utcDate.toISOString();
    }
}

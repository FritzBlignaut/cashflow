import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any) {
    const date = moment.utc(value, 'MM/DD/YYYY', true);
    if (!date.isValid()) {
      throw new BadRequestException('transactionDate must be a valid date in MM/DD/YYYY format');
    }
    return date.toISOString();
  }
}
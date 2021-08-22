import { FormatHelper } from './../formatters/format-helper';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'datetimezone' })
export class DateTimezonePipe implements PipeTransform {
    transform(value: any, timezone?: string): any {
        if (value) {
            return FormatHelper.formatDateWithTimezone(value, timezone);
        }

        return value;
    }
}

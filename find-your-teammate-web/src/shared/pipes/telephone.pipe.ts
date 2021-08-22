import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'telephone'})
export class TelephonePipe implements PipeTransform {
    transform(value: string): any {
        if (value) {
            const maskedValue = value.replace(/\D/g, '');
            if (maskedValue.length === 10) {
                return `(${maskedValue.substring(0, 2)}) ${maskedValue.substring(2, 6)}-${maskedValue.substring(6, 10)}`;

            } else if (maskedValue.length === 11) {
                return `(${maskedValue.substring(0, 2)}) ${maskedValue.substring(2, 7)}-${maskedValue.substring(7, 11)}`;

            } else {
                return value;
            }
        }

        return '';
    }
}

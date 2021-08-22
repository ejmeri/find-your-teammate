import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
    name: 'coin'
})
export class CoinPipe implements PipeTransform {
    private decimalPipe: DecimalPipe = new DecimalPipe('pt-BR');

    transform(value: any): string {
        if (value !== null) {
            return this.decimalPipe.transform(Number(value), '1.2-2');
        }
        return '';
    }
}

import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({ name: 'amount' })
export class AmountPipe implements PipeTransform {
  private pipe: DecimalPipe = new DecimalPipe('pt-BR');
  transform(amount: any): any {
    if (!amount) return '0,00';
    let value = 0;
    if (amount.points)
      value = amount.points;
    else if (amount.currency)
      value = amount.currency;
    else if (amount < 0 || amount > 0)
      value = amount;
    return this.pipe.transform(value, '1.2-2');
  }
}

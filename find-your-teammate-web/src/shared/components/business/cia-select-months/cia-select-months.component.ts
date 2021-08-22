import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from 'src/shared/models/item';

@Component({
  selector: 'cia-select-months',
  templateUrl: './cia-select-months.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CiaSelectMonthsComponent),
      multi: true,
    },
  ],
})
export class CiaSelectMonthsComponent implements OnInit, ControlValueAccessor {
  
  @Input() multiple: boolean;
  @Input() required: boolean;
  @Input() disabled: boolean;

  months: Array<Item> = [
    Item.of('JANUARY', 'Janeiro'),
    Item.of('FEBRUARY', 'Fevereiro'),
    Item.of('MARCH', 'Março'),
    Item.of('APRIL', 'Abril'),
    Item.of('MAY', 'Maio'),
    Item.of('JUNE', 'Junho'),
    Item.of('JULY', 'Julho'),
    Item.of('AUGUST', 'Agosto'),
    Item.of('SEPTEMBER', 'Setembro'),
    Item.of('OCTOBER', 'Outubro'),
    Item.of('NOVEMBER', 'Novembro'),
    Item.of('DECEMBER', 'Dezembro'),
  ];

  private _value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  ngOnInit(): void {}

  get value() {
    return this._value;
  }

  set value(val: any) {
    if (this._value !== val) {
      this._value = val;
      let value = val;
      if (val && val.length && val.map) {
        value = val.map((v) => (v && v.id ? v.id : v));
      }
      //  else if (val instanceof SelectItem) {
      //   value = val.id;
      // }
      this.onChange(value);
      this.onTouched();
      // this.emitSelectedItem(value);
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value !== this._value) {
      this._value = value;
    }
  }
}

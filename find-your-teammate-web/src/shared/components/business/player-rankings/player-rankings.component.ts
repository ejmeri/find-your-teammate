import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from 'src/shared/models/item';

@Component({
  selector: 'player-rankings',
  templateUrl: './player-rankings.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PlayerRankingsComponent),
      multi: true,
    },
  ],
})
export class PlayerRankingsComponent implements OnInit, ControlValueAccessor {
  
  @Input() multiple: boolean = false;
  @Input() required: boolean;
  @Input() disabled: boolean;

  rankings: Array<Item> = [
    Item.of('Silver', 'Prata'),
    Item.of('Gold', 'Ouro'),
    Item.of('AK', 'Ak'),
    Item.of('Sherif', 'Xerife'),
    Item.of('Eagle', 'Águia'),
    Item.of('Supreme', 'Supremo'),
    Item.of('Global', 'Global'),
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

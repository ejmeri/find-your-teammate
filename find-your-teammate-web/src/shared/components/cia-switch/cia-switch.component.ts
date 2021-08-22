import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cia-switch',
  templateUrl: './cia-switch.component.html',
  styleUrls: ['./cia-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CiaSwitchComponent),
      multi: true
    }
  ]
})
export class CiaSwitchComponent {
  @Output('onchange') changeEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input('label') label: string = 'Ativo';
  @Input('color') color: string = 'primary';
  @Input('labelTrue') labelTrue: string = 'Sim';
  @Input('labelFalse') labelFalse: string = 'Não';

  @Input('disabled') disabled: boolean = false;

  private _value: boolean;

  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this._value;
  }

  set value(val: boolean) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
    this.changeEmitter.emit(val);
  }

  get textValue() {
    return this._value ? this.labelTrue : this.labelFalse;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    this._value = value == true;
  }

  handleChange(event) {
    if (event && event.checked) {
      this.value = event.checked == true;
    }
    else {
      this.value = false;
    }
  }
}

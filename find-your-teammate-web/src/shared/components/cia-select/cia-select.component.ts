import { Item } from './../../models/item';
import { Component, OnInit, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'cia-select',
  templateUrl: 'cia-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CiaSelectComponent),
      multi: true,
    },
  ],
})
export class CiaSelectComponent implements OnInit, ControlValueAccessor {
  @Input('id') dropdownId: string;
  @Input() placeholder: string = '';
  @Input() appearance: string = 'outline';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() bottom: boolean = false;

  @Output('change') changeEvent: EventEmitter<any> = new EventEmitter();
  @Output('select') selectEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input() searchable: boolean = false;
  @Input() multiple: boolean = false;
  @Input() scroll: boolean = false;
  @Input() loading: boolean = false;
  @Input() loadingText: string = 'Carregando...';
  @Input() emptyMessage: string = 'Sem items';

  _items: Array<Item> = [];
  currentItems: Array<Item> = [];

  private _valueToSet: any = null;
  private _value: any = null;

  onChange: any = (_: any) => {};
  onTouched: any = () => {};

  ngOnInit(): void {}

  get handleBottom() {
    if (this.bottom) {
      return '0px';
    }
  }

  get handlePlaceholder() {
    if (this.required) {
      return `${this.placeholder} *`;
    }
    return this.placeholder;
  }

  get value() {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
    this.emitSelectedItem(val);
  }

  get items() {
    return this._items;
  }

  @Input()
  set items(items: Array<Item>) {
    this._items = items;
    if (this._valueToSet) {
      this.setByIds(this._valueToSet);
      this._valueToSet = null;
    }
  }

  onBlur() {
    this.onTouched();
  }

  refreshItems(val) {
    if (this.multiple) {
      if (!val || !val.length) {
        this.currentItems = [];
        this.value = null;
      } else {
        this.currentItems = val;
        this.value = val.map((i) => i.id);
      }
    } else {
      if (!val || !val.id) {
        this.currentItems = [];
        this.value = null;
      } else {
        this.currentItems = [val];
        this.value = val.id;
      }
    }
    this.changeEvent.emit(this.value);
  }

  onItemRemove(item: Item | null) {
    if (item) {
      if (this.multiple && this.currentItems && this.currentItems.length > 0)
        this.currentItems = this.currentItems.filter((i) => i.id != item.id);
      else this.currentItems = [];
    }
  }

  getItemById(id: any): Item | null {
    if (!id) return null;
    if (this.currentItems.length > 0 && this.currentItems[0] && id == this.currentItems[0].id) {
      return this.currentItems[0];
    }
    if (this._items && this._items.length) {
      let item = this._items.find((i) => i.id == id);
      if (item) {
        return item;
      }
    }
    return null;
  }

  private setByIds(ids: any[]) {
    if (this.multiple) {
      this.currentItems = [];
      if (ids && ids.length) {
        let foundItems = this._items.filter((i) => ids.indexOf(i.id) >= 0);
        if (foundItems && foundItems.length) {
          this.currentItems = foundItems;
          this._value = this.currentItems.map((i) => i);
        } else {
          this._value = [];
        }
      } else {
        this._value = [];
      }
    } else {
      let item = this.getItemById(ids);
      if (item && item.id) {
        this._value = item.id;
        this.currentItems = [item];
      } else {
        this._value = null;
        this.currentItems = [];
      }
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value === this._value) {
      return;
    }
    if (value && (!this._items || this._items.length == 0)) {
      this._valueToSet = value;
      return;
    }
    this.setByIds(value);
  }

  private emitSelectedItem(value: any) {
    if (value) {
      const item = this.items.find((item) => item.id === value);
      if (item) {
        this.selectEmitter.emit({
          id: value,
          text: item.text,
        });
      }
    }
  }
}

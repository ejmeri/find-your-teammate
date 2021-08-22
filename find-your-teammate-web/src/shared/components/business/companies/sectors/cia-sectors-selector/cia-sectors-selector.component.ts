import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from 'src/shared/models/item';
import { CompanyService } from '../../../company.service';


@Component({
  selector: 'cia-sectors-selector',
  template: `<cia-select
    scroll="true"
    [id]="dropdownId"
    [items]="sectors"
    [multiple]="multiple"
    [(ngModel)]="value"
    [placeholder]="placeholder"
  ></cia-select>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CiaSectorsSelectorComponent),
      multi: true,
    },
  ],
})
export class CiaSectorsSelectorComponent implements OnInit, ControlValueAccessor {
  @Output('error') errorEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('select') selectEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input('id') dropdownId: string = 'sectorId';
  @Input() bindValue: string = 'id';
  @Input() bindLabel: string = 'text';
  @Input() multiple: boolean = false;
  @Input() placeholder: string = 'Setores';
  @Input() items: any[];

  loading: boolean = false;

  sectorName: string = null;
  sectors: Array<Item> = [];

  private _value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    if (this.items && this.items.length > 0) {
      this.sectors = this.items.map((item) => new Item(item.id, item.name));
    } else {
      this.loadSectors();
    }
  }

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
      this.emitSelectedItem(value);
    }
  }

  private emitSelectedItem(value: any) {
    if (value) {
      const sector = this.sectors.find((g) => g.id === value);
      if (sector) {
        this.selectEmitter.emit({
          id: value,
          name: sector.text,
        });
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
    if (value !== this._value) {
      this._value = value;
    }
  }

  loadSectors() {
    this.loading = true;
    this.companyService.findSectors(true).subscribe(
      (sectors) => {
        if (sectors) {
          this.sectors = sectors.map((sector) => new Item(sector.id, sector.name));
        }
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.errorEmitter.emit(err);
      }
    );
  }
}

import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from 'src/shared/models/item';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'cia-companies-selector',
  template: `<cia-select
    scroll="true"
    [id]="dropdownId"
    [required]="required"
    [items]="companies"
    [multiple]="multiple"
    [(ngModel)]="value"
    [placeholder]="placeholder"
  ></cia-select>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CiaCompaniesSelectorComponent),
      multi: true,
    },
  ],
})
export class CiaCompaniesSelectorComponent implements OnInit, ControlValueAccessor {
  @Output('error') errorEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('select') selectEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input('id') dropdownId: string = 'companyId';
  @Input() bindValue: string = 'id';
  @Input() bindLabel: string = 'text';
  @Input() multiple: boolean = false;
  @Input() placeholder: string = 'Empresas';
  @Input() items: any[];
  @Input() required: boolean;

  loading: boolean = false;

  companyName: string = null;
  companies: Array<Item> = [];

  private _value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    if (this.items && this.items.length > 0) {
      this.companies = this.items.map((item) => new Item(item.id, item.corporateName));
    } else {
      this.loadCompanies();
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
      const company = this.companies.find((g) => g.id === value);
      if (company) {
        this.selectEmitter.emit({
          id: value,
          name: company.text,
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

  writeValue(value: any) {
    if (value !== this._value) {
      this._value = value;
    }
  }

  loadCompanies() {
    this.loading = true;
    this.companyService.findAllCompanies().subscribe(
      (companies) => {
        if (companies) {
          this.companies = companies.map((company) => new Item(company.id, company.corporateName));
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

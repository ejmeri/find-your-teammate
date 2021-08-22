import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from 'src/shared/models/item';
import { CompanyService } from '../../../company.service';

@Component({
  selector: 'cia-company-sectors-selector',
  templateUrl: './cia-company-sectors-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CiaCompanySectorsSelectorComponent),
      multi: true,
    },
  ],
})
export class CiaCompanySectorsSelectorComponent implements OnInit {
  @Output('error') errorEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('selected') selectEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input('id') dropdownId: string = 'sectorId';
  @Input() bindValue: string = 'id';
  @Input() bindLabel: string = 'text';
  @Input() multiple: boolean = false;
  @Input() placeholder: string = 'Setores';
  @Input() loading: boolean = false;
  @Input() loadingText: string = 'Carregando...';
  @Input() required: boolean = false;

  @Input()
  set companyId(v: string) {
    this._companyId = v || '';
    this.loadDepartments();
  }

  _companyId: string;
  sectors: Array<Item> = [];

  private _value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private companyService: CompanyService) {}

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

  loadDepartments() {
    if (!this._companyId) {
      return null;
    }

    
    this.loading = true;
    this.companyService.findCompanySectors(this._companyId).subscribe(
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

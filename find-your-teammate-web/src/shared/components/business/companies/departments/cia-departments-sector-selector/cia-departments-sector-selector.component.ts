import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from 'src/shared/models/item';
import { CompanyService } from '../../../company.service';

@Component({
  selector: 'cia-departments-sector-selector',
  templateUrl: './cia-departments-sector-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CiaDepartmentsSectorSelectorComponent),
      multi: true,
    },
  ],
})
export class CiaDepartmentsSectorSelectorComponent implements OnInit {
  @Output('error') errorEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('selected') selectEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('onRefreshItems') onRefreshItems: EventEmitter<any> = new EventEmitter<any>();

  @Input('id') dropdownId: string = 'departmentId';
  @Input() bindValue: string = 'id';
  @Input() bindLabel: string = 'text';
  @Input() multiple: boolean = false;
  @Input() placeholder: string = 'Departamentos';
  @Input() loading: boolean = false;
  @Input() loadingText: string = 'Carregando...';
  @Input() required: boolean = false;
  
  @Input()
  set sectorId(v: string) {
    this._sectorId = v || '';
    this.loadDepartments();
  }

  _sectorId: string;
  departments: Array<Item> = [];

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
      const sector = this.departments.find((g) => g.id === value);
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

  refreshItems(sectorId: string) {
    this._sectorId = sectorId;
    this.loadDepartments();
  }

  loadDepartments() {    
    if (!this._sectorId) {
      this.departments = null;
      return null;
    }

    this.loading = true;
    this.companyService.findDepartments({ sectorId: this._sectorId, active: true }).subscribe(
      (departaments) => {
        if (departaments) {
          this.departments = departaments.map((department) => new Item(department.id, department.name));
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

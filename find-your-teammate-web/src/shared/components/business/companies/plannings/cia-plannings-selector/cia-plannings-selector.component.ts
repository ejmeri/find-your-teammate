import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from 'src/shared/models/item';
import { CompanyService } from '../../../company.service';

@Component({
  selector: 'cia-plannings-selector',
  templateUrl: './cia-plannings-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CiaPlanningsSelectorComponent),
      multi: true,
    },
  ],
})
export class CiaPlanningsSelectorComponent implements OnInit {
  @Output('error') errorEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('selected') selectEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('onRefreshItems') onRefreshItems: EventEmitter<any> = new EventEmitter<any>();

  @Input('id') dropdownId: string = 'planningId';
  @Input() bindValue: string = 'id';
  @Input() bindLabel: string = 'text';
  @Input() multiple: boolean = false;
  @Input() placeholder: string = 'Planejamentos';
  @Input() loading: boolean = false;
  @Input() loadingText: string = 'Carregando...';
  @Input() required: boolean = false;

  @Input()
  set companyId(v: string) {
    this._companyId = v || '';
    this.loadPlannings();
  }

  _companyId: string;
  plannings: Array<Item> = [];

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
      const planning = this.plannings.find((g) => g.id === value);
      if (planning) {
        this.selectEmitter.emit({
          id: value,
          name: planning.text,
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

  refreshItems(companyId: string) {
    this._companyId = companyId;
    this.loadPlannings();
  }

  loadPlannings() {
    if (!this._companyId) {
      this.plannings = null;
      return null;
    }

    this.loading = true;
    this.companyService.findCompanyPlannings(this._companyId).subscribe(
      (plannings) => {
        if (plannings) {
          this.plannings = plannings.map((planning) => new Item(planning.id, planning.name));
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

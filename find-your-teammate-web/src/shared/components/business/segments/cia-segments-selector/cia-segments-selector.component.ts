import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from 'src/shared/models/item';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'cia-segments-selector',
  template: '<cia-select scroll="true" searchable="true" [id]="dropdownId" [items]="segments" [multiple]="multiple" [(ngModel)]="value" [placeholder]="placeholder"></cia-select>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CiaSegmentsSelectorComponent),
      multi: true
    }
  ]
})
export class CiaSegmentsSelectorComponent implements OnInit, ControlValueAccessor {
  @Output('error') errorEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('select') selectEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input('id') dropdownId: string = 'segmentId';
  @Input() placeholder: string = 'Ramo de Atividade'
  @Input() multiple: boolean = false;

  loading: boolean = false;

  segments: Array<Item> = [];

  private _value: any;
  onChange: any = () => { };
  onTouched: any = () => { };


  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.loadSegments();
  }


  get value() {
    return this._value;
  }

  set value(val: any) {
    if (this._value !== val) {
      this._value = val;
      let value = val;
      if (val && val.length && val.map) {
        value = val.map(v => v && v.id ? v.id : v);
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
      const segment = this.segments.find((g) => g.id === value);
      if (segment) {
        this.selectEmitter.emit({
          id: value,
          name: segment.text,
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

  loadSegments() {
    this.loading = true;
    this.companyService.findSegments("true").subscribe(
      segments => {
        if (segments) {
          this.segments = segments.map(segment => new Item(segment.id, segment.name));
        }
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.errorEmitter.emit(err);
      }
    );
  }

}

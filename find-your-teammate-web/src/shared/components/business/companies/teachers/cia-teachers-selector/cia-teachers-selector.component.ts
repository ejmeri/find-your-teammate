import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from 'src/shared/models/item';
import { TeachersService } from '../../../teachers.service';

@Component({
  selector: 'cia-teachers-selector',
  template:
    '<cia-select scroll="true" searchable="true" [disabled]="disabled" [id]="dropdownId" [items]="teachers" [multiple]="multiple" [(ngModel)]="value" [placeholder]="placeholder"></cia-select>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CiaTeachersSelectorComponent),
      multi: true,
    },
  ],
})
export class CiaTeachersSelectorComponent implements OnInit, ControlValueAccessor {
  @Output('error') errorEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('select') selectEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input('id') dropdownId: string = 'teacherId';
  @Input() placeholder: string = 'Professores';
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;

  loading: boolean = false;

  teachers: Array<Item> = [];

  private _value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private teacherService: TeachersService) {}

  ngOnInit(): void {
    this.loadRoles();
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
      const role = this.teachers.find((role) => role.id === value);
      if (role) {
        this.selectEmitter.emit({
          id: value,
          name: role.text,
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

  loadRoles() {
    this.loading = true;
    this.teacherService.findTeachers().subscribe(
      (teachers) => {
        if (teachers) {
          this.teachers = teachers.map((teacher) => new Item(teacher.id, teacher.name));
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

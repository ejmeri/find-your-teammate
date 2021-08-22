import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from 'src/shared/models/item';
import { UsersAdminService } from '../../users-admin.service';

@Component({
  selector: 'cia-users-admin-profiles-selector',
  template: `<cia-select
    scroll="true"
    searchable="true"
    [id]="dropdownId"
    [items]="usersAdminProfiles"
    [multiple]="multiple"
    [(ngModel)]="value"
    [placeholder]="placeholder"
  ></cia-select>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CiaUsersAdminProfilesSelectorComponent),
      multi: true,
    },
  ],
})
export class CiaUsersAdminProfilesSelectorComponent implements OnInit {
  @Output('error') errorEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('select') selectEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input('id') dropdownId: string = 'usersAdminProfileId';
  @Input() placeholder: string = 'Perfis de Acesso';
  @Input() multiple: boolean = false;

  loading: boolean = false;

  usersAdminProfiles: Array<Item> = [];

  private _value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  profileName: string = '';

  constructor(private usersAdminService: UsersAdminService) {}

  ngOnInit(): void {
    this.loadUsersAdminProfiles();
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
      const usersAdminProfile = this.usersAdminProfiles.find((profile) => profile.id === value);
      if (usersAdminProfile) {
        this.selectEmitter.emit({
          id: value,
          name: usersAdminProfile.text,
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

  loadUsersAdminProfiles() {
    this.usersAdminService.findUsersAdminProfiles().subscribe(
      (usersAdminProfiles) => {
        if (usersAdminProfiles) {
          this.usersAdminProfiles = usersAdminProfiles.map((profile) => new Item(profile.id, profile.name));
        }
      },
      (err) => {
        this.errorEmitter.emit(err);
      }
    );
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cia-grid',
  templateUrl: 'cia-grid.component.html',
  styleUrls: ['cia-grid.component.scss']
})
export class CiaGridComponent implements OnInit {
  @Input() rows: Array<any>;
  @Input() columns: Array<string>;
  @Input() fields: Array<any>;
  @Input() showPagination: boolean = false;
  @Input() loading: boolean = false;

  @Input() showEdit: boolean = false;
  @Input() showDetail: boolean = false;
  @Input() showDelete: boolean = false;
  @Input() showInactive: boolean = false;
  @Input() showActiveEvent: boolean = false;
  @Input() showTooltip: boolean = false;
  @Input() showActive: boolean = false;

  @Input() colorCustom: string = '';

  @Input() showCustom: boolean = false;
  @Input() customTitle: boolean = true;
  @Input() customIcon: string = '';
  @Input() customTooltip: string = '';


  @Input() showTotalPages: boolean = true;
  @Input() activeField: string = 'active';
  @Input() activeText: string = 'Ativo';
  @Input() inactiveText: string = 'Inativo';
  @Input() activeHeaderText: string = 'Status';
  @Input() emptyMessage: string = 'Nenhum registro encontrado.';

  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDetail: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onCustom: EventEmitter<any> = new EventEmitter();
  @Output() onInactive: EventEmitter<any> = new EventEmitter();
  @Output() onPageChanged: EventEmitter<any> = new EventEmitter();


  _totalRecords: number = 0;
  @Input()
  set totalRecords(v: number) {
    this._totalRecords = v || 0;
    this.calculateTotalPages();
  }

  _pageSize: number = 10;
  @Input()
  set pageSize(v: number) {
    this._pageSize = v || 10;
    this.calculateTotalPages();
  }

  numCols: number = 1;
  currentPage: number = 1;
  totalPages = Math.ceil(Number(this._totalRecords) / Number(this._pageSize));

  ngOnInit() {
    if (!this.hasRows) {
      this.rows = [];
    }

    if (this.fields && this.fields.length > 0) {
      this.numCols = this.fields.length + (this.showEdit || this.showDelete || this.showCustom ? 1 : 0)
        + (this.showActive ? 1 : 0);
    }
  }

  calculateTotalPages() {
    if (!this._totalRecords || !this._pageSize) {
      this.totalPages = 1;
      return;
    }
    this.totalPages = Math.ceil(
      Number(this._totalRecords) / Number(this._pageSize)
    );
  }

  get showActions(): boolean {
    return this.showEdit || this.showDelete || this.showCustom || this.showDetail;
  }

  getFieldValue(value: any, field: any) {
    if (!value || !field) return null;
    let bootstrapClass = '';
    if (field.indexOf('|')) {
      const spplited = field.split('|');
      field = spplited[0];
      if (spplited[1] === 'sla') {
        bootstrapClass = this.calculateSlaStatus(value[field]);
      }
    }

    /*if (field instanceof Function) {
      return field(value);
    } else*/ if (field.indexOf('.') > 0) {
      let fields = field.split('.');
      let size = fields.length;
      for (let i = 0; i < size; i++) {
        value = value[fields[i]];
        if (!value) break;
      }

      return value;
    }
    if (!bootstrapClass) {
      return value[field];
    } else {
      return `<div class='label label-${bootstrapClass}' style='font-size: 13px; padding: 8px 10px'>${value[field]}</div>`;
    }
  }

  renderActive(row: any) {
    if (row[this.activeField])
      return `<div class='label label-success'>${this.activeText}</div>`;
    else return `<div class='label label-danger'>${this.inactiveText}</div>`;
    // return `<i class="fas fa-circle fa-2x text-center text-success" title="Ativo"></i>`;
    // else return `<i class="fas fa-circle fa-2x text-center  text-danger" title="Inativo"></i>`;
  }

  get renderPaginationText() {
    if (this.showTotalPages)
      return `Página ${this.currentPage} de ${this.totalPages}`;
    else return `Página ${this.currentPage}`;
  }

  get renderCustomIcon() {
    // return `fa fa-${this.customIcon} left-5`;
    // return `fa fa-${this.customIcon}`;
    return this.customIcon;
  }

  get renderEditTooltip() {
    if (this.showTooltip) return 'Visualizar';
    return '';
  }

  get renderDeleteTooltip() {
    if (this.showTooltip) return 'Excluir';
    return '';
  }

  get renderCustomTooltip() {
    if (this.showTooltip) return this.customTooltip;
    return '';
  }

  onPrevious() {
    if (this.currentPage > 1) this.currentPage -= 1;

    const skip = (this.currentPage - 1) * this._pageSize;
    const limit = this._pageSize;

    this.onPageChanged.emit({ currentPage: this.currentPage, skip, limit });
  }

  onNext() {
    if (this.currentPage < this.totalPages) this.currentPage += 1;
    else if (!this.showTotalPages) this.currentPage += 1;

    const skip = (this.currentPage - 1) * this._pageSize;
    const limit = this._pageSize;

    this.onPageChanged.emit({ currentPage: this.currentPage, skip, limit });
  }

  onEditButton(data) {
    this.onEdit.emit(data);
  }

  onDetailButton(data) {
    this.onDetail.emit(data);
  }

  onDeleteButton(data) {
    this.onDelete.emit(data);
  }

  onCustomButton(data) {
    this.onCustom.emit(data);
  }

  onInactiveButton(data) {
    this.onInactive.emit(data);
  }

  resetPagination() {
    this.currentPage = 1;
  }

  private calculateSlaStatus(formattedPercent: string): string {
    if (formattedPercent) {
      let percent = null;
      if (formattedPercent.indexOf('%')) {
        percent = Number(formattedPercent.split('%')[0]);
      } else {
        percent = Number(formattedPercent);
      }
      if (percent <= 50) return 'success';
      if (percent <= 80) return 'warning';
      return 'danger';
    }

    return '';
  }

  get hasRows() {
    return this.rows && this.rows.length > 0;
  }
}

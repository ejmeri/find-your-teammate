import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cia-spinner-button',
  templateUrl: './cia-spinner-button.component.html',
  styleUrls: ['cia-spinner-button.component.scss'],
})
export class CiaSpinnerButtonComponent implements OnInit {
  @Input() type: string = 'button';
  @Input() text: string;
  @Input() className: string = 'mat-raised-button';
  @Input() icon: string;

  @Input() color: string = 'primary';
  @Input() bootstrapClass: string;
  @Input() buttonClass: string;

  @Input() loading: boolean;
  @Input() disabled: boolean;
  @Input() loadingText: string;
  @Input() showSpinner: boolean = true;

  @Input() pull?: string;
  @Input() block: boolean = false;
  @Input() size: string;

  @Input() marginRight: string = '-12px';
  @Input() marginLeft: string = '-12px';
  @Input() marginBottom: string;
  @Input() marginTop: string;
  @Input() height: string;

  @Input() responsive: boolean = false;
  @Input() search: boolean = false;
  @Input() clear: boolean = false;

  @Input() inline: boolean = false;
  @Input('positionIcon') positionIcon: string = 'afterText';

  constructor() {}

  ngOnInit() {
    if (!this.text) {
      this.text = '';
    }

    if (this.search) {
      this.icon = 'search';
      this.text = 'Pesquisar';
    }

    if (this.inline) {
      this.marginTop = '3px';
      if (!this.height) this.height = '50px';
    }

    if (!this.loadingText) {
      this.loadingText = this.text;
    }

    if (this.buttonClass) {
      this.className = '';
      this.className = this.className.concat(` ${this.buttonClass}`);
    }

    if (this.color) {
      this.className = this.className.concat(` mat-${this.color}`);
    }

    if (this.size) {
      this.className = this.className.concat(` btn-${this.size}`);
    }

    if (this.pull) {
      this.className = this.className.concat(` pull-${this.pull}`);
    }

    if (this.block) {
      this.className = this.className.concat(' btn-block');
    }

    if (this.responsive) {
      this.className = this.className.concat(` btn-responsive`);
    }

    if (this.bootstrapClass) {
      this.className = this.className.concat(` btn-${this.bootstrapClass}`);
    }
  }

  get currentText(): string {
    if (this.loading) return this.loadingText;
    return this.text;
  }

  get currentIcon(): string {
    return `${this.icon}`; // ti- fas fa
  }

  get hideIcon(): boolean {
    return this.show || !this.icon;
  }

  get show(): boolean {
    return this.showSpinner && this.loading;
  }

  get iconMargin(): string {
    if (this.text) return '5px';
    return '0px';
  }
}

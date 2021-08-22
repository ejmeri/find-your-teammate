import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cia-spinner',
  template: `
    <div [class]="outerdivSpinnerClass" *ngIf="show">
      <div [class]="divSpinnerClass">
          <i [class]="className" style="color: #61c2cb;" aria-hidden="true"></i>
      </div>
    </div>
  `,
  styleUrls: ['cia-spinner.component.scss']
})
export class CiaSpinnerComponent implements OnInit {

  @Input()
  public show: boolean = false;
  @Input()
  public size: string = '5';
  @Input()
  public overlay: boolean = false;

  @Input('loader-class')
  public divSpinnerClass: string;

  outerdivSpinnerClass: string = 'div-spinner';
  className: string;

  ngOnInit(): void {
    this.className = `fas fa-redo-alt fa-spin fa-fw fa-${this.size}x spinner`;
    if (this.overlay) {
      this.outerdivSpinnerClass = '';
      this.divSpinnerClass = 'loading-overlay';
    } else {
      this.divSpinnerClass = 'app-spinner';
    }
  }

}

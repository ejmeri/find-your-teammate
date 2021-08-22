import { Component, Input, AfterContentInit } from '@angular/core';

@Component({
  selector: 'cia-form-col',
  template: `<div [class]="classed">
            <ng-content></ng-content>
        </div>`
})
export class CiaFormColComponent implements AfterContentInit {

  @Input('cols') cols: string = '12 12 6 6';
  @Input() inputGroup: boolean = false;
  @Input('additionalClasses') additionalClasses: string | null = null;

  classed: string;

  @Input('classes')
  set classes(classes: string) {
    this.additionalClasses = classes;
  }

  ngAfterContentInit() {
    if (this.inputGroup)
      this.classed = 'form-group ';
    else
      this.classed = '';

    const splitted = this.cols.split(' ');
    if (splitted[0]) {
      this.classed += `col-xl-${splitted[0]} `;
      if (splitted[1]) {
        this.classed += `col-lg-${splitted[1]} `;
        if (splitted[2]) {
          this.classed += `col-md-${splitted[2]} `;
          if (splitted[3]) { 
            this.classed += `col-sm-${splitted[3]} `;
          }
        }
      }
    } else {
      this.classed += 'col-xs-12 ';
    }
    if (this.additionalClasses) {
      this.classed += this.additionalClasses;
    }
  }
}

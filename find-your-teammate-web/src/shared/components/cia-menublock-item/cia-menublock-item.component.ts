import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cia-menublock-item',
  templateUrl: './cia-menublock-item.component.html',
  styleUrls: ['./cia-menublock-item.component.scss']
})
export class CiaMenublockItemComponent implements OnInit {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() size: string = 'xs';

  @Input() color: string = 'text-cia';

  textClass: string = '';
  iconClass: string = 'fa fa-';
  materialIconClass: string = '';

  ngOnInit() {
    let iconSize = '3';
    if (this.size) {
      if (this.size == 'lg') {
        iconSize = '5';
      } else if (this.size == 'md') {
        iconSize = '4';
      } else if (this.size == 'xs') {
        iconSize = '2';
      }
    }
    if (!this.icon) {
      this.icon = '';
    }
    this.iconClass = `fa fa-${iconSize}x fa-${this.icon} mb-${this.size}`;
    this.materialIconClass = this.icon;
    this.textClass = this.textClass.concat(this.color);
  }
}

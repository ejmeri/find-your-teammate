import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cia-expansion-panel',
  templateUrl: './cia-expansion-panel.component.html'
})
export class CiaExpansionPanelComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() icon: string;
  @Input() expanded: boolean;
  constructor() { }

  ngOnInit(): void {
  }


  get handleIcon() {
      return `fas fa-${this.icon}`;
  }

}

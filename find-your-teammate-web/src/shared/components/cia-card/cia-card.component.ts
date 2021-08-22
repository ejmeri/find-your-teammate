import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cia-card',
  templateUrl: './cia-card.component.html',
  styleUrls: ['./cia-card.component.scss']
})
export class CiaCardComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() first: boolean = false;
  @Input() intern: boolean = false;
  @Input() divider: boolean = false;

  classes: string = 'card ';
  constructor() { }

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses() {
    this.isFirst();
    this.isIntern();
  }

  isFirst() {
    if (this.first) {
      this.classes += 'top-radius-none ';
    }
  }

  isIntern() {
    if (this.intern) {
      this.classes += 'card-intern ';
    }
  }

}

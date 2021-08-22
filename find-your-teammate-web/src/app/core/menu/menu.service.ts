import { Injectable } from '@angular/core';
import { RouteInfo } from 'src/app/layout/sidebar/sidebar.metadata';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuItems: Array<RouteInfo>;

  constructor() {
    this.menuItems = [];
  }

  addMenu(items: Array<RouteInfo>) {
    items.forEach((item) => {
      this.menuItems.push(item);
    });
  }

  getMenu() {
    return this.menuItems;
  }

  clearMenu() {
    this.menuItems = [];
  }
}

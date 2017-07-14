import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PromosPage, ProductInfoPage } from '../pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  products = [
    {name: 'XPS-13', price: 1000},
    {name: 'Monitor', price: 250}
  ]

  constructor(private nav: NavController, private navParams: NavParams) {

  }

  itemTapped(event, product){
    this.nav.push(ProductInfoPage, product);
  }

}

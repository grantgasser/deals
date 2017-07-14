import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {ProductInfoPage } from '../pages';

import { Service } from '../../app/shared/shared';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  products: any;
  myInput: string;

  constructor(private nav: NavController, private myService: Service) {

  }

  itemTapped(event, product){
    this.nav.push(ProductInfoPage, product);
  }

  ionViewDidLoad(){
        this.myService.getProducts().then(data => this.products = data);
  }

}

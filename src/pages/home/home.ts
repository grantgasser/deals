import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProductInfoPage } from '../pages';

import { Service } from '../../app/shared/shared';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  products: any;
  myInput: string;
  browser: any;

  constructor(private nav: NavController, private myService: Service, private navParams: NavParams,
              private iab: InAppBrowser) {

  }

  itemTapped(event, product){
    this.nav.push(ProductInfoPage, product);
  }

  ionViewDidLoad(){
        this.myService.getProducts().then(data => this.products = data);
  }

  toProductInfo(event, product){
    this.nav.push(ProductInfoPage, product);
  }

  toBrowser(){
    this.browser = this.iab.create('https://deals.dell.com/','_system','location=yes, toolbar=yes, hardwareback=yes, closebuttoncaption=done');
  }

}

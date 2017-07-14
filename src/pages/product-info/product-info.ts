import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'product-info',
  templateUrl: 'product-info.html'
})

export class ProductInfoPage {

    product: any;
  
    constructor(private nav: NavController, private navParams: NavParams) {
        this.product = this.navParams.data;
    }

    

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StarComponent } from '../../app/shared/star';

@Component({
  selector: 'product-info',
  templateUrl: 'product-info.html',
})

export class ProductInfoPage {

    product: any;
  
    constructor(private nav: NavController, private navParams: NavParams) {
        this.product = this.navParams.data;
    }

    

}

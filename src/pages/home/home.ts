import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProductInfoPage } from '../pages';

import { Service } from '../../app/shared/shared';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  products: any;
  myInput: string;
  browser: any;
  location: { lat: number, lng: number };
  google: any;
  promises: any;

  constructor(private nav: NavController, private myService: Service, private navParams: NavParams,
              private iab: InAppBrowser, private geolocation: Geolocation) {
            console.log('CONSTRUCTOR');
  }

getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
    });
  }

 /*initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new this.google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new this.google.maps.Marker({
          position: uluru,
          map: map
        });
      }
*/

  itemTapped(event, product){
    this.nav.push(ProductInfoPage, product);
  }

  ionViewDidLoad(){
        //this.myService.getProducts().then(data => this.products = data);
        this.myService.getDellProds().then(data => {
          let ret = <any>{};
          ret = data;
          console.log(ret);
          var numPages = ret.totalPages;
          console.log(numPages);
          var products = [];
          for (var i = 0; i < ret.products.length; i++) {
            products.push(ret.products[i]);
          }
          console.log(products[0].sku.toString());
          console.log(products);
          this.myService.getStore(this.location.lat, this.location.lng).then(data => {
            console.log(data);
            var promises = [];
            for (var j = 0; j < products.length; j++) {
              var product = products[j];
              //console.log(product);
              promises.push(this.myService.getStoresWithProd(product, this.location.lat, this.location.lng));
              var start = new Date().getTime();
              while (new Date().getTime() < start + 1000);
            }
            Promise.all(promises).then(values => {
              console.log(values);
              var skus_in_stock = [];
              for (var k = 0; k < values.length; k++) {
                if (values[k].stores.length != 0) {
                  var pos = values[k].canonicalUrl.search("sku=");
                  var sku_num = values[k].canonicalUrl.substr(pos + 4, 7);
                  skus_in_stock.push(sku_num);
                }
              }
              console.log(skus_in_stock);
              var prods_in_stock = [];
              for (var l = 0; l < products.length; l++) {
                for (var m = 0; m < skus_in_stock.length; m++) {
                  if (skus_in_stock[m] === products[l].sku.toString()) {
                    prods_in_stock.push(products[l]);
                  }
                }
              }
              console.log(prods_in_stock);
              this.products = prods_in_stock;
            });
          });
        });
  }

  toProductInfo(event, product){
    this.nav.push(ProductInfoPage, product);
  }

  toBrowser(){
    this.browser = this.iab.create('https://deals.dell.com/','_system','location=yes, toolbar=yes, hardwareback=yes, closebuttoncaption=done');
  }

}

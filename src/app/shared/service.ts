import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()

export class Service {
    //private lat = 30.476;
    //private long = -97.6711;
    //private store_uri = 'https://api.bestbuy.com/v1/stores((area(' + this.lat + ',' + this.long + ',0.1)))?apiKey=dqyrzm8d558mmdvgjnbhc74m&show=storeId&format=json';

    constructor(private http: Http){

    }

        getStore(lat, lng){
        let store_uri = 'https://api.bestbuy.com/v1/stores((area(' + lat + ',' + lng + ',3)))?apiKey=dqyrzm8d558mmdvgjnbhc74m&show=storeId,longName&format=json';
        return new Promise(resolve => {
            this.http.get(`${store_uri}`)
            .subscribe(res => resolve(res.json()));
        })
    }

    getDellProds() {
      return new Promise(resolve => {
        this.http.get('https://api.bestbuy.com/v1/products(manufacturer=dell&inStoreAvailability=true)?apiKey=dqyrzm8d558mmdvgjnbhc74m&sort=name.dsc&show=name,longDescription,salePrice,percentSavings,condition,features.feature,customerReviewAverage,customerReviewCount,sku,largeImage&pageSize=100&format=json')
          .subscribe(res => resolve(res.json()));
      })
    }

    getMoreProds(page) {
      return new Promise(resolve => {
        this.http.get('https://api.bestbuy.com/v1/products(manufacturer=dell&inStoreAvailability=true)?apiKey=dqyrzm8d558mmdvgjnbhc74m&sort=name.dsc&show=name,longDescription,salePrice,percentSavings,condition,features.feature,customerReviewAverage,customerReviewCount,sku,largeImage&pageSize=100&page=' + page + '&format=json')
          .subscribe(res => resolve(res.json()));
      })
    }

    getStoresWithProd(product, lat, lng, key) {
      return new Promise(resolve => {
        this.http.get('https://api.bestbuy.com/v1/stores(area(' + lat + ',' + lng + ',3))+products(sku=' + product.sku + ')?format=json&show=storeId,storeType,city,region,name,products.name,products.sku,products&pageSize=1&apiKey=' + key)
          .subscribe(res => resolve(res.json()));
      })
    }

    /*getProducts(){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/products.json`)
            .subscribe(res => resolve(res.json()));
        })
    }*/
}
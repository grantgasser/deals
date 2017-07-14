import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()

export class Service {
    private baseUrl = 'https://myapp-dbd8e.firebaseio.com';

    constructor(private http: Http){

    }

    getProducts(){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/products.json`)
            .subscribe(res => resolve(res.json()));
        })
    }
}
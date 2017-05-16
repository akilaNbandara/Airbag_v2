import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class so_page_db{

	private db_brands: any;

	private address: any;

	constructor(public http:Http ){

    this.address = 'http://localhost:8080/api/';
		
	}

	getBrands(){

		if (this.db_brands) {
      return Promise.resolve(this.db_brands);
    }
 
    return new Promise(resolve => {
 
      this.http.get(this.address+'Service_types')
        .map(res => res.json())
        .subscribe(db_brands => {
          this.db_brands = db_brands;
          resolve(this.db_brands);
        });
    });
	}



}


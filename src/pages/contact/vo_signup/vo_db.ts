import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class vo_page_db{

	private db_brands: any;
  private db_type: any;
	private address: any;

  private name: string;

	constructor(public http:Http ){

    this.address = 'http://localhost:8080/api/';
		
	}

	getBrands(){

		if (this.db_brands) {
      return Promise.resolve(this.db_brands);
    }
 
    return new Promise(resolve => {
 
      this.http.get(this.address+'Brands')
        .map(res => res.json())
        .subscribe(db_brands => {
          this.db_brands = db_brands;
          resolve(this.db_brands);
        });
    });
	}


	gettypes(brand){
    this.db_type=new Array();
/**		if (this.datat[0]!=null) {
      return Promise.resolve(this.data);
    }**/
 
    return new Promise(resolve => {
 
        this.http.get(this.address+'Types')
        .map(res => res.json())
        .subscribe(db_type => {
      /*    for (var i = 0; i < data.length(); ++i) {
             let eli= data[i];
             for (var j = 0; j < eli.brandas.length(); ++j) {
               if (eli.brands[j]==brand){
                 this.datat.push(eli);
                 break;
               }
             }
          }*/
          
          
          this.db_type = db_type;
          resolve(this.db_type);
        });
    });
	}

  checkUser(name:string,email:string,tele:string){
    let ob={name:name,email:email,tele:tele};

    return new Promise(resolve=>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.address+'vehicle_owner/check', JSON.stringify(ob), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);

      });
    })
    

  }
}

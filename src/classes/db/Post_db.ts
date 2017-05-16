import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class Post_db{
	private posts: any;

	private address: any;


	constructor(public http:Http ){

    this.address = 'http://localhost:8080/api/';
		
	}

	postPost(details){
		let headers = new Headers();
    	headers.append('Content-Type', 'application/json');
 
    	this.http.post(this.address+'addPost', 
    					JSON.stringify(details), 
    					{headers: headers}).subscribe(res => {
        					console.log(res.json());
      					});
	}

	getPosts(details){
		return new Promise((resolve,reject)=>{
      let headers = new Headers();
      headers.append('Content-Type','application/json');

      this.http.post(this.address+'getPosts',JSON.stringify(details),{headers:headers})
         .map(res => res.json())
        .subscribe((dl)=>{
          this.posts = dl;
          
          //console.log(data.token);
          resolve(this.posts);
          //resolve(res.json()); // ????
        },(err)=>{
          reject(err);
        });
    });
	}


    getAllPosts(){

        
        return new Promise(resolve => {
            this.http.get(this.address+'addPost')
                .map(res => res.json())
                .subscribe((data)=>{
                    this.posts=data;
                    resolve(this.posts);
                });

        });

    }

	addReply(details){
		let headers = new Headers();
    	headers.append('Content-Type', 'application/json');
 
    	this.http.post(this.address+'addReply', 
    					JSON.stringify(details), 
    					{headers: headers}).subscribe(res => {
        					console.log(res.json());
      					});
	}


}
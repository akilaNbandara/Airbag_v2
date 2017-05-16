import { Component } from '@angular/core';
import { ModalController,Nav,NavParams,Platform ,AlertController,ViewController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Post_db} from '../../classes/db/Post_db'

@Component({
  templateUrl: 'Community.html'
})



export class Community{
	user: any;
	result: any;
  	type:string;
  	b:string='';
  	t:string='';
  	name:string;
   private posts: Array<any>=[];
  

  	constructor(public nav: Nav,public storage:Storage,public navPara:NavParams , 
  				public p_db: Post_db, public altCtrl:AlertController,public modalCtrl: ModalController) {

  	this.result=this.navPara.data;
  	this.user=this.result.result.user;
    this.type=this.result.type;
    this.name=this.user.name;
    
  	console.log(this.user)
  	if (this.type=='VO'){
  		this.b=this.user.primary_vehi.brand;
  		this.t= this.user.primary_vehi.type;
  		this.getPosts(this.b,this.t);
  	}
  	if (this.type=='SO'){
  		   this.p_db.getAllPosts().then((data) => { 
        for (let d of data){
          this.posts.push(d);
          console.log(d);
        };

      });
  	}

  }


  addPost(title:string,dis:string){
  		this.p_db.postPost({name:this.name,brand:this.b,type:this.t,title:title,dis:dis});

  }

  addReply(reply:string, id:string){
  		this.p_db.addReply({id:id,reply:reply,name:this.name});
  }

  viewReply(id: string){
  	console.log(id);
  	 let replies: Array<any>=[];
  	for (let p of this.posts){
  		if (id==p._id){
  			for (let r of p.reply){
  				replies.push(r);
  			}
  		}
  	}
  	//console.log(this.replies);
  	let modal = this.modalCtrl.create(ModalContentPage,replies);
    modal.present();
  	

  }

  showPrompt_ap() {

    let prompt = this.altCtrl.create({
      title: 'Enter Question',
      message: "Enter a title and description of your question",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'description',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          
        },
        {
          text: 'Save',
          handler: data => {
            this.addPost(data.title,data.description);
          }
        }
      ]
    });
    prompt.present();
  }


  showPrompt_rp(id:string) {
    let prompt = this.altCtrl.create({
      title: 'Enter Reply',
      message: "Enter your reply about question",
      inputs: [
        {
          name: 'reply',
          placeholder: 'Reply'
        }
        
      ],
      buttons: [
        {
          text: 'Cancel',
          
        },
        {
          text: 'Save',
          handler: data => {
            this.addReply(data.reply,id);
          }
        }
      ]
    });
    prompt.present();
  }


  getPosts(brand:string, type:string){
  		    this.p_db.getPosts({brand:brand,type:type}).then((data) => { 
        for (let d of data){
          this.posts.push(d);
          console.log(d);
        };

      });

  }
}


@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Comments
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
      <ion-item *ngFor="let item of replies">
        <ion-card>

  <ion-card-header>
   {{item.name}}
  </ion-card-header>

  <ion-card-content>
    {{item.rep}}
  </ion-card-content>

</ion-card>
      </ion-item>
  </ion-list>
</ion-content>
`
})
export class ModalContentPage {
  replies;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
 
    this.replies = this.params.data;
    console.log(this.replies);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
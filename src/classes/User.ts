export abstract class User{
	private username: string;
	private tele: string;
	private password: string;
	private email: string;

	public constructor(username: string, password:string, tele?:string, email?:string ){

		this.username=username;
		this.password=password;
		if (tele!=undefined){
			this.tele=tele;
		}
		if (email!=undefined){
			this.email=email;
		}
	}

	public resetUsername(password:string,newUsername:string){
		if (this.password==password){
			this.username=newUsername;
		}
	}

	public resetPassword(password:string, newPassword:string){
		if (this.password==password){
			this.password=newPassword;
		}
	}

	public resetTele(password:string,newTele:string){
		if (this.password==password){
			this.tele=newTele;
		}
	}

	public resetEmail(password:string,newEmail:string){
		if (this.password==password){
			this.email=newEmail;
		}
	}

	public getusername(){
		return this.username;
	}

	public gettele(){
		return this.tele;
	}

	public getpassword(){
		return this.password;
	}

	public getemail(){
		return this.email;
	}
	

}

import { Injectable } from '@angular/core';

@Injectable()
export class Vehicle{
	private type: string;
	private brand:string;
	private modelNumber: string;
	private year: number;

	constructor(brand:string,type:string,modelNo?:string,year?:number){
		this.brand=brand;
		this.type=type;
		this.modelNumber=modelNo;
		this.year=year;
	}

	public getbrand(){
		return this.brand;
	}

	public gettype(){
		return this.type;
	}


	public getmodelNo(){
		return this.modelNumber;
	}

	public getyear(){
		return this.year;
	}




}
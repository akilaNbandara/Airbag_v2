import {Vehicle} from "./Vehicle";
import {Vehicle_owner} from "./Vehicle_owner";
import {ServiceStation} from "./ServiceStation";

export class Appointment{
	private customer: Vehicle_owner;
	private station: ServiceStation;
	private vehicle: Vehicle;
	private date:Date;
	private discription: string;


	Constructor(customer:Vehicle_owner,station:ServiceStation,vehicle:Vehicle,date:string){
		this.customer=customer;
		this.station=station;
		this.vehicle=vehicle;
		this.date=new Date(date);
	}

	public setDiscription(dis:string):void{
		this.discription=dis;
	}
}
import {User} from "./User";
import {Appointment} from "./Appointment";

export class ServiceStation extends User{
	private address: string;
	private location: {lat:number , lng:number}
	private req_appointments: Appointment[];
	private con_appointment: Appointment[];

	constructor(username:string, password:string,address:string, 
				location: {lat:number,lng:number}, tele?:string, email?:string){

		super(username,password,tele,email);
		this.address=address;
		this.location=location;

	}

	public request_appo(appo:Appointment):void{
		this.req_appointments.push(appo);
	}

	public accept_appo(appo:Appointment):void{
		this.con_appointment.push(appo);
		let index=this.req_appointments.indexOf(appo);
		this.req_appointments.splice(index);
	}

	public reject_appo(appo:Appointment):void{
		let index=this.req_appointments.indexOf(appo);
		this.req_appointments.splice(index);
	}




}

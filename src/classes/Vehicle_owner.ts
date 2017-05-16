import {User} from "./User";
import {Vehicle} from "./Vehicle";

export class Vehicle_owner extends User{
	private vehicleList: Vehicle[]=[];
	private primary_vehicle: Vehicle;

	constructor (username:string, password:string,vehicle:Vehicle, tele?:string, email?:string){
		super(username,password,tele,email);
		this.vehicleList.push(vehicle);

		this.primary_vehicle=vehicle
	}

	public addVehicle(vehicle:Vehicle){
		this.vehicleList.push(vehicle);

	}

	public getP_Vehicle(){
		return this.primary_vehicle;
	}
}
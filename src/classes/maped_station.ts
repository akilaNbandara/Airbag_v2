export class maped_station{
	private name: string;
	private tele: number;
	private location: {lat:number,lng:number}
	private validation: number = 0;


	constructor(name:string,location:{lat:number,lng:number},tele?:number){
		this.name=name;
		this.location=location;
		this.tele=tele;
	}

	public up_validation(){
		this.validation++
	}

	public down_validation(){
		this.validation--
	}



}
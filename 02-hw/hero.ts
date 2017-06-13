export class Hero{

	private name:string;
	private armor:string;
	private weapon:string;
	private level:number;

	constructor(name:string,armor:string,weapon:string,level:number){
		this.name = name;
		this.armor = armor;
		this.weapon = weapon;
		this.level = level;
	}

	walk():void {
		console.log(`${this.name} is walking with his ${this.armor} armor and equipped ${this.weapon}
					and it is level: ${this.level}`);
	}
}
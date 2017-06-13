export class Point{
	private x:number;
	private y:number;

	constructor(x:number,y:number){
		this.x = x;
		this.y = y;
	}

	show():void {
		console.log(`Point x=${this.x} y=${this.y}`);
	}
}
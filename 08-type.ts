"use strict"

function suma(a:number,b:number):number{
	let c:number;
	c = a+b;
	return c;
}

function error(msg:string):never{
	throw new Error(msg);
}

let x:number = 10;
let y:number = 12;

console.log(`suma=${suma(x,y)}`);

error('Error mate!');
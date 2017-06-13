"use strict"

let msg = 'Hello JS'; // This is a global variable

function show(){
	let a = 1; // This is a local var, because it is declared in the function

	if(true){
		let b = 10;
		console.log('if b=', b);
	}

	console.log('msg=', msg); // OK Global scope
	console.log('a=', a); // OK function scope
	console.log('b=', b); // Err undefined
}

show();
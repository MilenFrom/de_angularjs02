"use strict"

let arr = ['One','Two', 'Three', 'Four'];

arr.forEach( (value, index)=> console.log(`m[${index}]=${value}`) );

//let newName = arr.find( (newName)=>newName === 'Two');

let newName = arr.find( (newName)=>{ return newName === 'Two';}); // Using return

console.log(`newName is ${newName}`);
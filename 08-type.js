"use strict";
function suma(a, b) {
    var c;
    c = a + b;
    return c;
}
function error(msg) {
    throw new Error(msg);
}
var x = 10;
var y = 12;
console.log("suma=" + suma(x, y));
error('Error mate!');

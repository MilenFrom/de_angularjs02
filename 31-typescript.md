#TypeScript Crash Course

##Основни понятия

+==========================================================================+
| Typescript е "надмножество" на JavaScript. Скриптовете на Typescript, се |
| компилират до JavaScript.                                                |
+==========================================================================+

+=======================================================================+
| Typescript добавя строга типизация на данните, което особено важно за |
| големи проекти.                                                       |
+=======================================================================+

##Типове данни

	* boolean

```js
let visible:boolean  = true;
```

	* number

```js
let count:number = 10;
let price:number = 1.5;
```

	* string

```js
let name:string = "John";
let msg:string = `Hello ${name}`;
```

	* array

```js
let users:string[] = ['John','Anna','Maria'];
```

	* enum

```js
//NEW=0, INPROGRESS=1,...
enum State {NEW, INPROGRESS, DONE};

//enum State {NEW=1, INPROGRESS, DONE};

let s:State = State.NEW;
```

	* any

```js
let x:any = 'Hello TypeScript';

x = 1; //Ok!

x = true; //Ok
```

	* void

```js
function show():void{
	console.log('Hello Typescript');
}
```

	* never

```js
function error(message:string):never{
	throw new Error(message);
}
```

##конверитиране на типове

```js
let m:any = 'Hello Typescript';

let c:number = <string>m.length;

//или

let c:number = (m as string).length

```

##Интерфейси

```js
interface Message {
	id:number;
	text:string;
	code?:nubmer;
}

function show( m:Message):void{

}

show({id:100, text:'Hello Typescript'});
```


```js
interface Shape{
	draw():void;
	moveTo(dx:number, dy:number):void;
	scale(x:number,y:number):void;
}

class Rectangle implements Shape{
	draw():void{ ... }
	moveTo(dx:number, dy:number):void;
	scale(x:number, y:number):void;
}
```


```js
interface Search{
	(source:string, subString:string):boolean;
}

...

let s:Sreatch;

s = function (source:string, subString:string):boolean{
	...
	return true;
}

```


##Класове

    * public
    * protected
    * private

```js

class Point {
	//public members
	x:number;
	y:number;

	//constructor
	constructor( x:number, y:number){
		this.x = x;
		this.y = y;
	}

	//method
	show():void{
		console.log(`x = ${this.x} y = ${this.y}`);
	}
}


let p = new Point(10,20);

p.show();

p.x = 1; //Ok
p.y = 2; //Ok

p.show();
```

```js

class Point{

	constructor( private x:number, private y:number){}
	...
}

let p = new Point(10,20);

p.x = 1; //error - inaccessible private member
```

##Модули

```js
//file person.ts
export interface User{
	login();
	logout();
	register();
}

export class Person{

	constructor(private firstName:string, private lastName:string){}

	show():void{
		console.log(`Person: ${this.firstName} ${this.lastName}`);
	}
}

//file app.ts

import {Person} from './person'; //imports only Person

import { Person as Customer} from './person' //imports Person an Customer

import  * as users from './person'; //imports all from person.ts

let c = new users.Person('John','Doe');

let cs = new Customer('Maria', 'Anders');

let p = new Person('Anna', 'Smith');
```

#Генерични типове



```js

class Container{
	elements:string[];
	...
	add( el:string):void{
		...
	}
}
```

```js
class Container{
	elements:any[];
	...
	add( el:any ):void {
		...
	}
}
```

```js

class Container<T>{
	elements:T[];
	...
	add( el:T):void{

	}

}

...

let c = new Container<string>();

c.add('Hello');
```


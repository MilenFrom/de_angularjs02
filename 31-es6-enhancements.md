#JavaScript (ECMAScript6)

##Въведение
>С последната спецификация на JavaScript ( ES 6) , в езика са добавени
>редица важни разширения към езика JavaScript

Съвместимост с браузърите:https://kangax.github.io/compat-table/es6/

## Декларация на променливи с let

let е ключовата дума, която заменя позната ни var за деклариране на променливи. За тези от вас, които не знаят, при var има проблеми свързани с видимостта на променливите (scope) и повторната им декларация като те са специфични за JavaScript и не се срещат в другите езици за програмиране, така че за програмисти, които са започнали да програмират на други езици и след това са преминали към JavaScript (повечето попадат в тази категория), проблемите могат лесно да останат незабелязани.

```js
"use strict"

var msg = 'Hello JS';

function show(){
	var a=1;
	if( true){
		var b=2;
		console.log('b=', b); // b=2
	}
	console.log('msg=',msg); // msg=Hello JS (msg has global scope - Ok)
	console.log('a=',a); // a=1 ( a has function scope - Ok)
	console.log('b=',b); // b=2 ( b has function scope - ???) 
}

show();
```

Ако се замени var с let това ще ограничи областта на видимост на b до блока на if т.е. последното извеждане на b ще предизвика ReferenceError:b is not defined.

По същият начин, при повторна декларация на променлива с var, това не се отчита като грешка,
но ако се замени var с let, резултатът ще бъде SyntaxError: Identifier 'msg' has already been declared.

```js
var msg = 'Hello JS';
var msg = 'Hi, John';

console.log(msg); //Hi, John
```

## Декларация на константи

В JavaScript константите са най-обикновени променливи с подходящ префикс или суфикс в името (т.е. програмистите са се договорили, че това е константа - var const_path = '...' или var path_const = '...' ) и съответно пред промяната на стойнстта няма никакви пречки. 
В новата спецификация е въведена ключовата дума const, която предпазва от промени на стойността както е в другие езици.

```js
const path = '/images/';

console.log('path:',path); // path:/images/

path = '/css/'; // TypeError: Assignment to constant variable
```

Ако с const се декларира обектна променлива, то действието на const е малко по-различно. Стойностите на ключовете и самите ключове ще могат да се променят, добавят и изтриват, но на самата обектна променлива няма да могат да се присвояват нови стойности.

```js
const app = {
	title: 'My Blog',
	logo: '/images/logo.png'
};

console.log(app.title);
console.log(app.logo);

delete app.title; //Ok
delete app.logo;  //Ok
console.log(app);     // empty object {}

app.scripts = '/js/'; // adds a new key - Ok

app = { mail: 'me@site.com'} //TypeError: Assignment to constant variable.

console.log(app);
```

##Низ съдържащ променливи и изрази

Ако програмирате на PHP, то със сигурност вече знаете как изглежда това! Единственото условие е да оградите низa с апострофи (` `, не с ' ' или " ").

```js
let user = 'John Doe';

let msg = `Welcome ${user} !`; //Welcome John Doe

let price=2;
let vat= 1.2;
let crn = 'EUR';

console.log(msg);
console.log( `Price ${ price * vat} ${crn}` ); //Price 2.4 EUR
```

##Функции с подразбиращи се параметри

В JavaScript няма ясна индикация (освен в документацията) за това кои параметри на функциите са задължителни и кои могат да бъдат пропуснати при извикването й и съответно, ако не се подаде стойност каква ще бъде стойността по подразбиране- нещо, което в редица други езици (C++, Python, PHP) съществува отдавна.

```js
function createUser(user,plan){
	if( typeof user == 'undefined' || user.trim().length == 0) 
		throw 'Undefined or empty user name!';
	plan = (typeof plan == 'undefined')? 'developer': plan;
	
	console.log('New user ' + user +', ' + plan);
}
createUser('John'); //New user John, developer 
createUser('Smith', 'basic'); //New user Smith, basic 
createUser(); //Raise Error:Undefined or empty user name
```

На параметрите, за които няма стойност при извикване на функцията, по подразбиране им се присвоява специалната стойнст undefined, която в тялото на фукцията може да се замени със стойност по подразбиране. 

С въвеждането на параметри с подразбиращи се стойности в ES6, същият код изглежда доста по-ясен и е достатъчно да се погледне прототипа на функцията за да се видят възможните варианти за нейното извикване.

```js
function createUser(user, plan = 'developer'){
	if( typeof user == 'undefined' || user.trim().length == 0) 
		throw "Undefined or empty user name!";

	console.log(`Create new user ${user}, plan ${plan}`);
}

createUser('John');
createUser('Smith', 'basic');
createUser(); //Raise Error:Undefined or empty user name
```

##Функции генератори

Функциите генератори са една идея заимствана от Python. Идеята на тези функции е да връщат при всяко извикване следваща стойност изчислена във функцията или взета от масив, низ и др.
При декларирането им трябва да се постави * след function, а връщането на самата стойност става с yield.

```js
function* getNextValue(){
	let i = 1;
	while(true){
		yield i++;
	}	
}
var generator = getNextValue();

console.log(generator.next()); // { value: 1, done:false}
console.log(generator.next().value); //  2
console.log(generator.next().value); //  3
generator.return(); 
console.log(generator.next()); //  {value: undefined, done:true}
```

Действието на yield е доста по-различно от оператора return, с който изпълнението на функцията приключва и съответно стойностите на i не биха се запазвали. Освен това, в примера е използван безкраен цикъл, но благодарение на yield това не е проблем за изпылнението на кода.

##Ламбда изрази (arrow function)

С ламбда изразите (името съм заимствал от езика Java) можете да превърнете декларацията на кратки функции в компактни и лесни за четене изрази.

Например, ако декларираме функция, която премахва интервалите от краищата и разбива текста по определен разделител като връша стойностите в масив, в най-простия си вид това може да изглежда така:

```js
"use strict"

function split(text,delim){
	return text.trim().split(delim);
}

console.log( split('John|Mary|Peter|Sam','|')); //['John','Mary','Peter','Sam']
```

в ES6 може да се замести с по-опростен синтаксис:

```js
let split1 = (text, delim) => {
				return text.trim().split(delim);
			}

console.log(split1('John|Mary|Peter|Sam','|'));//['John','Mary','Peter','Sam']
```

и дори с още по-опростен, ако в тялото има само return без други изрази:

```js
let split2 = (text,delim) => text.trim().split(delim);

console.log( split2('John|Mary|Peter|Sam','|')); //['John','Mary','Peter','Sam']
```

##Оператор ... за масиви (spread operator)

При определени действия с масиви, операторът ... може да ви помогне да избегнете цикли и други неудобни начини за достъп до елементите.
Например, преди ES6:

```js
var data = [1,2,3];

function suma(a, b, c){
	return a + b + c;
}

console.log( suma(data[0], data[1], data[2]) );
```

Мисля, че този фрагмент дори няма нужда от коментар :). ES6 превръща това в нещо далеч по-елегантно:

```js
let data = [1,2,3];

function suma(a, b, c){
	return a + b + c;
}

console.log( suma(...data ) );
```

Доста елегатно изглежда и копирането на данните от един масив в друг масив:

```js
let data = [1,2,3];
let values = [ 4, 5, ...data, 7, 8];

console.log(values);
```

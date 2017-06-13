#JavaScript Promise API 


##Въведение

>Обектът Promise се използва при работа с асинхронни функции, например при
>изпращане на ajax заявки, и позволява на подобни функции да връщат резултати 
>без да е необходимо да се използват функции с обратно извикване (callback 
>funcitons), които водят до лошо структуриран код и редица други проблеми (
>например с обработката на грешки).

```js
	sendRequest('/categories/', function(data){
		...
		sendRequest( category + '/items/', function(posts){
			...
		});// request items for each category

	});// request to categories
```

Към момента има множество библиотеки, които позволяват Promise обект да се 
включи към функциите в приложението, а някои библиотеки и софтуерни рамки също 
имат реализации на подобни обекти (http://complexitymaze.com/2014/03/03/
javascript-promises-a-comparison-of-libraries/), но тази статия разглежда само  
реализацията на Promise дадена в стандарта ES6.

##Обектът Promise

По дефиниця Promise обекта представлява стойността или изхвърленото изключние 
като резултат  от изпълнението на асинхронна функция или функция, която не 
връща резултат с return.

Promise има три състояния:

    * изчакване  - начално състояние 
    * изпълнено  - успешно изпълнена операция
    * отхвърлено - неуспено изпълнена операция,

като на последните две съответстват двата параметъра на фунцкията, която се 
подава при конструирането на обекта. Ето и кратък фрагмет как изглежда това:

```js
function asyncFunction(url){
	return new Promise(function(resolve,reject){
		if( ... ){
			resolve(); //Ok
		}
		else{
			reject();  //Error
		}
	});
}
```

Функцията asyncFunction() връща Promise обект като resolve() предизвиква 
изпълнение на метода then() на обекта, а reject() на метода catch() и съответно 
then() се използва за обработка на данните (най-често), a catch() за грешките.

В следващият малък пример можете да видите как се използват resolve(),  
reject(), then() и catch():

```js
function sendRequest(url){
  return new Promise(function(resolve,reject){
      setTimeout(function(){
         console.log('request data from:' + url);
         if( url != null && typeof url != 'undefined')
          {
            resolve('requested data');
          }
        else
          {
            reject('Invalid Url!');
          }
      }, Math.random() * 100);
  });
}

sendRequest('/product/')
  .then(function(product){
      console.log('Data:' + product);
   })
  .catch(function(error){
      console.log('Error:',error);
   });
```

Не е трудно да се види, че в този случай кодът изглежда доста по-подреден и 
ясен, отколкото с функции за обратно извикване, но с това не се изчерпват 
предимствата на Promise.  Функцията setTimeout() в примера е използвана за се 
опрости кода и да се получи изпълението асинхронно без да се налага да се 
правят ajax заявки.

Можете лесно да тествате онлайн кода [тук] и да проиграете различни варианти за 
стойността за параметъра url (напр. null или undefined) като и да смените низа 
в resolve() с масив или JSON обект.

Понеже функцията sendRequest() връща Promise обект, при зависими една от друга 
заявки, например след като се върнат данните за продукта трябва да се вземат 
коментарите на потребителите или подобните на него продукти, then() може да 
завтрши с return sendRequest(). 

```js
sendRequest('/product/')
  .then(function(product){
      console.log('1:' + product);
      return  sendRequest('/user-comments/');
   })
   .then(function(comments){
      console.log('then 2:' + data)
   })
  .catch(function(error){
    console.log('Error:' + error);
   });
```

т.е. отделните извиквания на then() могат да се свържат верижно, което 
позволява да се избегне влагането на множество извиквания едно в друго. 

##Метод Promise.all()

В последният пример, в then() трябваше да се извика само веднъж sendRequest(), 
но в някои ситуации резултатът от първата заявка може да изисква многократно 
извикване на sendRequest() или друга асинхронна функция.

Например, ако първото извикване връща активните в момента потребители, то 
следващото извикване може да е към коментарите на всеки един потребител т.е. в 
then() се налага да се извика sendRequest() за всеки потребител, който е върнат 
в резултата от първата заявка.

В този случай е удобно да се използва метода all() на обекта Promise. На метода 
all() се подава масив от функции, които връщат Promise обект и отделните 
функции в масива се изпълняват паралелно. Резултатът в then() e също масив от 
резултатите за всяка от функциите като първият елемент в масива с резултати 
съответства на първия обект в масива и т.н. Понеже all() връща всички резултати 
наведнъж, скоростта на изпълнение е равна на най-бавната от заявките. 

```js
sendRequest('/users/')
  .then(function(users){
    var names = [];
    for( let user of users)
    {
      names.push('/user-comments/' + user.name);
    }
    var promises = names.map(sendRequest);
    return Promise.all(promises);
  })
  .then(function(comments){
    console.log(comments);
  })
  .catch( function(error){
    console.log(error);
  });

function sendRequest(url){
  return new Promise(function(resolve,reject){
      setTimeout(function(){
         console.log('request data from:' + url);
         if( url.indexOf('users') !=-1 )
          {
            resolve([{uid:1, name:'Tom'},{uid:2, name:'Mary'}]);
          }
        else if( url.indexOf('Tom') != -1 )
          {
            resolve(['Lorem ipsum', 'Impedit ipsam, ad unde?'])
          }
        else if( url.indexOf('Mary') != -1 )
          {
            resolve(['Doloremque quod','Temporibus consequuntur'])
          }
        else
          {
            reject('Invalid Url!');
          }
      }, Math.random() * 100);
  });
}
```

Методът all() приключва с reject() при първия Promise обект, в който 
изпълнението е приключило с reject() независимо от състоянието на другите 
обекти.

Ако е необходимо просто да се изпълнят паралелно няколко независими една от 
друга функции, то с all() това ще изглежда така:

```js
Promise
	.all([ 
			sendRequest('/news/'),
			sendRequest('/products/'),
			sendRequest('/ads/')
	])
	.then(function(result){
		...
	})
	.catch(function(error){
		console.log(error);
	});

```

##Метод race()

Методът race() е подобен на all(), но изпълнението на функциите, които връщат Promise обекти от масива, който се подава като параметър на race() приключва след първия resolve() (или reject() ). В примера с sendRequest(), race() ще бъде подходящ ако имаме няколко алтернативни адреса, към които искаме да изпратим заявка, но да обработим резултата само от най-бързо изпълнилата се.

```js
Promise.race([sendRequest('/db1/users'),
              sendRequest('/db2/users'),
              sendRequest('/db3/users')
             ])
       .then(function(users){
          console.log(users);
       })
       .catch(function(error){
          console.log(error);
       });

function sendRequest(url){
  return new Promise(function(resolve,reject){
      setTimeout(function(){
         console.log('request data from:' + url);
         if( url.indexOf('db1') !=-1 )
          {
            resolve([{uid:1, name:'Tom'},{uid:2, name:'Mary'}]);
          }
        else if( url.indexOf('db2') != -1 )
          {
            resolve([{uid:1, name:'Tom'},{uid:2, name:'Mary'}]);
          }
        else if( url.indexOf('db3') != -1 )
          {
            resolve([{uid:1, name:'Tom'},{uid:2, name:'Mary'}]);
          }
        else
          {
            reject('Invalid Url!');
          }
      }, Math.random() * 100);
  });
}
```



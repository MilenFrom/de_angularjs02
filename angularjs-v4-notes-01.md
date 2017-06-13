#AngularJS. Програмиране на уеб приложения

##Необходими програми

    * Windows

+------------+----------------------------------------------------------+
| Node.js    | https://nodejs.org/en/download/                          |
+------------+----------------------------------------------------------+
| Git Bash   | https://git-scm.com/download/win                         |
+------------+----------------------------------------------------------+
| TypeScript | https://www.typescriptlang.org/index.html#download-links |
+------------+----------------------------------------------------------+
	
	* минимален шаблон 

```sh
git clone https://github.com/DikranHachikyan/angularjs-2-min.git .
```

или

```
git clone https://github.com/DikranHachikyan/angularjs-2-min.git project
```

##Структура на минимално приложеие

```js
// src/main.ts

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

```js
// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
	imports:[BrowserModule],
	declarations:[AppComponent],
	bootstrap:[AppComponent]
}); 

export class AppModule{

}
```

```js
// src/app/app.component.ts

import { Component } from '@angular/core';

@Component({
	selector:'my-app',
	template: `<h1>{{message}}</h1>`
});

export class AppComponent{
	message:'Hello World';
}
```

```html
    ...
    <script src="node_modules/core-js/client/shim.min.js"></script>

    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>

    <script src="systemjs.config.js"></script>
    <script>
      System.import('main.js').catch(function(err){ console.error(err); });
    </script>
  </head>

  <body>
    <my-app>Loading AppComponent content here ...</my-app>
  </body>
```


##Two-way Binding

```js
// src/app/app.module.ts

import { FormsModule  }  from '@angular/forms'; // <-- ngModel

import { AppComponent }  from './app.component';


@NgModule({
	imports:[
		BrowserModule,
		FormsModule // <-- 
	]
  , declarations:[AppComponent]
  , bootstrap: [AppComponent]		
})
```

```js
// src/app/app.component.ts

export class User {
	id:number;
	name: string;
}

@Component({
	selector:'app',
	template:`<h1>{{user.name}}</h1>
              <div><label>id:</label>{{user.id}}</div>
              <div><label>name:</label>
				<input [(ngModel)]="user.name" placeholder="Name"/>	
              </div>`
})
export class AppComponent {
	user:User = {
		id:101,
		name:'John Smith'
	};
}
```

```js
// src/app/app.module.ts

import { FormsModule  }  from '@angular/forms';

import { AppComponent }  from './app.component';


@NgModule({
	imports:[BrowserModule, FormsModule]
  , declarations:[ AppComponent]
  , bootstrap: [ AppComponent]		
})
```

##Template Syntax

    * docs: https://angular.io/docs/ts/latest/guide/template-syntax.html
  
+----------------------+--------------------------------+
| interpolation        | {{variable}}                   |
+----------------------+--------------------------------+
| property             | [property_name]                |
+----------------------+--------------------------------+
| event                | (event_name)="event_handler()" |
+----------------------+--------------------------------+
|                      | {{expression}}                 |
| one-way (code->view) | [target]="expression"          |
|                      | bind-target="expession"        |
+----------------------+--------------------------------+
| one-way              | (target)="statement"           |
| (view->code)         | on-target="statement"          |
+----------------------+--------------------------------+
| two-way binding      | [(variable)]                   |
+----------------------+--------------------------------+
|                      | NgClass                        |
| attribute directives | NgStyle                        |
|                      | ngModel                        |
+----------------------+--------------------------------+
| structural           | NgIf                           |
| directives           | NgFor                          |
+----------------------+--------------------------------+



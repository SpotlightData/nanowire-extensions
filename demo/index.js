import { AjaxObservable } from '../src/internal/ajax';

AjaxObservable.create({
  method: 'get',
  url: 'https://jsonplaceholder.typicode.com/todos/a',
}).subscribe(console.log);

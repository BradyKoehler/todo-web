import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Jwt  } from './jwt';
import { List } from './list';
import { Todo } from './todo';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  private token: string;

  private apiBase = "http://todo.allmy.space/api/v1";

  constructor(
    private http: HttpClient
  ) { }

  private url(route: string): string {
    return this.apiBase + route;
  }

  login(user: User): Observable<Jwt> {
    return this.http.post<Jwt>(this.url("/tokens"), {
      user: user
    });
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  options(): object {
    let headers = { 'Content-Type': 'application/json' };
    if (this.getToken()) headers['Authorization'] = this.getToken();
    return {
      headers: new HttpHeaders(headers)
    }
  }

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.url("/lists"), this.options());
  }

  createList(list: List): Observable<List> {
    return this.http.post<List>(this.url("/lists"), {
      list: list
    }, this.options());
  }
  
  getList(id: number): Observable<List> {
    return this.http.get<List>(this.url(`/lists/${id}`), this.options());
  }

  getTodos(list_id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url(`/lists/${list_id}/todos`), this.options());
  }

  createTodo(list_id: number, title: string): Observable<Todo> {
    return this.http.post<Todo>(this.url(`/lists/${list_id}/todos`), {
      todo: {
        title: title
      }
    }, this.options());
  }

  updateTodo(list_id: number, todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(this.url(`/lists/${list_id}/todos/${todo.id}`), {
      todo: todo
    }, this.options());
  }

  deleteTodo(list_id: number, todo_id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url(`/lists/${list_id}/todos/${todo_id}`), this.options());
  }

}

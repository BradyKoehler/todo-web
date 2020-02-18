import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Jwt } from './jwt';
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
}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Jwt } from '../jwt';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Input() user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new User();
  }

  login(): void {
    this.authService.login(this.user)
        .subscribe(jwt => jwt ? this.loginSuccess(jwt) : this.loginFailure())
  }

  loginSuccess(jwt: Jwt): void {
    this.authService.setToken(jwt.token);
    this.router.navigate(["/"]);
  }

  loginFailure(): void {
    alert("Login failed");
  }
}

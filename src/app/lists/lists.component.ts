import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { List } from '../list';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  @Input() list: List;
  lists: List[];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.list = {
      id: null,
      user_id: null,
      created_at: null,
      updated_at: null,
      name: ""
    };
    this.getLists();
  }

  getLists(): void {
    this.authService.getLists()
        .subscribe(lists => this.lists = lists);
  }

  create(): void {
    this.authService.createList(this.list)
        .subscribe(list => this.router.navigate([`/lists/${list.id}`]));
  }

}

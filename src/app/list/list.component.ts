import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../list';
import { Todo } from '../todo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  id: number;
  title: string;
  showAll: boolean;
  gridView: boolean;

  list: List;
  todos: Todo[];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.authService.getList(this.id)
        .subscribe(list => list ? this.list = list : null);

    this.authService.getTodos(this.id)
        .subscribe(todos => todos ? this.todos = todos : null);
    
    this.showAll = false;
    this.gridView = false;
  }

  create(): void {
    if (!this.title) return;
    this.authService.createTodo(this.id, this.title)
        .subscribe(todo => {
          this.todos.push(todo);
          this.title = "";
        });
  }

  complete(todo: Todo): void {
    todo.status = "complete";
    this.update(todo);
  }

  incomplete(todo: Todo): void {
    todo.status = "incomplete";
    this.update(todo);
  }

  update(todo: Todo): void {
    this.authService.updateTodo(this.id, todo)
        .subscribe(todo => todo);
  }

  delete(id: number): void {
    this.authService.deleteTodo(this.id, id)
        .subscribe(todo => this.todos = this.todos.filter(t => t.id !== id));
  }

}

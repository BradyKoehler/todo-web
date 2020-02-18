import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', component: ListsComponent },
  { path: 'lists/:id', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

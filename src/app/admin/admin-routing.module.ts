import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { UsersComponent } from './users/users.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_ADMIN']
        },
        children: [
          { path: 'users', component: UsersComponent },
          { path: 'books', component: AdminBooksComponent }
        ]
      },
      {
        path: 'add-book',
        component: AddBookComponent
      }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {

}
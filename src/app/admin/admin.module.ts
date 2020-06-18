import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddBookComponent } from './add-book/add-book.component';

@NgModule({
    declarations: [
        UsersComponent,
        AdminComponent,
        AdminBooksComponent,
        EditUserComponent,
        AddBookComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: []
})
export class AdminModule {

}
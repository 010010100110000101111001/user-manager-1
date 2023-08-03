import { NgModule } from '@angular/core';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { SharedModule } from '../shared/shared.module';
import { UsersTableComponent } from './components/users-list/users-table/users-table.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersTableComponent,
    CreateUserComponent,
    UpdateUserComponent,
  ],
  imports: [SharedModule],
})
export class UsersModule {}

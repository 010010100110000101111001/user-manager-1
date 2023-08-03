import { UsersListComponent } from '../users-list.component';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent {
  @Input('isLoading') isLoading = false;
  @Input('users') users: any;

  updateUser = (_id: string) => this.usersList.updateUser(_id);
  deleteUser = (user: any) => this.usersList.deleteUser(user._id);

  constructor(private store: Store, private usersList: UsersListComponent) {}
}

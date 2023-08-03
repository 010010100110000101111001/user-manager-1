import { userActions } from '../../state/users.actions';
import { User } from '../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllUsers, selectUserLoading } from '../../state/users.selectors';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  loading$: Observable<boolean>;
  users$: Observable<User[]>;
  isLoading: boolean = true;

  constructor(
    private store: Store,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUserLoading);
    if (this.loading$) {
      this.loading();
    }
  }

  loading = () => {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.isLoading = false;
    }, 1000);
  };

  ngOnInit() {
    this.store.dispatch(userActions.loadUsers());
    this.loading$ = this.store.select(selectUserLoading);
  }

  updateUser(_id: string) {
    this.router.navigate([`update-user/${_id}`]);
  }

  deleteUser(user: User) {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );
    if (!shouldDelete) return;
    this.store.dispatch(userActions.deleteUser({ _id: user._id }));
  }
}
// import { Component, OnInit } from '@angular/core';

// // NgRx imports
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';

// // User state imports
// import { User } from '../../../../state/users/user';
// import { loadUsers } from '../../../../state/users/users.actions';
// import {
//   selectAllUsers,
//   selectUserLoading,
// } from '../../../../state/users/users.selectors';

// @Component({
//   selector: 'app-users-list',
//   templateUrl: './users-list.component.html',
// })
// export class UsersListComponent implements OnInit {
//   users$: Observable<User[]>;
//   loading$: Observable<boolean>;

//   constructor(private store: Store) {
//     this.users$ = this.store.select(selectAllUsers);
//     this.loading$ = this.store.select(selectUserLoading);
//   }

//   ngOnInit() {
//     this.loading$ = this.store.select(selectUserLoading);
//     this.users$ = this.store.select(selectAllUsers);

//     this.store.dispatch(loadUsers());
//   }

//   deleteUser(user: any) {
//     console.log(user);
//   }
// }
// import { UsersService } from '../../services/users.service';
// import { Component } from '@angular/core';
// import { firstValueFrom } from 'rxjs';

// @Component({
//   selector: 'users-list',
//   templateUrl: './users-list.component.html',
// })
// export class UsersListComponent {
//   constructor(private usersService: UsersService) {}

//   users: any[] | undefined;

//   ngOnInit() {
//     this.loadUsers();
//   }

//   async loadUsers() {
//     try {
//       this.users = await firstValueFrom(this.usersService.getUsers());
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   }

//   async handleDelete(user: any) {
//     const shouldDelete = window.confirm(
//       `Are you sure you want to delete ${user.name}?`
//     );
//     if (shouldDelete) {
//       try {
//         await firstValueFrom(this.usersService.deleteUser(user._id));
//         this.loadUsers();
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   }
// }

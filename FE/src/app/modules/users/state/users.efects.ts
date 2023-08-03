import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from './users.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUsers),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => userActions.loadUsersSuccess({ users })),
          catchError((error) => of(userActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.createUser),
      mergeMap((action) =>
        this.usersService.createUser(action.user).pipe(
          map((user) => userActions.createUserSuccess({ user })),
          catchError((error) => of(userActions.createUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.deleteUser),
      mergeMap((action) =>
        this.usersService.deleteUser(action._id).pipe(
          map(() => userActions.deleteUserSuccess({ _id: action._id })),
          catchError((error) => of(userActions.deleteUserFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}

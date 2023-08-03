import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './users.reducer';
import { User } from '../models/user.model';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectUserById = (userId: string) =>
  createSelector(selectAllUsers, (users: User[]) =>
    users.find((user) => user._id === userId)
  );

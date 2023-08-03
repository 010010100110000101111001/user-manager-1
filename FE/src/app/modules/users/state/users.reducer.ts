import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { userActions } from './users.actions';

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(userActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(userActions.loadUsersSuccess, (state, action) => ({
    ...state,
    users: action.users,
    loading: false,
  })),
  on(userActions.loadUsersFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),
  on(userActions.createUser, (state, action) => {
    return {
      ...state,
      users: [...state.users, action.user],
    };
  }),
  on(userActions.deleteUser, (state, action) => {
    return {
      ...state,
      users: state.users.filter((user) => user._id !== action._id),
    };
  })
);

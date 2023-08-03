import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const userActions = createActionGroup({
  source: '[User]',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: any }>(),
    'Create User': props<{ user: User }>(),
    'Create User Success': props<{ user: string }>(),
    'Create User Failure': props<{ error: any }>(),
    'Update User': props<{ _id: any; user: User }>(),
    'Update User Success': props<{ user: string }>(),
    'Update User Failure': props<{ error: any }>(),
    'Delete User': props<{ _id: string }>(),
    'Delete User Success': props<{ _id: string }>(),
    'Delete User Failure': props<{ error: any }>(),
  },
});

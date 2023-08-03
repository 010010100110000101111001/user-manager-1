import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { UsersListComponent } from './modules/users/components/users-list/users-list.component';
import { CreateUserComponent } from './modules/users/components/create-user/create-user.component';
import { UpdateUserComponent } from './modules/users/components/update-user/update-user.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

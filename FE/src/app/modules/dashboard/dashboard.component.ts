import { Component, inject } from '@angular/core';
import { Router } from 'express';
import { UsersService } from '../users/services/users.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(private usersService: UsersService) {}
}

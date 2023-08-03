import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private API_URL = 'http://localhost:666/users';

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(this.API_URL, user);
  }

  updateUser(user: User): Observable<any> {
    const url = `${this.API_URL}/${user._id}`;
    return this.http.put<any>(url, user);
  }

  deleteUser(_id: string): Observable<any> {
    const url = `${this.API_URL}/${_id}`;
    return this.http.delete<any>(url);
  }
}

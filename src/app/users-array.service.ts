import {Injectable} from '@angular/core';
import {Roles, User, UsersService} from './users.service';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from './environments/environment';
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersArrayService implements UsersService {
  currentUser: User;
  user$: BehaviorSubject<User>;
  constructor(private http: HttpClient) {

    const u = localStorage.getItem('user');
    if (u) {
      this.currentUser = JSON.parse(u);
      this.user$ = new BehaviorSubject(this.currentUser);
    } else {
      this.user$ = new BehaviorSubject(null);
    }
  }

  AddUser(user: User): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/signup`, user);

  }

  logIn(email: string, password: string ): Observable<boolean> {
    return this.http.post<User>(`${environment.apiUrl}/login`, {email, password})
      .pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser = user;
        this.user$.next(user);
        return true;
      }
      return false;
    }), catchError(err => {
          this.logout();
          return throwError(err.statusText);
      }));
 }
  getCurrentUser(): User {
    return this.currentUser;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser = null;
    this.user$.next(null);
  }

  isLoggedIn(): boolean {
    return !!(this.currentUser && this.currentUser.token);

  }
  isAdmin(): boolean {
    return this.currentUser && this.currentUser.token && this.currentUser.role === Roles.admin;

  }

  editUser(id: number, name: string, email: string, birthday: any, phone: string): Observable<User> {
    return this.http.patch<User>(`${environment.apiUrl}/api/users/${id}`, {name, email, phone, birthday})
      .pipe(map( res => {
      if (res) {
        this.currentUser.name = res.name;
        this.currentUser.email = res.email;
        this.currentUser.phone = res.phone;
        this.currentUser.birthday = res.birthday;
        this.user$.next(res);
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        } else {
      }
      return res;
    }, err => {
      }
    ));
  }

  getUser(): Observable<User> {
    return this.user$.asObservable();
  }

  RemoveUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/api/users/${id}`);
  }

}

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
      // this.user$.next(this.currentUser);
      console.log('user session restored');
    } else {
      this.user$ = new BehaviorSubject(null);
    }
  }

  AddUser(user: User): Observable<boolean> {
    console.log(user);
    console.log(environment.apiUrl);
    return this.http.post<boolean>(`${environment.apiUrl}/signup`, user);

  }

  logIn(email: string, password: string ): Observable<boolean> {
    // return new Observable<true>();
    return this.http.post<User>(`${environment.apiUrl}/login`, {email, password})
      .pipe(map(user => {
      console.log('UserService.Login', user);
      if (user && user.token) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser = user;
        this.user$.next(user);
        return true;
      }
      return false;
    }), catchError(err => {
          this.logout();
          console.log('login error', err);
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
    if (this.currentUser && this.currentUser.token) {
      return true;
    }
    return false;
  }
  isAdmin(): boolean {
    if (this.currentUser && this.currentUser.token && this.currentUser.role === Roles.admin) {
      return true;
    }
    return false;
  }

  editUser(id: number, firstName: string, secondName: string, email: string, url: string): Observable<boolean> {
    // this.user$.next(this.currentUser);
    return this.http.put<boolean>(`${environment.apiUrl}/users/edituser`, {firstName, secondName, id, email, url}).pipe(map( res => {
      if (res) {
        console.log('change name status', res);
        this.currentUser.firstname = firstName;
        this.currentUser.secondname = secondName;
        this.currentUser.email = email;
        this.currentUser.url = url;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        }
      return res;
    }
    ));
  }

  getUser(): Observable<User> {
    return this.user$.asObservable();
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  test() {
    this.logout();
  }

  removeUser(id: number): Observable<boolean> {
    console.log('remove user: ', id);
    return this.http.delete<boolean>(`${environment.apiUrl}/users/removeuser/${id}`);
  }

}

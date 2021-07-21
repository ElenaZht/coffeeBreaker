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
      console.log('user session restored', this.currentUser);
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

  editUser(id: number, firstname: string, secondname: string, email: string, birthday: any, phone: string): Observable<User> {
    console.log('firstname comes to array server from component ', firstname);
    // tslint:disable-next-line:max-line-length
    return this.http.patch<User>(`${environment.apiUrl}/api/users/${id}`, {firstname, secondname, email, phone, birthday}).pipe(map( res => {
      if (res) {
        console.log('change data status', res);
        this.currentUser.firstname = res.firstname;
        this.currentUser.secondname = res.secondname;
        this.currentUser.email = res.email;
        this.currentUser.phone = res.phone;
        this.currentUser.birthday = res.birthday;
        this.user$.next(res);
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        } else {
        console.log('we have no res from server');
      }
      return res;
    }, err => {
      console.log('array service got error from server', err);
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

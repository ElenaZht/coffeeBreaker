import {Observable, Subject} from 'rxjs';
export enum Roles {
  admin,
  user
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: Date;
  password: string;
  token?: string;
  role?: Roles;
}

export abstract class UsersService {
  abstract AddUser(user: User): Observable<boolean>;
  abstract RemoveUser(id: number): Observable<boolean>;
  abstract getUserById(id: number): Observable<User>;
  abstract logIn(email: string, password: string ): Observable<boolean>;
  abstract logout();
  abstract isLoggedIn(): boolean;
  abstract isAdmin(): boolean;
  abstract editUser(id: number, name: string, email: string, birthday: any, phone: string): Observable<User>;
  abstract getUser(): Observable<User>;
  abstract test();
  abstract getCurrentUser(): User;

}

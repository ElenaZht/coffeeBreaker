import {Observable, Subject} from 'rxjs';
export enum Roles {
  admin,
  user,
  guest
}

export interface User {
  id: number;
  firstname: string;
  secondname: string;
  email: string;
  phone: string;
  birthday: Date;
  password: string;
  token?: string;
  role?: Roles;
}

export abstract class UsersService {
  abstract AddUser(user: User): Observable<boolean>;
  abstract removeUser(id: number): Observable<boolean>;
  abstract getUserById(id: number): Observable<User>;
  abstract logIn(email: string, password: string ): Observable<boolean>;
  abstract logout();
  abstract isLoggedIn(): boolean;
  abstract isAdmin(): boolean;
  abstract editUser(id: number, firstName: string, secondName: string, email: string, birthday: any, phone: string): Observable<User>;
  abstract getUser(): Observable<User>;
  abstract test();
  abstract getCurrentUser(): User;

}

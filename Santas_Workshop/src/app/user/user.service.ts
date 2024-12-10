import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { setAccessTokenInCookie } from '../shared/utils/setToken';
import { deleteAccessTokenCookie } from '../shared/utils/deleteToken';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  USER_KEY = '[user]';

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  // BASIC LOGIN
  // login(email: string, password: string) {
  //   return this.http
  //     .post<UserForAuth>('http://localhost:3030/users/login', { email, password })
  //     .pipe(tap((user) => this.user$$.next(user)));
  // }

  // SAVE THE TOKEN IN LOCAL STORAGE
  // login(email: string, password: string) {
  //   return this.http
  //     .post<UserForAuth>('http://localhost:3030/users/login', { email, password })
  //     .pipe(
  //       tap((user) => {
  //         // Assuming the accessToken is part of the response object
  //         if (user && user.accessToken) {
  //           localStorage.setItem('accessToken', user.accessToken);  // Save accessToken to localStorage
  //         }
  //         this.user$$.next(user);  // Update the user BehaviorSubject with the user data
  //       })
  //     );
  // }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('http://localhost:3030/users/login', { email, password })
      .pipe(
        tap((user) => {
          // Assuming the accessToken is part of the response object
          if (user && user.accessToken) {
            setAccessTokenInCookie(user.accessToken);  // Save accessToken in a cookie
          }
          this.user$$.next(user);  // Update the user BehaviorSubject with the user data
        })
      );
  }
  
  

  register(nickName: string, email: string, image: string, height: number, password: string, rePassword: string) {
    return this.http
      .post<UserForAuth>('http://localhost:3030/users/register', {
        nickName,
        email,
        image,
        height,
        password,
        rePassword
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  // logout() {
  //   return this.http
  //     .post('http://localhost:3030/users/logout', {})
  //     .pipe(tap(() => this.user$$.next(undefined)));
  // }


  // DELETE THE COOKIE
  logout() {    
    deleteAccessTokenCookie(); 
    return this.http
      .post('http://localhost:3030/users/logout', {})
      .pipe(
        tap(() => {
          this.user$$.next(undefined);  // Clear user data
        })
      );
  }
  
   

  // getProfile() {
  //   return this.http
  //     .get<UserForAuth>('/api/users/profile')
  //     .pipe(tap((user) => this.user$$.next(user)));
  // }

  // updateProfile(nickName: string, email: string, image: string, height: number) {
  //   return this.http
  //     .put<UserForAuth>('/api/users/profile', {
  //       nickName,
  //       email,
  //       image,
  //       height
  //     })
  //     .pipe(tap((user) => this.user$$.next(user)));
  // }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
}

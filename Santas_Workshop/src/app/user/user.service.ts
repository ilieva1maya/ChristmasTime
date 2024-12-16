import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';


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

  // constructor(private http: HttpClient) {
  //   this.userSubscription = this.user$.subscribe((user) => {
  //     this.user = user;
  //   });
  
  //   // Try to load user from localStorage
  //   const storedUser = localStorage.getItem(this.USER_KEY);
  //   if (storedUser) {
  //     const parsedUser = JSON.parse(storedUser) as UserForAuth;
  //     this.user$$.next(parsedUser);
  //   }
  // }
  



  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('http://localhost:3030/users/login', { email, password }, { observe: 'response' })  // Observe the full response
      .pipe(
        tap((response) => {
          const user = response.body;
          if (user && user.accessToken) {
            localStorage.setItem('accessToken', user.accessToken);
          }
          this.user$$.next(user!);
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
      .pipe(
        tap((response) => {
          const user = response;
          if (user && user.accessToken) {
            localStorage.setItem('accessToken', user.accessToken);
          }
          this.user$$.next(user!);
        })
      );
  }

  logout() {
    localStorage.removeItem('accessToken');
    return this.http
      .post('http://localhost:3030/users/logout', {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('http://localhost:3030/users/me')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(nickName: string, email: string, image: string, height: number) {

    const token = localStorage.getItem('accessToken');

    const requestBody = {
      nickName,
      email,
      image,
      height
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('X-Authorization', token);
    }

    // console.log('Headers:', headers.keys().map(key => `${key}: ${headers.get(key)}`).join(', '));

    this.user = {
      ...this.user,
      nickName,
      email,
      image,
      height
    };

    this.user$$.next(this.user);

    return this.http
      .put<UserForAuth>('http://localhost:3030/users/me', requestBody, { headers })
  }

  // updateProfile(nickName: string, email: string, image: string, height: number) {
  //   const token = localStorage.getItem('accessToken');
  
  //   const requestBody = {
  //     nickName,
  //     email,
  //     image,
  //     height
  //   };
  
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  
  //   if (token) {
  //     headers = headers.set('X-Authorization', token);
  //   }
  
  //   // Update the local user object and emit it to the user$$ BehaviorSubject
  //   const updatedUser = {
  //     ...this.user,  // Spread the existing user object to keep any unchanged properties
  //     nickName,
  //     email,
  //     image,
  //     height
  //   };
  
  //   // Update BehaviorSubject with new user data
  //   this.user$$.next(updatedUser);
  
  //   // Persist the updated user data to localStorage (optional but recommended if you want to keep the updated info across sessions)
  //   localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
  
  //   // Return the HTTP PUT request to update the user profile on the backend
  //   return this.http
  //     .put<UserForAuth>('http://localhost:3030/users/me', requestBody, { headers })
  //     .pipe(
  //       tap((response) => {
  //         // If needed, persist the updated user with the access token again
  //         const user = response;
  //         if (user && user.accessToken) {
  //           localStorage.setItem('accessToken', user.accessToken);
  //         }
  //         // Emit the updated user data to the BehaviorSubject
  //         this.user$$.next(user);
  //       })
  //     );
  // }
  

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
}

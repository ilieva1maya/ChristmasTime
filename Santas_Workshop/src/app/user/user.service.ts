import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
// import { setAccessTokenInCookie } from '../shared/utils/setToken';
// import { deleteAccessTokenCookie } from '../shared/utils/deleteToken';

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

  // SAVE THE TOKEN IN LOCAL STORAGE / GET HEADERS OF THE RESPONSE
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

  // updateProfile(nickName: string, email: string, image: string, height: number) {
  //   return this.http
  //     .put<UserForAuth>('http://localhost:3030/users/me', {
  //       nickName,
  //       email,
  //       image,
  //       height
  //     })
  //     .pipe(tap((user) => this.user$$.next(user)));

  // }

  // updateProfile(nickName: string, email: string, image: string, height: number) {
  //   return this.http
  //     .put<UserForAuth>('http://localhost:3030/users/me', {
  //       nickName,
  //       email,
  //       image,
  //       height
  //     })
  //     .pipe(
  //       tap((user) => {
  //         console.log('Updated User:', user); // Log the user object returned from the backend

  //         // Update the BehaviorSubject with the new user data
  //         this.user$$.next(user);

  //         // Log the current state of the user$$ observable
  //         this.user$$.subscribe(currentUser => {
  //           console.log('Current User in user$$:', currentUser); // Log the updated user from the BehaviorSubject
  //         });
  //       })
  //     );
  // }


  updateProfile(nickName: string, email: string, image: string, height: number) {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('accessToken');
  
    // Set headers for the request
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    // If token exists, add it to the headers
    if (token) {
      headers = headers.set('X-Authorization', token); // Add the token to the header
    }
  
    // Log headers (showing keys and values)
    console.log('Headers:', headers.keys().map(key => `${key}: ${headers.get(key)}`));
  
    // Log user-related values for debugging
    console.log('User:', this.user);
    console.log('User$ Observable:', this.user$);
    console.log('User$$ BehaviorSubject:', this.user$$);
  
    // Make the PUT request to update the profile
    return this.http
      .put<UserForAuth>('http://localhost:3030/users/me', {
        nickName,
        email,
        image,
        height
      }, { headers })  // Attach the headers to the PUT request
      .pipe(
        tap((user) => {
          // Log the updated user returned from the backend
          console.log('Updated User:', user);
  
          // Update the BehaviorSubject with the new user data
          this.user$$.next(user);
  
          // Log the current state of the user$$ observable
          this.user$$.subscribe(currentUser => {
            console.log('Current User in user$$:', currentUser);
          });
        })
      );
  }
  

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
}

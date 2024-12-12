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

  // MOST WORKING
  // updateProfile(nickName: string, email: string, image: string, height: number) {
  //   // Retrieve the token from localStorage
  //   const token = localStorage.getItem('accessToken');

  //   // Create the request payload (what you're sending to the server)
  //   const requestBody = {
  //     nickName,
  //     email,
  //     image,
  //     height
  //   };


  //   // Log the request payload
  //   console.log('requesBody:', requestBody);
  //   console.log('user:', this.user);

  //   // Set headers for the request
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   // If token exists, add it to the headers
  //   if (token) {
  //     headers = headers.set('X-Authorization', token); // Add the token to the header
  //   }

  //   // Log headers (showing keys and values)
  //   console.log('Headers:', headers.keys().map(key => `${key}: ${headers.get(key)}`).join(', '));

  //   // Make the PUT request to update the profile
  //   return this.http
  //     .post<UserForAuth>('http://localhost:3030/users/me', requestBody, { headers })  // Attach the headers to the PUT request
  //     .pipe(
  //       tap((user) => {

  //         // Update the BehaviorSubject with the new user data
  //         // this.user$$.next(user);

  //         // Log the current state of the user$$ observable after update
  //         // this.user$$.subscribe(currentUser => {
  //         //   console.log('Current User in user$$:', currentUser); // This will reflect the updated user state
  //         // });
  //       })
  //     );
  // }

  updateProfile(nickName: string, email: string, image: string, height: number) {

    // Retrieve the token from localStorage
    const token = localStorage.getItem('accessToken');

    // Create the request payload (what you're sending to the server)
    const requestBody = {
      nickName,
      email,
      image,
      height
    };

    // Set headers for the request
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // If token exists, add it to the headers
    if (token) {
      headers = headers.set('X-Authorization', token); // Add the token to the header
    }

    // Log headers (showing keys and values)
    console.log('Headers:', headers.keys().map(key => `${key}: ${headers.get(key)}`).join(', '));

    // Update the local user object before making the PUT request
    this.user = {
      ...this.user, // Keep the current values
      nickName,
      email,
      image,
      height
    };

    // Update the BehaviorSubject with the new user data immediately
    this.user$$.next(this.user);

    // Log the updated user object before the PUT request
    console.log('Updated Local User (Before Request):', this.user);

    // Make the PUT request to update the profile
    return this.http
      .put<UserForAuth>('http://localhost:3030/users/me', requestBody, { headers })  // Attach the headers to the PUT request 


      // !!!!   HAVE TO PERFORM UPDATE IN THE SERVER DATA (REGISTER??) !!!!!
  }


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
}

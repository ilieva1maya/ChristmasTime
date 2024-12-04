import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{

  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  USER_KEY = '[user]';

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) =>{
      this.user = user;
    });
  }

  register(username: string, email: string, tel: string,  password: string, rePassword: string){
    return this.http
    .post<UserForAuth>('/api/register', { username, email, tel, password, rePassword })
    .pipe(tap((user) =>this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

}

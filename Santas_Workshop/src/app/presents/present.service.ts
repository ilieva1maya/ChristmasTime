import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Present } from '../types/present';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PresentService implements OnDestroy{

  private present$$ = new BehaviorSubject<Present | undefined>(undefined);
  private present$ = this.present$$.asObservable();

  present: Present | undefined;
  PRESENT_KEY = '[present]';

  presentSubscription: Subscription;
  
  constructor(private http: HttpClient) {
    this.presentSubscription = this.present$.subscribe((present) => {
      this.present = present;
    });
  }


  ngOnDestroy(): void {
    this.presentSubscription.unsubscribe()
  }

}

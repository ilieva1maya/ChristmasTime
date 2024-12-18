import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Present } from '../types/present';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PresentService implements OnDestroy {
  private present$$: BehaviorSubject<Present | undefined>;

  private present$: Observable<Present | undefined>;

  present: Present | undefined;
  PRESENT_KEY = '[presentData]';

  presentSubscription: Subscription;

  constructor(private http: HttpClient) {
    this.present$$ = new BehaviorSubject<Present | undefined>(undefined);

    this.present$ = this.present$$.asObservable();

    this.presentSubscription = this.present$.subscribe((present) => {
      this.present = present;      
    });
  }

  ngOnDestroy(): void {
    this.presentSubscription.unsubscribe();
  }
}

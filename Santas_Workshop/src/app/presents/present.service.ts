// import { Injectable, OnDestroy } from '@angular/core';
// import { BehaviorSubject, Subscription } from 'rxjs';
// import { Present } from '../types/present';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class PresentService implements OnDestroy{

//   private present$$ = new BehaviorSubject<Present>;
//   private present$ = this.present$$.asObservable();

//   constructor(private http: HttpClient) {
//        this.presentSubscription = this.present$.subscribe((present) => {
//       this.present = present;
//     })

//     this.present$$ = new BehaviorSubject<Present>({
//       reservations: this.present?.reservations!,
//       itemName: this.present?.itemName!,
//       itemDescription: this.present?.itemDescription!,
//       itemImage: this.present?.itemImage!,
//       itemCategory: this.present?.itemCategory!,
//       itemStatus: this.present?.itemStatus!,
//       owner: this.present?.owner!,
//       _id: this.present?._id!,
//     });
//   }

//   present: Present | undefined;
//   PRESENT_KEY = '[present]';

//   presentSubscription: Subscription;

//   ngOnDestroy(): void {
//     this.presentSubscription.unsubscribe()
//   }
// }

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

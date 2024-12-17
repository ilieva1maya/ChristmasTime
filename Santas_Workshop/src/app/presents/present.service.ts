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


// export class PresentService implements OnDestroy {

//   private present$$ = new BehaviorSubject<Present | undefined>(undefined); // Initial value is undefined
//   private present$ = this.present$$.asObservable();

//   present: Present | undefined;
//   PRESENT_KEY = '[present]';

//   presentSubscription: Subscription;
  
//   constructor(private http: HttpClient) {
//     // Subscribe to the BehaviorSubject to set the value to this.present
//     this.presentSubscription = this.present$.subscribe((present) => {
//       this.present = present;
//     });
//   }

//   ngOnDestroy(): void {
//     this.presentSubscription.unsubscribe();
//   }

//   // Example method to update the present data
//   fetchPresent(presentId: string): void {
//     this.http.get<Present>(`http://yourapi.com/presents/${presentId}`).subscribe(
//       (data) => {
//         // Assuming the API returns a Present object
//         this.present$$.next(data); // Update BehaviorSubject with the new data
//       },
//       (error) => {
//         console.error('Error fetching present:', error);
//       }
//     );
//   }
// }


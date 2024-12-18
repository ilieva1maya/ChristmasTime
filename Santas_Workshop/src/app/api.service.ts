import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Present } from './types/present';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Reservation } from './types/reservation';
import { UserForAuth } from './types/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private present$$ = new BehaviorSubject<Present | undefined>(undefined);
  private present$ = this.present$$.asObservable();

  present: Present | undefined;
  PRESENT_KEY = '[present]';

  presentSubscription: Subscription;

  constructor(private http: HttpClient, private router: Router) {
    this.presentSubscription = this.present$.subscribe((present) => {
      this.present = present;
    });
  }

  getPresents() {
    const { apiUrl } = environment;
    return this.http.get<Present[]>(`${apiUrl}/data/presents`);
  }

  getReservations() {
    const { apiUrl } = environment;
    return this.http.get<Reservation[]>(`${apiUrl}/data/reservations`);
  }

  getPresentById(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Present>(`${apiUrl}/data/presents/${id}`)
  }

  createPresent(itemName: string, itemDescription: string, itemImage: string, itemCategory: string, itemStatus: string, owner: string) {
    const { apiUrl } = environment;
    return this.http.post<Present>(`${apiUrl}/data/presents`, { itemName, itemDescription, itemImage, itemCategory, itemStatus, owner });
  }

  createReservation(reservationComment: string, user: UserForAuth, presentId: string) {
    const { apiUrl } = environment;
    return this.http.post<Reservation>(`${apiUrl}/data/reservations`, { reservationComment, user, presentId });
  }
  

  // createReservation(reservationComment: string, user: UserForAuth, presentId: string) {
  //   const { apiUrl } = environment;
  //   console.log(reservationComment, user, presentId)
  //   return this.http.post<Reservation>(`${apiUrl}/data/reservations`, { reservationComment, user, presentId })
  // }

  updatePresent(itemName: string, itemDescription: string, itemImage: string, itemCategory: string, itemStatus: string, id: string, owner: string): Observable<Present> {
    const { apiUrl } = environment;
    const token = localStorage.getItem('accessToken');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('X-Authorization', token);
    }

    return this.http.put<Present>(`${apiUrl}/data/presents/${id}`,
      { itemName, itemDescription, itemImage, itemCategory, itemStatus, id, owner }, { headers });
  }

  deletePresent(id: string) {
    const { apiUrl } = environment;
    const token = localStorage.getItem('accessToken');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('X-Authorization', token);
    }

    return this.http.delete<Present>(`${apiUrl}/data/presents/${id}`).subscribe(() => {
      this.router.navigate(['/warehouse']);
    });
  }
}



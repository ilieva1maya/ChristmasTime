import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Present } from './types/present';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Reservation } from './types/reservation';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }

  getPresents() {
    const { apiUrl } = environment;
    return this.http.get<Present[]>(`${apiUrl}/data/presents`);
  }

  getReservations(){
    const { apiUrl } = environment;
    return this.http.get<Reservation[]>(`${apiUrl}/data/reservations`);
  }

  getPresentById(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Present>(`${apiUrl}/data/presents/${id}`)
  }

  createPresent(itemName: string, itemDescription: string, itemImage: string, itemCategory: string, itemStatus: string, owner: string) {
    const { apiUrl } = environment;
    console.log(itemName, itemDescription, itemImage, itemCategory, itemStatus, owner)
    return this.http.post<Present>(`${apiUrl}/data/presents`, { itemName, itemDescription, itemImage, itemCategory, itemStatus, owner });
  }

  createReservation(){
    
  }

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

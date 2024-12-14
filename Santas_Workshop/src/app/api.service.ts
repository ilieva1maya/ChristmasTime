import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Present } from './types/present';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }

  getPresents() {
    const { apiUrl } = environment;
    return this.http.get<Present[]>(`${apiUrl}/data/presents`);
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

  // _id or id ???
  updatePresent(itemName: string, itemDescription: string, itemImage: string, itemCategory: string, itemStatus: string, id: string, owner: string) {
    const { apiUrl } = environment;
    const token = localStorage.getItem('accessToken');
    // this.router.navigate(['/warehouse']);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // If token exists, add it to the headers
    if (token) {
      headers = headers.set('X-Authorization', token); // Add the token to the header
    }

    return this.http.put<Present>(`${apiUrl}/data/presents/${id}`, { itemName, itemDescription, itemImage, itemCategory, itemStatus, id, owner }).subscribe(() => {
      // console.log(`${apiUrl}/data/presents/${id}`, itemName, itemDescription, itemImage, itemCategory, itemStatus, id, { headers })
      this.router.navigate(['/warehouse']);
    });
  }
}

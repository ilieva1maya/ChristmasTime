import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Present } from './types/present';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPresents() {
    const { apiUrl } = environment; 
    return this.http.get<Present[]>(`${apiUrl}/data/presents`);    
  }

  getPresentById(id: string) {
    const { apiUrl } = environment;
    console.log(id)

    return this.http.get<Present>(`${apiUrl}/data/presents/${id}`)
  }

  // getPresents(): Observable<Present[]> {
  //   const { apiUrl } = environment;
  //   return this.http.get<Present[]>(`${apiUrl}/data/presents`)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error fetching presents:', error);
  //         throw error; // Optionally, you can return a fallback value or handle errors differently
  //       })
  //     );
  // }

  createPresent(itemName: string, itemDescription: string, itemImage: string, itemCategory: string) {    
    console.log(`From apiService.ts: ${itemName}, ${itemDescription}, ${itemImage}, ${itemCategory}`)
    return EMPTY
    
    // return this.http.post<Present>('/api/presents', {itemName, itemDescription, itemImage, itemCategory});

  }
}

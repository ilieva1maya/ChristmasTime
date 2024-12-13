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
    return this.http.get<Present>(`${apiUrl}/data/presents/${id}`)
  }

  createPresent(itemName: string, itemDescription: string, itemImage: string, itemCategory: string, itemStatus: string) {    
    const { apiUrl } = environment;
    return this.http.post<Present>(`${apiUrl}/data/presents`, {itemName, itemDescription, itemImage, itemCategory, itemStatus});
  }

  updatePresent(itemName: string, itemDescription: string, itemImage: string, itemCategory: string, itemStatus: string) {
    console.log("From update (server logic later)", itemName, itemDescription, itemImage, itemCategory, itemStatus);
    return EMPTY
  }
}

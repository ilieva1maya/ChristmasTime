import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Present } from './types/present';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPresents() {
    // const api = environment.apiUrl;
    // или
    const { apiUrl } = environment;
    console.log(`api.service/getPresents()/apiUrl:${apiUrl}`)

    // return this.http.get<Theme[]>(`${apiUrl}/themes`);
    return EMPTY
  }

  createPresent(itemName: string, itemDescription: string, itemImage: string, itemCategory: string) {    
    console.log(`From apiService.ts: ${itemName}, ${itemDescription}, ${itemImage}, ${itemCategory}`)
    return EMPTY
    
    // return this.http.post<Present>('/api/presents', {itemName, itemDescription, itemImage, itemCategory});

  }
}

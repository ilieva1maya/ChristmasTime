import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPresents() {
    // const api = environment.apiUrl;
    // или
    const { apiUrl } = environment;

    // return this.http.get<Theme[]>(`${apiUrl}/themes`);
    return null
  }
}

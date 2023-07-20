import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseUrl = 'https://localhost:44339/api/';
  constructor(private http: HttpClient) { }

  getNavigation():any{
    return this.http.get<any>(this.baseUrl+'Pages/GetNavigation');
  }
}
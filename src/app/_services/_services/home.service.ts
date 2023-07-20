import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = 'https://localhost:44339/api/';
  constructor(private http: HttpClient) { }

  getCourses():any{
    return this.http.get<any>(this.baseUrl+'Courses/GetCourses');
  }
}
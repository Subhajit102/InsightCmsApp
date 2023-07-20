import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = 'https://localhost:44339/api/';
  constructor(private http: HttpClient) { }

  getCourse(courseId:number):any{
    return this.http.get<any>(this.baseUrl+`Courses/GetCourse/${courseId}`);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginUser } from 'src/app/_models/loginUser';
import { RegisterUser } from 'src/app/_models/resgisterUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://localhost:44339/api/';
  constructor(private http: HttpClient) { }

  registerUser(user: RegisterUser):any{
    return this.http.post<any>(this.baseUrl+'Users/RegisterUser',user);
  }

  login(user:LoginUser){
    return this.http.post<any>(this.baseUrl+'Users/Login',user);
  }

  getUserCourses(userId:any){
    return this.http.get<any>(this.baseUrl+`Users/GetUserCourses/${userId}`);
  }

  getUserCourse(userId:any, courseId:any){
    return this.http.get<any>(this.baseUrl+`Users/GetUserCourse/${userId}/${courseId}`);
  }

  updateUserCourse(userCourseObj:any){
    return this.http.put<any>(this.baseUrl+'Users/UpdateUserCourse',userCourseObj);
  }
}

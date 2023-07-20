import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../_services/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  small:boolean=false;
  loginUser:any={};
  constructor(private userService:UserService, 
    private router:Router) { }

  ngOnInit(): void {
    this.small = this.getIsMobile();
    window.onresize = () => {
      this.small = this.getIsMobile();
    };
  }
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 1024;
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }
  login(){
    this.userService.login(this.loginUser).subscribe({
      next: (response: any)=>{
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigateByUrl('home');
      },
      error: (err: any)=>{console.log(err.error)}
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUser } from '../_models/resgisterUser';
import { UserService } from '../_services/_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  small:boolean=false;
  
  registerUser:RegisterUser={
    userName:undefined,
    email:undefined,
    phoneNumber:undefined,
    password:undefined
  };

  constructor(private userService: UserService,
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

  register(){
    console.log(this.registerUser);
    this.userService.registerUser(this.registerUser).subscribe({
      next: (response: any)=>{
        if(response.userId){
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigateByUrl('home');
        }
      },
      error: (err: any)=>{console.log(err)}
    });
  }
}

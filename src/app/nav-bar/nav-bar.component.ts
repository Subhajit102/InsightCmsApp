import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../_services/_services/navigation.service';
import { UserService } from '../_services/_services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() small:boolean|undefined;
  toggleOpened=false;
  loggedIn=false;
  loggedInUser:string|null='';
  avatarName:string|undefined='';
  avatarUserName:string|undefined='';
  avatarEmail:string|undefined='';

  navigationItems:any;
  constructor(private router:Router,
    private navigationService:NavigationService,
    private userService:UserService) {
    if(localStorage.getItem('user')){
      this.loggedIn = true;
      this.loggedInUser=localStorage.getItem('user');
      if(this.loggedInUser){
        this.avatarName = JSON.parse(this.loggedInUser)?.userName?.[0].toUpperCase();
        this.avatarUserName = JSON.parse(this.loggedInUser)?.userName?.toUpperCase();
        this.avatarEmail = JSON.parse(this.loggedInUser)?.email;
      }
    };
    this.navigationService.getNavigation().subscribe((val: any)=>{
      this.navigationItems=val;
    })
   }

  ngOnInit(): void {
  }
  openMenuForMobile() {
    this.toggleOpened=!this.toggleOpened;
  }
  onLoginButtonClick(){
    this.router.navigateByUrl('/login');
  }
  onRegisterButtonClick(){
    this.router.navigateByUrl('/register');
  }
  onLogout(){
    localStorage.removeItem('user');
    this.loggedIn=false;
    this.router.navigateByUrl('/home');
  }
  goToCart(){
    this.router.navigateByUrl('/cart');
  }
}

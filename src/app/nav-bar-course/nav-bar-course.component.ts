import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-course',
  templateUrl: './nav-bar-course.component.html',
  styleUrls: ['./nav-bar-course.component.scss']
})
export class NavBarCourseComponent implements OnInit {
  @Input() courseTitle: string | undefined;
  @Input() small: boolean | undefined;

  toggleOpened=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  openMenuForMobile() {
    this.toggleOpened=!this.toggleOpened;
  }
  goToMyLearning(){
    this.router.navigateByUrl('/my-learning');
  }
}

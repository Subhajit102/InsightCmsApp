import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../_services/_services/home.service';
import { UserService } from '../_services/_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  small: boolean = false;
  courseList: any;
  userCourseList: any = [];
  userId: any;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private router: Router,
    private homeService: HomeService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.small = this.getIsMobile();
    window.onresize = () => {
      this.small = this.getIsMobile();
    };

    this.homeService.getCourses().subscribe({
      next: (response: any) => {
        this.courseList = response;
      }
    });
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

  onCourseClick(id: number, name: string) {
    if (localStorage.getItem('user')) {
      var uid = localStorage.getItem('user');
      if (uid) {
        this.userService.getUserCourses(JSON.parse(uid)?.userId).subscribe(val => {
          this.userCourseList = val;
          var coursePresent = false;
          this.userCourseList.forEach((v: any) => {
            if (v.courseId == id) {
              this.router.navigateByUrl(`/course/${id}/` + name);
              coursePresent = true;
              return;
            }
          });
          if (!coursePresent) {
            this.router.navigateByUrl(`/course-list/${id}/` + name);
          }
        });
      }
    }
    else {
      this.router.navigateByUrl(`/course-list/${id}/` + name);
    }
  }
}

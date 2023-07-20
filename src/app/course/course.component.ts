import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { take } from 'rxjs';
import { Course, UserCourse } from '../_models/course';
import { sampleData } from '../_sample-data/sample_data';
import { CourseService } from '../_services/_services/course.service';
import { UserService } from '../_services/_services/user.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  videoItems = [
    {
      name: 'Video one',
      src: "https://res.cloudinary.com/demo/video/upload/c_pad,du_10,h_360,q_70,w_480/dog.mp4",
      type: 'video/mp4'
    },
    {
      name: 'Video two',
      src: "https://res.cloudinary.com/demo/video/upload/c_scale,du_10,h_360,q_70,w_480/elephants.mp4",
      type: 'video/mp4'
    },
    {
      name: 'Video three',
      src: "https://res.cloudinary.com/demo/video/upload/c_pad,du_10,h_360,q_70,w_480/dog.mp4",
      type: 'video/mp4'
    },
    {
      name: 'Video four',
      src: "https://res.cloudinary.com/demo/video/upload/c_scale,du_10,h_360,q_70,w_480/elephants.mp4",
      type: 'video/mp4'
    },
    {
      name: 'Video five',
      src: "https://res.cloudinary.com/demo/video/upload/c_pad,du_10,h_360,q_70,w_480/dog.mp4",
      type: 'video/mp4'
    },
    {
      name: 'Video six',
      src: "https://res.cloudinary.com/demo/video/upload/c_scale,du_10,h_360,q_70,w_480/elephants.mp4",
      type: 'video/mp4'
    }
  ];
  courseVideos: any = [];
  activeIndex = 0;

  currentVideo = this.courseVideos[this.activeIndex];

  data: any;

  message = false;
  timeout: any;
  duration = 4000;
  small = false;

  routeParams: string | undefined;
  coursename: string | null = "";
  courseId: number = 0;
  courseDetails: Course | undefined;
  currentSectionId: number = 5001;
  currentTopicId:number = 0;
  userCourseDetails: any;
  userId: number = 0;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private cdf: ChangeDetectorRef) {
    document.addEventListener('mousemove', () => {
      this.message = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.message = false;
      }, this.duration);
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.small = this.getIsMobile();
    window.onresize = () => {
      this.small = this.getIsMobile();
    };
    const cid = this.route.snapshot.paramMap.get('courseId');
    if (cid) {
      this.courseId = parseInt(cid);
      this.courseService.getCourse(parseInt(cid)).subscribe((data: any) => {
        this.courseDetails = data;
        this.coursename = data.courseName;
        this.courseDetails?.sections?.forEach(section => {
          if (section?.topics) {
            section?.topics?.forEach(topic => {
              this.courseVideos = [...this.courseVideos, topic];
            })
          }
        });
        console.log(this.courseVideos);
        

        var uid = localStorage.getItem('user');
        if (uid) {
          this.userId = JSON.parse(uid)?.userId;
          this.nextVideo();
          this.getUserCourseDetails();
          this.cdf.detectChanges();
        }
      })
    }
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

  getUserCourseDetails() {
    this.userService.getUserCourse(this.userId, this.courseId).subscribe(val => {
      if (val) {
        this.userCourseDetails = val;
        console.log(this.userCourseDetails);
        for(var i=0;i<this.courseVideos.length;i++){
          if(this.courseVideos[i].topicId == this.userCourseDetails.lastTopicId){
            this.activeIndex = i;
          }
        }
        this.currentVideo = this.courseVideos[this.activeIndex];
        this.currentSectionId = this.courseVideos[this.activeIndex].sectionId;
      }
    });
  }

  updateUserCourse(){
    var userCourse:UserCourse={
      userCourseId: 0,
      userId: this.userId,
      courseId: this.courseId,
      lastSectionId: this.currentSectionId,
      lastTopicId: this.currentTopicId,
      lastTopicTime: '',
      topicsCompleted: this.currentTopicId.toString(),
      numberOfTopicsCompleted:1
    }
    this.userService.updateUserCourse(userCourse).pipe(take(1)).subscribe();
  }
  videoPlayerInit(data: any) {
    this.data = data;
    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    this.activeIndex = -1;
  }
  nextVideo() {
    this.activeIndex++;
    if (this.activeIndex === this.courseVideos.length) {
      return;
      this.activeIndex = 0;
    }
    this.currentVideo = this.courseVideos[this.activeIndex];
    this.currentSectionId = this.courseVideos[this.activeIndex].sectionId;
    this.currentTopicId = this.courseVideos[this.activeIndex].topicId;
    this.updateUserCourse();
  }
  initVdo() {
    this.data.play();
  }
  startPlaylistVdo(item: any, index: number) {
    this.activeIndex = index;
    this.currentVideo = item;
  }
  // groups = sampleData;

  toggleAccordian(sectionName: string) {
    this.courseDetails?.sections.forEach(val => {
      if (val.sectionName == sectionName) {
        val.accordianOpen = !val.accordianOpen;
      }
    })
  }
  getSectionVideo(sectionId: any) {
    return this.courseVideos.filter((x: { sectionId: any; }) => x.sectionId == sectionId);
  }
  openAccordianSection(sectionId: any) {
    return this.currentSectionId == sectionId;
  }
}

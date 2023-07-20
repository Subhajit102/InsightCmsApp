import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ModalComponent } from '../modal/modal.component';
import { CartItem } from '../_models/cartItem';
import { Course } from '../_models/course';
import { sampleData } from '../_sample-data/sample_data';
import { CartService } from '../_services/_services/cart.service';
import { CourseService } from '../_services/_services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  small:boolean=false;
  showPro:boolean=true;
  modalRef?: BsModalRef|undefined;
  items: any[];
  courseId:number =0 ;
  courseDetails:Course|undefined;
  ratinglist: number[]=[];
  isHalfRating:boolean = false;
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
      name: 'Video four',
      src: "https://res.cloudinary.com/demo/video/upload/c_scale,du_10,h_360,q_70,w_480/elephants.mp4",
      type: 'video/mp4'
    },
    {
      name: 'Video five',
      src: "https://res.cloudinary.com/demo/video/upload/c_pad,du_10,h_360,q_70,w_480/dog.mp4",
      type: 'video/mp4'
    },
  ];

  previewTopics:any = [];
  list: any[] = ['abc'];
  activeIndex = 0;
  // currentVideo = this.videoItems[this.activeIndex];
  currentVideo = this.previewTopics[this.activeIndex];

  data: any;
	panels = ['First', 'Second', 'Third'];

  addedToCartHeader:any;
  constructor(private router: Router,
    private route:ActivatedRoute,
    private modalService: BsModalService,
    private courseService: CourseService,
    private cartService:CartService,
    public ngxSmartModalService: NgxSmartModalService) {
      this.items = Array(15).fill(0);
     }

  ngOnInit(): void {
    this.small = this.getIsMobile();
    window.onresize = () => {
      this.small = this.getIsMobile();
    };
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    const cid = this.route.snapshot.paramMap.get('courseId');
    if(cid){
      this.courseId = parseInt(cid);
      this.courseService.getCourse(parseInt(cid)).subscribe((data: any)=>{
         this.courseDetails = data;
         this.courseDetails?.sections?.forEach(section=>{
          if(section?.topics){
            section?.topics?.forEach(topic =>{
              if(topic?.preview){
                this.previewTopics = [...this.previewTopics,topic];
              }
            })
          }
         });
         console.log(this.previewTopics);
         if(this.courseDetails?.rating){
          for(var i=1;i<=5;i++){
            if(i <= Math.floor(this.courseDetails?.rating)){
              this.ratinglist = [...this.ratinglist,i];
            }
            else{ break;}
          }
          if(this.courseDetails?.rating - Math.floor(this.courseDetails?.rating))
                this.ratinglist = [...this.ratinglist,-1];
          } 
          for(var i=this.ratinglist.length;i<5;i++){
              this.ratinglist = [...this.ratinglist,0];    
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

  onRadioClick(s:number){
    if(s==1){
      this.showPro=false;
    }
    else{
      this.showPro=true;
    }
  }

  groups = sampleData;

  toggleAccordian(title:string){
    this.groups.forEach(val =>{
      if(val.title == title){
        val.accordianOpen = !val.accordianOpen;
      }
    })
  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class:"modal-lg"});
  }
  openAddToCartModal(template: TemplateRef<any>){
    var user= localStorage.getItem('user');
    var userId;
    if(user){
      userId = JSON.parse(user)?.userId;
    }
    else{
      this.router.navigateByUrl('/login');
    }
    const cartItem : CartItem = {
      userId: userId,
      courseId: this.courseId,
      price: this.courseDetails?.price,
      discountedPrice: this.courseDetails?.displayPrice,
      promoCode: '',
      activeInCart: true,
      saveForLater: false,
      wishlist: false,
    }
    this.cartService.addToCart(cartItem).subscribe((val: any)=>{
      if(val){
        this.addedToCartHeader = val.responseMessage;
      }
    })
    this.modalRef = this.modalService.show(template,{class:"modal-lg"});
  }
  goToCart(){
    this.modalService.hide();
    this.router.navigateByUrl('/cart');
  }
  videoPlayerInit(data: any) {
    this.data = data;
    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    this.activeIndex= -1;
    this.nextVideo();
  }
  nextVideo() {
    this.activeIndex++;
    if (this.activeIndex === this.previewTopics.length) {
      this.activeIndex = 0;
    }
    this.currentVideo = this.previewTopics[this.activeIndex];
  }
  initVdo() {
    this.data.play();
  }
  startPlaylistVdo(item: any, index: number) {
    this.activeIndex = index;
    this.currentVideo = item;
  }
  // onClickPlaylistVideo(item: { title: string; src: string; type: string; }, index: number) {
  //   this.currentIndex = index;
  //   this.activeVideo = item;
  // }

}

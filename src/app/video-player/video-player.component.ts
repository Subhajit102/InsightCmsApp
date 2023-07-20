import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoSource:string | undefined;
  

  message = false;
  timeout: any;
  duration = 4000;
  small=false;

  constructor() {
    document.addEventListener('mousemove', () => {
      this.message = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.message = false;
      }, this.duration);
    });


  }

  ngOnInit(): void {
  }

  // videoPlayerInit(data: any) {
  //   this.data = data;
  //   this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
  //   this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  // }
  // nextVideo() {
  //   this.activeIndex++;
  //   if (this.activeIndex === this.videoItems.length) {
  //     this.activeIndex = 0;
  //   }
  //   this.currentVideo = this.videoItems[this.activeIndex];
  // }
  // initVdo() {
  //   this.data.play();
  // }
  // startPlaylistVdo(item: any, index: number) {
  //   this.activeIndex = index;
  //   this.currentVideo = item;
  // }
  
  // groups = sampleData;

  // toggleAccordian(title:string){
  //   this.groups.forEach(val =>{
  //     if(val.title == title){
  //       val.accordianOpen = !val.accordianOpen;
  //     }
  //   })
  // }
  // addGroupItem(): void {
  //   this.groups.push({
  //     title: `Dynamic Group Header - ${this.groups.length + 1}`,
  //     content: `Dynamic Group Body - ${this.groups.length + 1}`
  //   });
  // }
}
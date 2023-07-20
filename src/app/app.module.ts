import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VideoPlayerComponent } from './video-player/video-player.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';


import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course/course.component';
import { NavBarCourseComponent } from './nav-bar-course/nav-bar-course.component';
import { ModalComponent } from './modal/modal.component';
 import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ScreenShareComponent } from './screen-share/screen-share.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart/cart.component';
import { PaymentSuccessComponent } from './payment-redirect/payment-success/payment-success/payment-success.component';
import { MyLearningComponent } from './my-learning/my-learning/my-learning.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    CourseListComponent,
    CourseComponent,
    NavBarCourseComponent,
    ModalComponent,
    LoginComponent,
    RegisterComponent,
    ScreenShareComponent,
    CartComponent,
    PaymentSuccessComponent,
    MyLearningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    NgbModule,
    NgbCarouselModule,
    NgbAccordionModule,
    NgChartsModule
  ],
  providers: [NgxSmartModalService],
  bootstrap: [AppComponent],
})
export class AppModule { }

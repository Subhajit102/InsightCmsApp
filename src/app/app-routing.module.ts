import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyLearningComponent } from './my-learning/my-learning/my-learning.component';
import { PaymentSuccessComponent } from './payment-redirect/payment-success/payment-success/payment-success.component';
import { RegisterComponent } from './register/register.component';
import { ScreenShareComponent } from './screen-share/screen-share.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'screen-share', component: ScreenShareComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart',component:CartComponent },
  { path: 'my-learning',component:MyLearningComponent },
  { path: 'course-list/:courseId/:courseName', component: CourseListComponent },
  { path: 'course/:courseId/:courseName', component: CourseComponent },
  { path: 'payment-success/:order_id/:payment_id/:payment_signature', component: PaymentSuccessComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // {
    //   scrollPositionRestoration: "enabled",
    //   scrollOffset: [0, 0],
    //   anchorScrolling: "enabled",
    // }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

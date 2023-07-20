import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserOrder, VerifySignature } from '../_models/cartOrder';
import { CartService } from '../_services/_services/cart.service';
import { CourseService } from '../_services/_services/course.service';
declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  small: boolean = false;
  ar = [1, 2, 3, 4];
  verifySignatureObj: VerifySignature | undefined;
  userAddress: string = '';
  userId: number = 0;
  userName: string = '';
  userEmail: string = '';
  userPhone: number = 0;
  cartItems: any = [];
  saveForLaterItems: any = [];
  wishListItems: any = [];

  cartTotal: number = 0;
  courseIds: string = '';
  constructor(private cartService: CartService,
    private courseService: CourseService,
    private cdf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.small = this.getIsMobile();
    window.onresize = () => {
      this.small = this.getIsMobile();
    };
    var user = localStorage.getItem('user');
    if (user) {
      this.userId = JSON.parse(user)?.userId;
      this.getCartItems();
      this.getSaveForLaterWishlistItems();
      this.userName = JSON.parse(user)?.userName;
      this.userEmail = JSON.parse(user)?.email;
      this.userPhone = parseInt(JSON.parse(user)?.phoneNumber);
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
  getCartItems() {
    this.cartService.getCartItems(this.userId).subscribe(item => {
      this.cartItems = [];
      this.cartTotal = 0;
      this.courseIds = '';
      if (item.length == 0) {
        this.cartItems = [];
      }
      item.forEach((val: any) => {
        if (val.activeInCart == true) {
          this.courseService.getCourse(val.courseId).subscribe((course: any) => {
            this.cartItems = [...this.cartItems, course];
            this.cartTotal += course.displayPrice;
            this.courseIds += course.courseId.toString() + ' ';
            this.cdf.detectChanges();
          });
        }
      });
      this.cdf.detectChanges();
    });
  }
  getSaveForLaterWishlistItems() {
    this.cartService.getSaveForLaterWishlist(this.userId).subscribe(item => {
      this.saveForLaterItems = [];
      this.wishListItems = [];
      if (item.length == 0) {
        this.saveForLaterItems = [];
        this.wishListItems = [];
      }
      item.forEach((val: any) => {
        if (val.saveForLater == true) {
          this.courseService.getCourse(val.courseId).subscribe((course: any) => {
            this.saveForLaterItems = [...this.saveForLaterItems, course];
            this.cdf.detectChanges();
          });
        }
        else if (val.wishlist == true) {
          this.courseService.getCourse(val.courseId).subscribe((course: any) => {
            this.wishListItems = [...this.wishListItems, course];
            this.cdf.detectChanges();
          });
        }
      });
      this.cdf.detectChanges();
    });
  }
  payNow() {
    var userOrder: UserOrder = {
      id: 0,
      userId: this.userId,
      userEmail: this.userEmail,
      contact: this.userPhone,
      address: this.userAddress,
      orderId: '',
      paymentId: '',
      paymentSignature: '',
      recieptId: '23',
      orderTotal: this.cartTotal,
      finalOrderAmount: 10,//this.cartTotal,
      currency: 'INR',
      paymentCapture: 1,
      courseIds: this.courseIds,
      promoCode: '',
      orderCreatedDt: new Date(),
      paymentDt: new Date()
    }

    this.cartService.createOrder(userOrder).subscribe(orderId => {
      if (orderId) {
        var options = {
          key: "<rzp_key>", // Enter the Key ID generated from the Dashboard
          amount: userOrder.finalOrderAmount,//cartOrder.amount,
          currency: userOrder.currency,//cartOrder.currency,
          description: "Insight Learnings",
          image: "",
          order_id: orderId.orderId,
          prefill:
          {
            name: this.userName, //your customer's name
            email: this.userEmail,
            contact: this.userPhone.toString()//"9000090000"
          },
          theme: {
            color: '#004aad'
          },
          handler: function (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any; }) {
            var redirect_url = '';
            if (!(typeof response.razorpay_payment_id == 'undefined' || response.razorpay_payment_id < 1)) {
              redirect_url = `/payment-success/${response.razorpay_order_id}/${response.razorpay_payment_id}/${response.razorpay_signature}`;
              location.href = redirect_url;
            }
          },
          modal: {
            ondismiss: () => {
              console.log('dismissed');
            }
          },
        }

        const successCallback = (paymentId: any) => {
          console.log(paymentId);
        }
        const failureCallback = (e: any) => {
          console.log(e);
        }
        Razorpay.open(options, successCallback, failureCallback);
      }
    });
  }
  cartActions(courseId: number, actionId: number) {
    this.cartService.cartActions(this.userId, courseId, actionId).subscribe({
      next: () => {
        this.getCartItems();
        this.getSaveForLaterWishlistItems();
      }
    });
  }
}

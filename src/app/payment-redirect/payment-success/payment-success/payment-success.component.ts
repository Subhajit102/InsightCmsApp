import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifySignature } from 'src/app/_models/verifySignature';
import { CartService } from 'src/app/_services/_services/cart.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  order_id:any;
  payment_id:any;
  payment_signature:any;
  orderIdToShow:any;
  paymentIdToShow:any;

  small: boolean = false;

  constructor(private router: Router,
    private route:ActivatedRoute,
    private cartService:CartService) { }

  ngOnInit(): void {
    this.small = this.getIsMobile();
    window.onresize = () => {
      this.small = this.getIsMobile();
    };

    this.order_id = this.route.snapshot.paramMap.get('order_id');
    this.payment_id = this.route.snapshot.paramMap.get('payment_id');
    this.payment_signature = this.route.snapshot.paramMap.get('payment_signature');
    if( this.order_id && this.payment_id && this.payment_signature){
      const verifySignatureObj : VerifySignature = {
        razorpayOrderId: this.order_id,
        razorpayPaymentId:this.payment_id,
        razorpaySignature: this.payment_signature
      }
      this.cartService.verifySignature(verifySignatureObj).subscribe(val=>{
        if(val){
          this.orderIdToShow = val.orderId;
          this.paymentIdToShow = val.paymentId;
        }
        else{
          console.log("Some error occured!");
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

}

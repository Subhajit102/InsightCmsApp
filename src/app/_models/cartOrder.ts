export interface UserOrder {
    id:number;
    userId: number;
    userEmail: string;
    contact: number;
    address: string;
    orderId: string;
    paymentId: string;
    paymentSignature: string;
    recieptId: string;
    orderTotal: number;
    finalOrderAmount: number;
    currency: string;
    paymentCapture: number;
    courseIds: string;
    promoCode: string;
    orderCreatedDt: Date;
    paymentDt: Date;
}

export interface VerifySignature {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}
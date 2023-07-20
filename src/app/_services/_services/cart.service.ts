import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/_models/cartItem';
import { 
    UserOrder,
    VerifySignature } from 'src/app/_models/cartOrder';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = 'https://localhost:44339/api/';
  constructor(private http: HttpClient) { }

  addToCart(cartItem: CartItem):any{
    return this.http.post<any>(this.baseUrl+'Cart/AddToCart',cartItem);
  }

  getCartItems(userId:any){
    return this.http.get<any>(this.baseUrl+`Cart/GetCartItems/${userId}`);
  }
  getSaveForLaterWishlist(userId:any){
    return this.http.get<any>(this.baseUrl+`Cart/GetSaveForLaterWishlist/${userId}`);
  }
  createOrder(userOrder: UserOrder){
    return this.http.post<any>(this.baseUrl+'Cart/CreateOrder',userOrder);
  }
  verifySignature(verifySignature: VerifySignature){
    return this.http.post<any>(this.baseUrl+'Cart/VerifySignature',verifySignature);
  }
  cartActions(userId:number,courseId:number,actionId:number){
    return this.http.put<any>(this.baseUrl+`Cart/CartActions/${userId}/${courseId}/${actionId}`,{});
  }
}

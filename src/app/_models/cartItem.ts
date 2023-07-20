export interface CartItem{
    userId: number,
    courseId: number,
    price: number|undefined,
    discountedPrice: number|undefined,
    promoCode: string|undefined,
    activeInCart: boolean|undefined,
    saveForLater: boolean|undefined,
    wishlist: boolean|undefined,
}

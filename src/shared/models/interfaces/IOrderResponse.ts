export interface OrderResponse{
    internalId: {
       
      },
      orderId: string,
      partner: string,
      orderDate: Date,
      orderStatus: string,
      items: OrderItem[],
      partnerType: string
}

export interface OrderItem{
  sku: string,
  qty: string,
  title: string
}

export interface CartItem{
  sku : string,
  qty: string,
  title: string
}


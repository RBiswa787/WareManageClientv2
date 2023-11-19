export interface CheckOut{
    internalId: {},
   sku: string,
   qty: number,
   location: string,
   title: string,
   orderId : string,
   isCheckedOut: boolean
}

export interface OrderDictionary {
    [orderId: string]: OrderItem[];
  }

export interface OrderItem{
    sku: string;
      qty: number;
      title: string;
      location: string;
      isCheckedOut: boolean;
}
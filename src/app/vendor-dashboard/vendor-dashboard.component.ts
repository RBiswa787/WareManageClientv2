import { Component } from '@angular/core';
import { Inventory, ReceivedInventory } from 'src/shared/models/interfaces/IInventory';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/shared/services/api.service';
import { CartItem, OrderResponse } from 'src/shared/models/interfaces/IOrderResponse';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent {

  constructor(private apiService: ApiService){}
  sku : ReceivedInventory[] = [

  ];
  vendor = new BehaviorSubject<string>("");
  orders = new BehaviorSubject<OrderResponse[]>([]);
  order = new BehaviorSubject<OrderResponse>({
    internalId: {
       
    },
    orderId: "",
    partner: "",
    orderDate: new Date(),
    orderStatus: "",
    items: [],
    partnerType: ""
  });
  cart = new BehaviorSubject<CartItem[]>([]);
  ngOnInit(){
    if(window.localStorage.getItem("role") != "vendor"){
      window.location.href = "./";
    }
    this.apiService.originalInventory.subscribe(
      data => {
        this.sku = data;
      }
    );

    this.apiService.getInventoryOriginal();
     
    this.apiService.getAllOrder().subscribe(
      
      data => {
       this.orders.next(data);
      }
    );

    this.vendor.next(window.localStorage.getItem("username")!);
  }

  addToCart(item : any){
    let cart  = this.cart.value;
    cart.push(item);
    this.cart.next(cart);
  }

  removeFromCart(sku : string){
    let cart = this.cart.value;
    cart.splice(cart.findIndex(c => c.sku == sku),1);
    this.cart.next(cart);
  }
  isInCart(sku : string){
    let cart = this.cart.value;
    if(cart.findIndex(c => c.sku == sku) != -1)
    return true;
    else
    return false;
  }
  confirmOrder() {
    this.apiService.placeOrder(window.localStorage.getItem("username")!,JSON.parse(window.localStorage.getItem("vendor_cart")!),"vendor").subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        alert(error.message);
      }
    );
  }
  updateCart(sku: string,qty: string, title: string ){
    let cart = JSON.parse(window.localStorage.getItem("vendor_cart")!);
    interface IItem{
      sku : string,
      qty: string,
      title: string
    }
    let item   : IItem= {
      sku : sku,
      qty : qty,
      title : title
    };
    if(parseInt(qty) > 0){
      if(cart.findIndex((object : IItem) => object.sku == item.sku ) == -1)
      cart.push(item);
      else
      cart[cart.findIndex((object : IItem) => object.sku == item.sku )].qty = item.qty;
      window.localStorage.setItem("vendor_cart",JSON.stringify(cart));
    }
    else{
      if(cart.findIndex((object : IItem) => object.sku == item.sku ) != -1){
        console.log(cart.findIndex((object : IItem) => object.sku == item.sku ));
        cart.splice(cart[cart.findIndex((object : IItem) => object.sku == item.sku )],1);
        window.localStorage.setItem("vendor_cart",JSON.stringify(cart));
      }
    }
    
  }

  receiveOrder(item: OrderResponse){
    this.apiService.updateOrderStatus(item.orderId,"received").subscribe(
      data=>{
        window.location.reload();
      }
    )
  }

  cancelOrder(item: OrderResponse){
    this.apiService.updateOrderStatus(item.orderId,"cancelled").subscribe(
      data=>{
        window.location.reload();
      }
    )
  }

  currentOrder(order : OrderResponse){
    this.order.next(order);
  }

}

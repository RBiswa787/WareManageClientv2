import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderResponse } from 'src/shared/models/interfaces/IOrderResponse';
import { SupplyResponse } from 'src/shared/models/interfaces/ISupplyResponse';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-im-dashboard',
  templateUrl: './im-dashboard.component.html',
  styleUrls: ['./im-dashboard.component.scss']
})
export class ImDashboardComponent {
  
  suppliers  = new BehaviorSubject<string[]>([]);
  supplies = new BehaviorSubject<SupplyResponse[]>([]);
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
  selectedSupplier = '';
  constructor(private apiService: ApiService){}
  ngOnInit(){
    if(window.localStorage.getItem("role") != "inventory-manager"){
      window.location.href = "./";
    }
    console.log("before Init");
    const HOLDER = document.getElementById("supply-holder");
    this.apiService.uniqueSuppliers.subscribe(
      data => {
        this.suppliers.next(data);
      }
    );
    this.apiService.getAllSupplier();

    this.apiService.getAllOrder().subscribe(
      
      data => {
       this.orders.next(data);
      }
    );
  }

  populateModal(supplier: string){
    this.selectedSupplier = supplier;
    this.apiService.getAllSupplies(supplier).subscribe(
      data => {
        this.supplies.next(data);
      }
    );

  
  };

  confirmOrder() {
    console.log(this.selectedSupplier);
    this.apiService.placeOrder(this.selectedSupplier,JSON.parse(window.localStorage.getItem("cart")!),"supplier").subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        alert(error.message);
      }
    );
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
  updateCart(sku: string,qty: string, title: string ){
    let cart = JSON.parse(window.localStorage.getItem("cart")!);
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
      window.localStorage.setItem("cart",JSON.stringify(cart));
    }
    else{
      if(cart.findIndex((object : IItem) => object.sku == item.sku ) != -1){
        console.log(cart.findIndex((object : IItem) => object.sku == item.sku ));
        cart.splice(cart[cart.findIndex((object : IItem) => object.sku == item.sku )],1);
        window.localStorage.setItem("cart",JSON.stringify(cart));
      }
    }
    
  }
  acceptOrder(order: OrderResponse){
    this.apiService.updateOrderStatus(order.orderId,"confirmed").subscribe(
      response => {
        window.location.reload();
        
      }
    );
  }

  dispatchOrder(order: OrderResponse){
    this.apiService.updateOrderStatus(order.orderId,"shipped").subscribe(
      response => {
        window.location.reload();
        
      }
    );
  }

  rejectOrder(order: OrderResponse){
    this.apiService.updateOrderStatus(order.orderId,"rejected").subscribe(
      response => {
        window.location.reload();
        
      }
    );
  }

  report(){
    window.location.href = "./report";
  }
}

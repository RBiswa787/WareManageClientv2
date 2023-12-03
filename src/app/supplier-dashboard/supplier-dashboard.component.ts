import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ApiService } from 'src/shared/services/api.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OrderResponse } from 'src/shared/models/interfaces/IOrderResponse';

@Component({
  selector: 'app-supplier-dashboard',
  templateUrl: './supplier-dashboard.component.html',
  styleUrls: ['./supplier-dashboard.component.scss']
})
export class SupplierDashboardComponent implements OnInit {
  subscriptions : Subscription[] = [];
  supplyForm: FormGroup = this.fb.group({});
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
  supplierID = new BehaviorSubject<string>("");

  constructor(private fb: FormBuilder,private apiService : ApiService){

  }

  ngOnInit(){
    if(window.localStorage.getItem("role") != "supplier"){
      window.location.href = "./";
    }
    this.supplierID.next(window.localStorage.getItem("username") || "");
    this.supplyForm = this.fb.group({
      sku: "",
      title: ""
    });
    const HOLDER = document.getElementById("supply-holder");
    const supply_subscription = this.apiService.getAllSupplies(window.localStorage.getItem("username") || "").subscribe({
      next : (response) => {
        response.forEach(element => {
          console.log(element);
          const CARD = document.createElement("div");
          CARD.style.display = "flex";
          CARD.style.width = "100%";
          CARD.style.height = "auto";
          CARD.style.justifyContent = "space-between";
          
          const SKU = document.createElement("span");
          (SKU as HTMLElement).innerText = element.sku;
          (SKU as HTMLElement).style.fontFamily = "Ubuntu";
          (SKU as HTMLElement).style.fontSize = "1em";
           
          const TITLE = document.createElement("span");
          (TITLE as HTMLElement).innerText = element.title;
          (TITLE as HTMLElement).style.fontFamily = "Ubuntu";
          (TITLE as HTMLElement).style.fontSize = "1em";

          const DELETE = document.createElement("img");
          (DELETE as HTMLImageElement).src = "../../assets/delete.png";
          DELETE.style.width = "30px";
          DELETE.style.aspectRatio = "1/1";

          (DELETE as HTMLImageElement).addEventListener("click", () => {
            this.apiService.deleteSupply(element.sku).subscribe(
              () => {
                window.location.reload();
              }
            );
          });

          CARD.appendChild(SKU);
          CARD.appendChild(TITLE);
          CARD.appendChild(DELETE);
          (HOLDER as HTMLElement).appendChild(CARD);
        });
      }
    }
    );

    this.subscriptions.push(supply_subscription);


   const order_subscription =  this.apiService.getAllOrder().subscribe(
      data => {
        this.orders.next(data);
        }
    );

    this.subscriptions.push(order_subscription);
  }

  onSubmit(){
    const add_supply_subscription  = this.apiService.addSupply(this.supplyForm.value['sku'],this.supplyForm.value['title'],window.localStorage.getItem("username") || "").
    subscribe({
      next : () => {
        window.location.reload();
      }}
    );

    this.subscriptions.push(add_supply_subscription);
  }

  currentOrder(order : OrderResponse){
    this.order.next(order);
  }

  acceptOrder(order: OrderResponse){

   const update_order_subscription =  this.apiService.updateOrderStatus(order.orderId,"confirmed").subscribe({
      next : () => {
        window.location.reload();
        
      }
    }
    );

    this.subscriptions.push(update_order_subscription);
  }

  dispatchOrder(order: OrderResponse){
    const update_order_subscription = this.apiService.updateOrderStatus(order.orderId,"shipped").subscribe({
      next : () => {
        window.location.reload();
        
      }}
    );
    this.subscriptions.push(update_order_subscription);
  }

  rejectOrder(order: OrderResponse){
    const update_order_subscription =  this.apiService.updateOrderStatus(order.orderId,"rejected").subscribe({
      next : () => {
        window.location.reload();
        
      }
    }
    );
    this.subscriptions.push(update_order_subscription);
  }

  onDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

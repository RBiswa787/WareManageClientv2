import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ApiService } from 'src/shared/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { OrderResponse } from 'src/shared/models/interfaces/IOrderResponse';

@Component({
  selector: 'app-supplier-dashboard',
  templateUrl: './supplier-dashboard.component.html',
  styleUrls: ['./supplier-dashboard.component.scss']
})
export class SupplierDashboardComponent {
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
    this.supplierID.next(window.localStorage.getItem("username")!);
    this.supplyForm = this.fb.group({
      sku: "",
      title: ""
    });
    const HOLDER = document.getElementById("supply-holder");
    this.apiService.getAllSupplies(window.localStorage.getItem("username")!).subscribe(
      (response) => {
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

          const DELETE = document.createElement("button");
          DELETE.innerText = "Remove";
          DELETE.className  ="btn btn-danger";

          (DELETE as HTMLButtonElement).addEventListener("click", () => {
            this.apiService.deleteSupply(element.sku).subscribe(
              (response) => {
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
    );

    const ORDERS = document.getElementById("orders-holder");
    this.apiService.getAllOrder().subscribe(
      data => {
        this.orders.next(data);
        }
    );
  }

  onSubmit(){
    this.apiService.addSupply(this.supplyForm.value['sku'],this.supplyForm.value['title'],window.localStorage.getItem("username")!).
    subscribe(
      (response) => {
        window.location.reload();
      }
    );
  }

  currentOrder(order : OrderResponse){
    this.order.next(order);
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
}

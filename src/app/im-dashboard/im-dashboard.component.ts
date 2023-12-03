import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OrderResponse } from 'src/shared/models/interfaces/IOrderResponse';
import { SupplyResponse } from 'src/shared/models/interfaces/ISupplyResponse';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-im-dashboard',
  templateUrl: './im-dashboard.component.html',
  styleUrls: ['./im-dashboard.component.scss']
})
export class ImDashboardComponent implements OnInit {

  subscriptions : Subscription[] = [];
  suppliers = new BehaviorSubject<string[]>([]);
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
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    if (window.localStorage.getItem("role") != "inventory-manager") {
      window.location.href = "./";
    }
    console.log("before Init");
    const unique_supplier_subscription =  this.apiService.uniqueSuppliers.subscribe({
      next : (data) => {
        this.suppliers.next(data);
      }}
    );

    this.subscriptions.push(unique_supplier_subscription);

    this.apiService.getAllSupplier();

    const order_subscription = this.apiService.getAllOrder().subscribe({

      next : (data) => {
        this.orders.next(data);
      }
    }
    );

    this.subscriptions.push(order_subscription);

    this.apiService.storage.subscribe(
      value => {
        const progress = document.getElementById("progress");
    (progress as HTMLElement).style.background = `radial-gradient(closest-side, #09346a 79%, transparent 80% 100%),conic-gradient(hotpink ${value}%, pink 0)`;
    const progress_val = document.getElementById("progress_val");
    (progress_val as HTMLElement).innerHTML = String(value)+"%";
      }
    );
    
  }

  populateModal() {
    const supplier = window.localStorage.getItem('im_supplier')!;
    this.selectedSupplier = supplier;
    const supply_subscription = this.apiService.getAllSupplies(supplier).subscribe({
      next : (data) => {
        this.supplies.next(data);
      }
    }
    );

    this.subscriptions.push(supply_subscription);

  }

  confirmOrder() {
    console.log(this.selectedSupplier);
    const place_order_subscription = this.apiService.placeOrder(this.selectedSupplier, JSON.parse(window.localStorage.getItem("cart") || ""), "supplier").subscribe({
     next : () => {
        window.location.reload();
      },
     error : (error) => {
        alert(error.message);
        }  
      }
    );

    this.subscriptions.push(place_order_subscription);
  }

  receiveOrder(item: OrderResponse) {
    const receive_order_subscription = this.apiService.updateOrderStatus(item.orderId, "received").subscribe({
      next : () => {
        window.location.reload();
      }
    }
    );
    this.subscriptions.push(receive_order_subscription);
  }

  cancelOrder(item: OrderResponse) {
    const cancel_order_subscription = this.apiService.updateOrderStatus(item.orderId, "cancelled").subscribe({
      next : () => {
        window.location.reload();
      }
  });
    this.subscriptions.push(cancel_order_subscription);
  }

  currentOrder(order: OrderResponse) {
    this.order.next(order);
  }
  updateCart(sku: string, qty: string, title: string) {
    const cart = JSON.parse(window.localStorage.getItem("cart") || '');
    interface IItem {
      sku: string,
      qty: string,
      title: string
    }
    const item: IItem = {
      sku: sku,
      qty: qty,
      title: title
    };
    if (parseInt(qty) > 0) {
      if (cart.findIndex((object: IItem) => object.sku == item.sku) == -1)
        cart.push(item);
      else
        cart[cart.findIndex((object: IItem) => object.sku == item.sku)].qty = item.qty;
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
    else {
      if (cart.findIndex((object: IItem) => object.sku == item.sku) != -1) {
        console.log(cart.findIndex((object: IItem) => object.sku == item.sku));
        cart.splice(cart[cart.findIndex((object: IItem) => object.sku == item.sku)], 1);
        window.localStorage.setItem("cart", JSON.stringify(cart));
      }
    }

  }
  acceptOrder(order: OrderResponse) {
    const update_order_subscription =  this.apiService.updateOrderStatus(order.orderId, "confirmed").subscribe({
      next: () => {
        window.location.reload();
      },
      error: (er) => {
        console.error(er);
      }
    });
    this.subscriptions.push(update_order_subscription);
  }

  dispatchOrder(order: OrderResponse) {
    const update_order_subscription = this.apiService.updateOrderStatus(order.orderId, "shipped").subscribe({
      next : () => {
        window.location.reload();

      }
    }
    );

    this.subscriptions.push(update_order_subscription);
  }

  rejectOrder(order: OrderResponse) {
    const update_order_subscription = this.apiService.updateOrderStatus(order.orderId, "rejected").subscribe({
     next : () => {
        window.location.reload();

      }}
    );
    this.subscriptions.push(update_order_subscription);
  }

  report() {
    window.location.href = "./report";
  }

  onDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

import { Component,ViewChild, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CheckIn } from 'src/shared/models/interfaces/ICheckIn';
import { CheckOut,OrderDictionary, OrderItem } from 'src/shared/models/interfaces/ICheckOut';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})
export class StaffDashboardComponent {

  @ViewChild('checkOutModal', { static: false }) checkOutModal : HTMLElement | undefined = undefined;

  checkin_items = new BehaviorSubject<CheckIn[]>([]);
  checkout_items = new BehaviorSubject<OrderDictionary>({});
 
  constructor(private apiService: ApiService,private cdRef: ChangeDetectorRef){}

  ngOnInit(){
    if(window.localStorage.getItem("role") != "staff"){
      window.location.href = "./";
    }
    this.apiService.getAllCheckIn().subscribe(
      data => {
       this.checkin_items.next(data);
      }
    );
    this.apiService.getAllCheckOut().subscribe(
      data => {
       var projectedData: OrderDictionary = {};
       data.forEach(obj => {
          const {sku, qty, title, location, isCheckedOut} = obj;
         
          if (obj.orderId in projectedData) {
            projectedData[obj.orderId].push({sku, qty, title, location, isCheckedOut});
          } else {
            projectedData[obj.orderId] = [{sku, qty, title, location, isCheckedOut}];
          }
       });
       this.checkout_items.next(projectedData);
       window.localStorage.setItem("checkoutDict",JSON.stringify(projectedData));
      }
      
    );
    
  }

  generateQR(sku : string){
    window.location.href = "/test?query="+sku;
  }

  checkIn(sku: string, location: string,qty: number,title: string){
    window.localStorage.setItem("checkin_sku",sku);
    window.localStorage.setItem("checkin_loc",location);
    window.localStorage.setItem("checkin_qty",String(qty));
    window.localStorage.setItem("checkin_title",String(title));
    window.localStorage.setItem("mode","1");
    this.apiService.toggle.next(!this.apiService.toggle.value);
    window.location.href = "./checkin_sku";
  }


  checkOut(sku: string, location: string,qty: number,title: string,orderid : string){
    window.localStorage.setItem("checkout_sku",sku);
    window.localStorage.setItem("checkout_loc",location);
    window.localStorage.setItem("checkout_qty",String(qty));
    window.localStorage.setItem("checkout_title",String(title));
    window.localStorage.setItem("checkout_orderid",String(orderid));
    window.localStorage.setItem("mode","3");
    this.apiService.toggle.next(!this.apiService.toggle.value);
  }


  isReadyToShip(orderId: string): boolean {
    const orderItems = this.checkout_items.value[orderId];
    if (!orderItems) {
      return false;
    }
  
    for (const item of orderItems) {
      if (!item.isCheckedOut) {
        return false;
      }
    }
 
    return true;
  }

  shipOrder(orderid : string){
    window.localStorage.setItem("ship_orderid",orderid);
    window.localStorage.setItem("mode","4");
    this.apiService.toggle.next(!this.apiService.toggle.value);
  }
 
}

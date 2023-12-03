import { Component , OnInit} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { OrderResponse } from 'src/shared/models/interfaces/IOrderResponse';
import { ApiService } from 'src/shared/services/api.service';
Chart.register(...registerables);

@Component({
  selector: 'app-chart-compo',
  templateUrl: './chart-compo.component.html',
  styleUrls: ['./chart-compo.component.scss']
})
export class ChartCompoComponent implements OnInit{

  subscriptions : Subscription[] = []; 
  orders = new BehaviorSubject<OrderResponse[]>([]);
  purchaseData = new BehaviorSubject<{
      label: string,
      data: number[],
      backgroundColor: string[],
      borderColor: string[],
      borderWidth: number
  }>({
    label: 'Purchase Order Classification',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
  });
  salesData = new BehaviorSubject<{
    label: string,
    data: number[],
    backgroundColor: string[],
    borderColor: string[],
    borderWidth: number
}>({
  label: 'Sales Order Classification',
    data: [],
    backgroundColor: [],
    borderColor: [],
    borderWidth: 1
});

  constructor(private apiService: ApiService){}

  ngOnInit(){
    const order_subscription = this.apiService.getAllOrder().subscribe(
      data => {
        this.orders.next(data);
        this.preparePurchaseData(data.filter(obj => obj.partnerType == "supplier"));

      }
    );

    this.subscriptions.push(order_subscription);
   
    const myChart = new Chart("chartjs-vendor", {
      type: 'bar',
      data: {
        labels: ["Placed","Shipped","Received","Cancelled","Rejected"],
        datasets: [this.salesData.value]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  const purchase_subscription = this.purchaseData.subscribe(data => {
    myChart.data.datasets[0] = data;
    myChart.update();
    console.log(data);
  });

  this.subscriptions.push(purchase_subscription);


  }

  preparePurchaseData(data : OrderResponse[]){
    const shipped = data.reduce((count, order) => count + (order.orderStatus == "shipped" ? 1 : 0), 0);
    const cancelled = data.reduce((count, order) => count + (order.orderStatus == "cancelled" ? 1 : 0), 0);
    const rejected = data.reduce((count, order) => count + (order.orderStatus == "rejected" ? 1 : 0), 0);
    const placed = data.reduce((count, order) => count + (order.orderStatus == "placed" ? 1 : 0), 0);
    const received = data.reduce((count, order) => count + (order.orderStatus == "received" ? 1 : 0), 0);

    const payload = {
      label: 'Purchase Order Classification',
      data: [placed,shipped,received,cancelled,rejected],
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
      ],
      borderWidth: 1
  }
;

   this.purchaseData.next(payload);
   console.log(this.purchaseData.value);
   
  }

  onDestroy(){
    this,this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  
}

import { Component,Input } from '@angular/core';
import { BarData } from 'src/shared/models/interfaces/IBarData';
import { BehaviorSubject } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { OrderResponse } from 'src/shared/models/interfaces/IOrderResponse';
import { ApiService } from 'src/shared/services/api.service';
Chart.register(...registerables);

@Component({
  selector: 'app-chart-comp-vendor',
  templateUrl: './chart-comp-vendor.component.html',
  styleUrls: ['./chart-comp-vendor.component.scss']
})
export class ChartCompVendorComponent {
  orders = new BehaviorSubject<OrderResponse[]>([]);
  purchaseData = new BehaviorSubject<{
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
    this.apiService.getAllOrder().subscribe(
      data => {
        this.orders.next(data);
        this.preparePurchaseData(data.filter(obj => obj.partnerType == "vendor"));
      }
    );
    
    var myChart = new Chart("chartjs-dashboard-line", {
      type: 'bar',
      data: {
        labels: ["Placed","Shipped","Received","Cancelled","Rejected"],
        datasets: [this.purchaseData.value]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  this.purchaseData.subscribe(data => {
    myChart.data.datasets[0] = data;
    myChart.update();
    console.log(data);
  });

  }

  preparePurchaseData(data : OrderResponse[]){
    let shipped = data.reduce((count, order) => count + (order.orderStatus == "shipped" ? 1 : 0), 0);
    let cancelled = data.reduce((count, order) => count + (order.orderStatus == "cancelled" ? 1 : 0), 0);
    let rejected = data.reduce((count, order) => count + (order.orderStatus == "rejected" ? 1 : 0), 0);
    let placed = data.reduce((count, order) => count + (order.orderStatus == "placed" ? 1 : 0), 0);
    let received = data.reduce((count, order) => count + (order.orderStatus == "received" ? 1 : 0), 0);

    let payload = {
      label: 'Sales Order Classification',
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
   console.log(data);
   
  }
}

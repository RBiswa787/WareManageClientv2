import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart-staff',
  templateUrl: './chart-staff.component.html',
  styleUrls: ['./chart-staff.component.scss']
})
export class ChartStaffComponent {
  ngOnInit(){
    var myChart = new Chart("chartjs-staff", {
      type: 'bar',
      data: {
        labels: ['S101','S202','S303','S404','S505','S606'],
        datasets: [
          {
            label: 'CheckIns',
            data: [10,35,20,12,31,25],
          },
          {
            label: 'CheckOuts',
            data: [15,21,18,15,27,31],
          }
        ],
        
      },
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          }
        }
      },
    });
  }
}

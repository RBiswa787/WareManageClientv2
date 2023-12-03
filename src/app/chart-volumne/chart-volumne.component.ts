import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart-volumne',
  templateUrl: './chart-volumne.component.html',
  styleUrls: ['./chart-volumne.component.scss']
})
export class ChartVolumneComponent {
  ngOnInit(){
    var myChart = new Chart("chartjs-volume", {
      type: 'line',
      data: {
        labels: ['Aug','Sept','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Purchase Volume',
            data: [290,130,370,310,110],
          },
          {
            label: 'Sales Volume',
            data: [110,210,270,300,190],
          }
        ],
        
      },
      options: {
        indexAxis: 'x',
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        }
      },
    });
  }
}

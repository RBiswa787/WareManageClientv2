import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderResponse } from 'src/shared/models/interfaces/IOrderResponse';
import { ApiService } from 'src/shared/services/api.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {


  constructor(private apiService: ApiService){

  }

  ngOnInit(){
   
  }
    
  public convertToPDF()
{
    var data = document.getElementById('contentToConvert');
    html2canvas(data!).then(canvas => {
    var imgWidth = 208;
    var imgHeight = canvas.height * imgWidth / canvas.width;

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); 
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('Report.pdf'); 
});
}
  
}

import { Component } from '@angular/core';
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

 
    
  public convertToPDF()
{
    const data = document.getElementById('contentToConvert');
    html2canvas(data!).then(canvas => {
    const imgWidth = 208;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    const contentDataURL = canvas.toDataURL('image/png')
    const pdf = new jspdf('p', 'mm', 'a4'); 
    const position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('Report.pdf'); 
});
}
  
}

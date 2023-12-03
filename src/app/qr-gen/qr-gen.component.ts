import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-qr-gen',
  templateUrl: './qr-gen.component.html',
  styleUrls: ['./qr-gen.component.scss']
})
export class QrGenComponent implements OnInit{

  value = "hello"

  constructor(private route: ActivatedRoute){}

  ngOnInit(){
    this.route.queryParams
      .subscribe(params => {
        this.value = params['query'];
      });
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
    pdf.save('QR.pdf'); 
});
}
}

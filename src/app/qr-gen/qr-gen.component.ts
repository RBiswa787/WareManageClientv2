import { Component,Input, OnInit, ElementRef ,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-qr-gen',
  templateUrl: './qr-gen.component.html',
  styleUrls: ['./qr-gen.component.scss']
})
export class QrGenComponent {

  value : string = "hello"

  constructor(private route: ActivatedRoute){}

  ngOnInit(){
    this.route.queryParams
      .subscribe(params => {
        this.value = params['query'];
      });
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
    pdf.save('QR.pdf'); 
});
}
}

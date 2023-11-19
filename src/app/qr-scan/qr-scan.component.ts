import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { OrderDictionary } from 'src/shared/models/interfaces/ICheckOut';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.scss']
})
export class QrScanComponent {


  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo | undefined;


  hasDevices: boolean =  true;
  hasPermission: boolean = false;

  qrResultString: string= "";

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor(private apiService: ApiService,private route: ActivatedRoute) { }

  ngOnInit(){
    this.apiService.toggle.subscribe();
    const PROCEED = document.getElementById("proceed");
    (PROCEED as HTMLButtonElement).style.display = "none";
    const WRONG = document.getElementById("wrong");
    (WRONG as HTMLElement).style.display = "none";
    const TITLE = document.getElementById("title");
    (TITLE as HTMLElement).innerText = "";
    if(window.localStorage.getItem("mode") == "1" || window.localStorage.getItem("mode") == "3"){
      (TITLE as HTMLElement).innerText = "Scan SKU QR"
    }
    if(window.localStorage.getItem("mode") == "2"){
      (TITLE as HTMLElement).innerText = "Scan Location QR"
    }
    if(window.localStorage.getItem("mode") == "4"){
      (TITLE as HTMLElement).innerText = "Scan Order QR"
    }

    PROCEED?.addEventListener("click",()=>{
      if(window.localStorage.getItem("mode") == "1")
      {
        window.localStorage.setItem("mode","2");
        this.apiService.toggle.next(!this.apiService.toggle.value);
         window.location.href = "./checkin_loc";
      }
      if(window.localStorage.getItem("mode") == "2"){
        this.apiService.updateInventory(window.localStorage.getItem("checkin_loc")!,window.localStorage.getItem("checkin_sku")!,window.localStorage.getItem("checkin_qty")!,window.localStorage.getItem("checkin_title")!).subscribe(
          response => {
            this.apiService.deleteFromCheckIn(window.localStorage.getItem("checkin_loc")!).subscribe(
              resp => {
                window.location.href = "./staff-dashboard";
              }
            );
          }
        ); 
      }
      if(window.localStorage.getItem("mode") == "3"){
        this.apiService.checkOutItem(window.localStorage.getItem("checkout_sku")!,window.localStorage.getItem("checkout_orderid")!).subscribe(
          data => {
            this.apiService.updateInventoryAfterCheckout(window.localStorage.getItem("checkout_loc")!,window.localStorage.getItem("checkout_qty")!).subscribe(
              response => {
                window.location.reload();
              }
            );
            
          }
        );
      }
      if(window.localStorage.getItem("mode") == "4"){
        this.apiService.removeFromCheckout(window.localStorage.getItem("ship_orderid")!).subscribe(
          response => {
            this.apiService.updateOrderStatus(window.localStorage.getItem("ship_orderid")!,"shipped").subscribe(
              resp => {
                window.location.reload();
              }
            );
          }
          
        );
        
      }
    });
  }

  clearResult(): void {
    this.qrResultString = "";
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    const PROCEED = document.getElementById("proceed");
    const WRONG = document.getElementById("wrong");
    this.qrResultString = resultString;
    if(window.localStorage.getItem("mode") == "1"){
      if(this.qrResultString == window.localStorage.getItem("checkin_sku")){
        (WRONG as HTMLElement).style.display = "none";
        (PROCEED as HTMLButtonElement).style.display = "flex";
        
      }
      else{
        (WRONG as HTMLElement).style.display = "flex";
        (PROCEED as HTMLButtonElement).style.display = "none";
      }
    }
    if(window.localStorage.getItem("mode") == "2"){
      if(this.qrResultString == window.localStorage.getItem("checkin_loc")){
        (WRONG as HTMLElement).style.display = "none";
        (PROCEED as HTMLButtonElement).style.display = "flex";
        window.localStorage.setItem("mode","2");
      }
      else{
        (WRONG as HTMLElement).innerText = "WRONG LOCATION";
        (WRONG as HTMLElement).style.display = "flex";
        (PROCEED as HTMLButtonElement).style.display = "none";
      }
    }
    if(window.localStorage.getItem("mode") == "3"){
      if(this.qrResultString == window.localStorage.getItem("checkout_sku")){
        (WRONG as HTMLElement).style.display = "none";
        (PROCEED as HTMLButtonElement).style.display = "flex";
      }
      else{
        (WRONG as HTMLElement).style.display = "flex";
        (PROCEED as HTMLButtonElement).style.display = "none";
      }
    }
    if(window.localStorage.getItem("mode") == "4"){
      if(this.qrResultString == window.localStorage.getItem("ship_orderid")){
        (WRONG as HTMLElement).style.display = "none";
        (PROCEED as HTMLButtonElement).style.display = "flex";
      }
      else{
        (WRONG as HTMLElement).style.display = "flex";
        (PROCEED as HTMLButtonElement).style.display = "none";
      }
    }
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices!.find(x => x.deviceId === selected);
    this.currentDevice = device ;
  }


  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  updateScanString(){
    this.apiService.updateScanString(this.qrResultString);
  }

  
}

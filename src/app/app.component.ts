import { Component, OnInit } from '@angular/core'; 


import { ApiService } from 'src/shared/services/api.service';

@Component({ 
selector: 'app-root', 
templateUrl: './app.component.html', 
styleUrls: ['./app.component.scss'] 
}) 
export class AppComponent implements OnInit{ 
title = 'web-app'; 


constructor(private apiService : ApiService){

}

ngOnInit(){
    this.apiService.getInventoryLayout();
    this.apiService.getInventory();
    if(window.localStorage.getItem("cart") == null){
        window.localStorage.setItem("cart",JSON.stringify([]));
    }
    if(window.localStorage.getItem("vendor_cart") == null){
        window.localStorage.setItem("vendor_cart",JSON.stringify([]));
    }
    if(window.localStorage.getItem("checkoutDict") == null){
        window.localStorage.setItem("checkoutDict",JSON.stringify({}));
    }
    
  
}

}

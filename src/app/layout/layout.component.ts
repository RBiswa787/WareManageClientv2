import { Component } from '@angular/core';
import { Inventory, ReceivedInventory } from 'src/shared/models/interfaces/IInventory';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
    
  zone = 4;
  aisle = 2;
  rack = 2;
  shelf = 5;
  bin = 5;

  inventory : Inventory = {
    "LOC-A-1-1-1-1" : {
      "sku" : "sku",
      "qty": 0,
      "title" :"",
      "isOccupied": true
    }
  }

  constructor(private apiService : ApiService){

  }

  ngOnInit(){
    this.prepareLegend();
    this.apiService.layout.subscribe(
      data => {
        this.zone = data.zone;
        this.aisle = data.aisle;
        this.rack = data.rack;
        this.shelf = data.shelf;
        this.bin = data.bin;
        this.constructLayout();
        this.apiService.inventory.subscribe(
          inventory => {
            for(let i = 0;i < this.zone;i++){
              for(let j = 0; j < this.aisle; j++){
                for(let k = 0; k < this.rack; k++){
                  for(let l = 0; l < this.shelf; l++){
                   let filled = false;
                   for(let m = 0 ;m < this.bin; m++){
                    let location = "LOC-"+ String.fromCharCode(65 + i) + "-"+ String(j+1) + "-" + String(k+1) + "-" + String(l+1)+ "-" + String(m+1);
                    if(inventory[location].qty>0){
                      filled = true;
                    }
                   }
                   if(filled){
                    const SHELF = document.getElementById("LOC-"+ String.fromCharCode(65 + i) + "-"+ String(j+1) + "-" + String(k+1) + "-" + String(l+1));
                    (SHELF as HTMLElement).style.backgroundColor = "#fcb454";
                   }
                  }
                }
              }
            }
          }
        );
      }
    );

    
  }

  constructLayout(){
    const HOLDER = document.getElementById("holder");

    (HOLDER as HTMLElement).addEventListener("click", (event) => {
      if((event.target as HTMLInputElement).id.startsWith("LOC")){
        const popup = document.getElementById("popup");
        (popup as HTMLElement).innerHTML = "";
        var clickedElement = event.target;
        var clickedElementRect = (clickedElement as HTMLInputElement).getBoundingClientRect();
        (popup as HTMLElement).style.left = (clickedElementRect.left + 5) + "px";
        (popup as HTMLElement).style.top = (clickedElementRect.top - 100) + "px";
        (popup as HTMLElement).style.display = "flex";
        
        for(let m = 0; m < this.bin; m++){
          const BIN_DIV = document.createElement("div");
          BIN_DIV.style.display = "flex";
          BIN_DIV.style.width = "99%";
          BIN_DIV.style.aspectRatio = "1/1";
          BIN_DIV.style.border = "2px solid #fcb454";
          BIN_DIV.style.borderRadius = "5px";
          BIN_DIV.id = (event.target as HTMLInputElement).id + "-" + String(m+1);


          const item = this.apiService.getInventoryItem(BIN_DIV.id);
          if(item.isOccupied){
            BIN_DIV.style.backgroundColor = "#fcb454";
          }
          if(item.qty == 0){
            BIN_DIV.style.backgroundColor = "white";
          }
          if(item.qty > 0 && item.qty < 50){
            BIN_DIV.style.backgroundColor = "white";
            BIN_DIV.innerText = "!";
            BIN_DIV.style.fontWeight = "bold";
            BIN_DIV.style.justifyContent = "center";
            BIN_DIV.style.color = "red";
            BIN_DIV.style.borderColor = "red";
            
          }
          if(item.isOccupied && item.qty == 0){
            BIN_DIV.style.backgroundColor = "white";
            BIN_DIV.style.borderColor = "grey";
            BIN_DIV.innerText = "-";
            BIN_DIV.style.fontWeight = "bold";
            BIN_DIV.style.justifyContent = "center";
            BIN_DIV.style.color = "grey";
          }
          (BIN_DIV as HTMLElement).addEventListener("click", (e) => {
            const item_details = document.getElementById("item-details");
            (item_details as HTMLElement).innerHTML = "";
            var clickElement = event.target;
            var clickElementRect = (clickElement as HTMLInputElement).getBoundingClientRect();
            (item_details as HTMLElement).style.left = (clickElementRect.left + 70) + "px";
            (item_details as HTMLElement).style.top = (clickElementRect.top - 100) + "px";
            (item_details as HTMLElement).style.display = "flex";

            const LOC_HOLDER = document.createElement("div");
            const LOC_HEADER = document.createElement("span");
            LOC_HEADER.style.fontWeight = "500";
            LOC_HEADER.innerText = "Location: ";
            const LOC_SPAN = document.createElement("span");
            LOC_SPAN.innerText = BIN_DIV.id;

            LOC_HOLDER.appendChild(LOC_HEADER);
            LOC_HOLDER.appendChild(LOC_SPAN);

            item_details?.appendChild(LOC_HOLDER);

            const SKU_HOLDER = document.createElement("div");
            const SKU_HEADER = document.createElement("span");
            SKU_HEADER.style.fontWeight = "500";
            SKU_HEADER.innerText = "SKU: ";
            const SKU_SPAN = document.createElement("span");
            SKU_SPAN.innerText = item.sku;

            SKU_HOLDER.appendChild(SKU_HEADER);
            SKU_HOLDER.appendChild(SKU_SPAN);

            item_details?.appendChild(SKU_HOLDER);

            const TITLE_HOLDER = document.createElement("div");
            const TITLE_HEADER = document.createElement("span");
            TITLE_HEADER.style.fontWeight = "500";
            TITLE_HEADER.innerText = "Title: ";
            const TITLE_SPAN = document.createElement("span");
            TITLE_SPAN.innerText = item.title;

            TITLE_HOLDER.appendChild(TITLE_HEADER);
            TITLE_HOLDER.appendChild(TITLE_SPAN);

            item_details?.appendChild(TITLE_HOLDER);

            const QTY_HOLDER = document.createElement("div");
            const QTY_HEADER = document.createElement("span");
            QTY_HEADER.style.fontWeight = "500";
            QTY_HEADER.innerText = "Qty: ";
            const QTY_SPAN = document.createElement("span");
            QTY_SPAN.innerText = String(item.qty);

            QTY_HOLDER.appendChild(QTY_HEADER);
            QTY_HOLDER.appendChild(QTY_SPAN);

            item_details?.appendChild(QTY_HOLDER);
          });
          (popup as HTMLElement).appendChild(BIN_DIV);
        }
        
        
      }
      else{
        const popup = document.getElementById("popup");
        (popup as HTMLElement).style.display = "none"; 
        const item = document.getElementById("item-details");
        (item as HTMLElement).style.display = "none"; 
      }
    });
    (HOLDER as HTMLElement).innerHTML = "";
    for(let i = 0; i < this.zone; i++){
      const ZONE_DIV = document.createElement("div");
      ZONE_DIV.style.display = "flex";
      ZONE_DIV.style.width = 0.95*(100/parseInt(String(this.zone/2))) + "%";
      ZONE_DIV.style.height = 0.90*(100/parseInt(String(this.zone/2))) + "%";
      ZONE_DIV.style.border = "1px solid grey";
      ZONE_DIV.style.flexDirection = "column";
      ZONE_DIV.style.padding = "1%";
      ZONE_DIV.style.gap = "1em";
      ZONE_DIV.style.borderRadius = "5px";
      ///////////////
      for(let j = 0; j < this.aisle; j++){
      const AISLE_DIV = document.createElement("div");
      AISLE_DIV.style.display = "flex";
      AISLE_DIV.style.width = "98%";
      AISLE_DIV.style.height = 0.90*(100/parseInt(String(this.aisle))) + "%";
      // AISLE_DIV.style.border = "1px solid green";
      AISLE_DIV.style.padding = "1%";
      AISLE_DIV.style.justifyContent = "space-around";
      AISLE_DIV.style.flexDirection = "column";


      for(let k = 0; k < this.rack; k++){
        const RACK_DIV = document.createElement("div");
        RACK_DIV.style.display = "flex";
      RACK_DIV.style.width = "98%";
      RACK_DIV.style.height = 0.90*(100/parseInt(String(this.rack))) + "%";
      // RACK_DIV.style.border = "1px solid purple";

      RACK_DIV.style.justifyContent = "center";
      RACK_DIV.style.gap = "2em";


      for(let l = 0; l < this.shelf; l++){
        const SHELF_DIV = document.createElement("div");
        SHELF_DIV.style.display = "flex";
        SHELF_DIV.style.height = "95%";
        SHELF_DIV.style.aspectRatio = "1/1";
        SHELF_DIV.style.border = "2px solid #fcb454";
        // SHELF_DIV.style.backgroundColor = "#ffe8ca";
        SHELF_DIV.style.borderRadius = "5px";
        
        SHELF_DIV.id = "LOC-"+ String.fromCharCode(65 + i) + "-"+ String(j+1) + "-" + String(k+1) + "-" + String(l+1);

        RACK_DIV.appendChild(SHELF_DIV);
      }

      AISLE_DIV.appendChild(RACK_DIV);
      }

      ZONE_DIV.appendChild(AISLE_DIV);
      }
      ////////////////
      HOLDER?.appendChild(ZONE_DIV);
      console.log("hello");
    }
  }

  prepareLegend(){
    const LEGEND = document.getElementById("legend");
    const EMPTY = document.createElement("div");
    EMPTY.style.display = "flex";
    EMPTY.style.height = "60%";
    EMPTY.style.minHeight = "25px";
    EMPTY.style.aspectRatio = "1/1";
    EMPTY.style.borderRadius = "5px";
    EMPTY.style.border = "2px solid #fcb454";

    const EMPTY_LABEL = document.createElement("span");
    EMPTY_LABEL.innerText = "Not Assigned";
    EMPTY_LABEL.style.fontFamily = "Ubuntu";
    EMPTY_LABEL.style.fontSize = "1em";
  

    const FILLED = document.createElement("div");
    FILLED.style.display = "flex";
    FILLED.style.height = "60%";
    FILLED.style.minHeight = "25px";
    FILLED.style.aspectRatio = "1/1";
    FILLED.style.borderRadius = "5px";
    FILLED.style.border = "2px solid #fcb454";
    FILLED.style.backgroundColor = "#fcb454";

    const FILLED_LABEL = document.createElement("span");
    FILLED_LABEL.innerText = "Assigned";
    FILLED_LABEL.style.fontFamily = "Ubuntu";
    FILLED_LABEL.style.fontSize = "1em";

    const LOW_INV = document.createElement("div");
    LOW_INV.style.display = "flex";
    LOW_INV.style.height = "60%";
    LOW_INV.style.minHeight = "25px";
    LOW_INV.style.aspectRatio = "1/1";
    LOW_INV.style.borderRadius = "5px";
    LOW_INV.style.border = "2px solid red";
    LOW_INV.style.color = "red";
    LOW_INV.style.justifyContent = "center";
    LOW_INV.style.alignItems = "center";
    LOW_INV.style.fontWeight = "bold";
    LOW_INV.innerText = "!";

    const LOW_INV_LABEL = document.createElement("span");
    LOW_INV_LABEL.innerText = "Low Inventory";
    LOW_INV_LABEL.style.fontFamily = "Ubuntu";
    LOW_INV_LABEL.style.fontSize = "1em";

    const BOOKED_INV = document.createElement("div");
    BOOKED_INV.style.display = "flex";
    BOOKED_INV.style.height = "60%";
    BOOKED_INV.style.minHeight = "25px";
    BOOKED_INV.style.aspectRatio = "1/1";
    BOOKED_INV.style.borderRadius = "5px";
    BOOKED_INV.style.border = "2px solid grey";
    BOOKED_INV.style.color = "grey";
    BOOKED_INV.style.justifyContent = "center";
    BOOKED_INV.style.fontWeight = "bold";
    BOOKED_INV.innerText = "-";

    const BOOKED_INV_LABEL = document.createElement("span");
    BOOKED_INV_LABEL.innerText = "CheckIn Assigned";
    BOOKED_INV_LABEL.style.fontFamily = "Ubuntu";
    BOOKED_INV_LABEL.style.fontSize = "1em";

    (LEGEND as HTMLElement).appendChild(EMPTY);
    (LEGEND as HTMLElement).appendChild(EMPTY_LABEL);
    (LEGEND as HTMLElement).appendChild(FILLED);
    (LEGEND as HTMLElement).appendChild(FILLED_LABEL);
    (LEGEND as HTMLElement).appendChild(LOW_INV);
    (LEGEND as HTMLElement).appendChild(LOW_INV_LABEL);
    (LEGEND as HTMLElement).appendChild(BOOKED_INV);
    (LEGEND as HTMLElement).appendChild(BOOKED_INV_LABEL);
   
  }
}

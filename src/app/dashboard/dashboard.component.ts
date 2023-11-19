import { Component } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
   constructor(private apiService: ApiService){}

   ngOnInit(){
    if(window.localStorage.getItem("role") != "warehouse_manager"){
      window.location.href = "./";
    }
    const PENDING = document.getElementById("pending");
    this.apiService.getUnverified().subscribe(
      (response) => {
        console.log(response);
        response.forEach(item => {
          const CARD = document.createElement("div");
          CARD.style.display = "flex";
          CARD.style.width = "80%";
          CARD.style.height = "auto";
          CARD.style.padding = "1%";
          CARD.style.marginLeft = "5%";
          CARD.style.justifyContent = "space-between";
          CARD.style.alignItems = "center";

          const USERNAME = document.createElement("span");
          USERNAME.innerText = item;
          USERNAME.style.fontFamily = "Ubuntu";
          USERNAME.style.fontSize = "1.1em";

          const ONBOARD = document.createElement("button");
          ONBOARD.innerText = "Onboard";
          ONBOARD.style.display = "flex";
          ONBOARD.style.padding = "3%";
          ONBOARD.style.backgroundColor = "#fcb454";
          ONBOARD.style.color = "white";
          ONBOARD.style.fontFamily = "Ubuntu";
          ONBOARD.style.fontWeight = "bold";
          ONBOARD.style.border = "none";
          ONBOARD.addEventListener("click",() => {
            this.onboard(item);
          });
        

          CARD.appendChild(USERNAME);
          CARD.appendChild(ONBOARD);
       


          (PENDING as HTMLElement).appendChild(CARD);
        });
      }
    );
   }

   onboard(username:string){
    this.apiService.onboard(username).subscribe(
      (response) => {
        window.location.reload();
      }
    );
   }
}

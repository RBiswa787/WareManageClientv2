import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  logout(){
    window.localStorage.setItem("token","");
    window.location.href = "";
  }

  isLoggedIn(){
  if(window.localStorage.getItem("token") != ""){
      return true;
    }
    else{
      return false;
    }
  }
}

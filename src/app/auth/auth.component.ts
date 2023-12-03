import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  loginForm: FormGroup = this.fb.group({});
  subscriptions : Subscription[] = [];

  constructor(private fb: FormBuilder,private apiService : ApiService){

  }

  ngOnInit(){
    this.loginForm = this.fb.group({
      username: "",
      password: ""
    });
  }

  onSubmit(){
    const signIn_subscription = this.apiService.signIn(this.loginForm.value['username'],this.loginForm.value['password']).subscribe({
      next: (response) =>{
        if(response.verified){
        window.localStorage.setItem("token",response.token);
        window.localStorage.setItem("role",response.role);
        window.localStorage.setItem("username",response.username);
        //alert("Authentication Successful!");
        if(response.role == "warehouse_manager")
        window.location.href = "./dashboard";
        else if(response.role =="inventory-manager")
        window.location.href = "./im-dashboard";
        else if(response.role == "supplier")
        window.location.href = "./supplier-dashboard";
        else if(response.role == "staff")
        window.location.href = "./staff-dashboard";
        else if(response.role == 'vendor')
        window.location.href = "./vendor-dashboard";
        
        }
        else{
          alert("Account not yet verified.");
        }
      },
      error: (error) =>{
        if(error.status === 400){

          alert("Username or password incorrect.");
        }
        else{
          alert("Something went wrong!");
        }
      }
    }
    );

    this.subscriptions.push(signIn_subscription);
  }

  OnDestroy(){
    this.subscriptions.forEach(sub => {sub.unsubscribe()});
  }
}

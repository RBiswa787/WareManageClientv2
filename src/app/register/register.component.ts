import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ApiService } from 'src/shared/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  subscriptions : Subscription[] = [];
  registerForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,private apiService : ApiService){

  }

  ngOnInit(){
    this.registerForm = this.fb.group({
      username: "",
      password: "",
      role: ""
    });
  }

  
  onSubmit(){
    console.log(this.registerForm.getRawValue());
    const register_subscription = this.apiService.register(this.registerForm.value['username'],this.registerForm.value['password'],this.registerForm.value['role']).subscribe({
      next : () => {
        alert("Registration Done. Verification Pending!");
        window.location.href = "./";
      },
      error: (error) => {
        alert(error.message);
      }
    }
    );

    this.subscriptions.push(register_subscription);
  }

  onDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

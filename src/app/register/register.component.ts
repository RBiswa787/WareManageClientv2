import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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
    this.apiService.register(this.registerForm.value['username'],this.registerForm.value['password'],this.registerForm.value['role']).subscribe(
      (response) => {
        alert("Registration Done. Verification Pending!");
        window.location.href = "./";
      },
      (error) => {
        alert(error.message);
      }
    );
  }
}

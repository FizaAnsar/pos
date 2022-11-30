import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { ApiService } from 'src/app/services/api.service';
import validateForm from '../validator/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private user:ApiService,private router:Router) { }
  emailRegex=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  passwordRegex=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/

  ngOnInit(): void {
    this.user.reloadUser();
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    }
     
    )
  }
  signIn(data:Login):void{
    if(this.loginForm.valid){
      console.log(data);
      // this.router.navigate(['/point-of-sale',{
      //   outlets:{'pos':['dashboard']}  
      // }])

      this.user.userSignIn(data);
      this.loginForm.reset();

    }else{
      validateForm.validateAllFormFields(this.loginForm);
    }

    
  }
   // Hide And Show Password
type:string ="password";
isText:boolean = false;
eyeIcon :string = "fa-eye-slash"
hideshow(){
  this.isText = !this.isText;
  this.isText ? this.eyeIcon ="fa-eye":this.eyeIcon ="fa-eye-slash";
  this.isText ? this.type ="text":this.type ="password"
}


}

import { Component, OnInit } from '@angular/core';
import { Router}from '@angular/router'
import { Form, FormControl, Validator, FormGroup} from '@angular/forms'
import { SharedService } from 'src/app/shared.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName!:string;
  lastName!:string;
  email!:string;
  password!:string;
  gender!:string;
  mobileNo!:number;
  confirmpassword!:string;
  isAdmin:string="false";
  isRegisterSuccess!:boolean;
  
  constructor(private service:SharedService,private router:Router) { }

  ngOnInit(): void {
  }
  onRegister(){
    if(this.gender==undefined){
      alert("Please select a gender!");
    }
    else{
   this.service.registration(this.email,this.password,this.firstName,this.lastName,this.gender,this.mobileNo,this.isAdmin).subscribe(data=>{
       this.isRegisterSuccess=data;
       if(this.isRegisterSuccess==true)
       {
         console.log(this.isRegisterSuccess);
         this.router.navigate(["/login"]);

       }
    })
  }
}

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  email!:string;
  password!:string;
  user:any;
  error:string="";
    constructor(private service : SharedService,private router:Router) { }
  
    ngOnInit(): void {
      
    
    }
   onLogin(){
    this.service.adminLogin(this.email,this.password).subscribe(data=>{
      this.user=data;
     if(this.user!=null || this.user!=undefined ){
      //  SharedService.isUserLogin=true;
       this.router.navigate(["/home"]);
      
     }
     else{
       
       this.error="wrong email id/ password ! please put correct one ";
       
     }
  
    });
   
  }

}

import { Component } from '@angular/core';


import { Router } from '@angular/router';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-ticket-booking-app';
userName!:string;


  constructor(private service:SharedService,private router:Router){}
  ngOnInit():void{

   
    this.isUserAdmin();
 

  }
 
  public logOut(){
    SharedService.isUserLogin=false;
    this.service.userName="";
    this.service.userId="";
    this.service.isAdmin="false";
    localStorage.setItem("userName",this.service.userId);
    localStorage.setItem("name",this.service.userName);
    localStorage.setItem("isAdmin",this.service.isAdmin);
   // localStorage.setItem("userName",JSON.stringify(this.userName));
    this.router.navigate(['/login']);

    
  }
 public isUserLogin()
  {
   
    this.userName=this.service.userName;
    
    if(this.service.userId==null || this.service.userId==undefined || this.service.userId==""){
      
      return false;
    }else{
      return true;
    }
  }
 public isUserAdmin(){
   if(this.service.isAdmin!="true"){
    
     return false;
   }
   else{
    
     return true;
     
   }
 }
  }

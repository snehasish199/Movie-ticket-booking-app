import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
allMovies:any=[];
photoUrl!:string;
 temp:any=[];
  constructor(private service:SharedService,private router:Router) { }

  ngOnInit(): void {


    // if(this.service.userId==null||this.service.userId==""|| this.service.userId==undefined){
    //   this.router.navigate(["/login"]);
    // }
    // else{
      this.isUserAdmin()
      this.getAllMovie();
      this.photoUrl=this.service.photoUrl+"/";
    // }
    
  }
  getAllMovie(){
    this.service.getAllMovieList().subscribe(data=>{
      this.temp=data;
      // this.allMovies=data;
      for (let show of this.temp) {
        if (!this.performOperation(show.date)) {
          this.allMovies.push(show);
        }
      }
     
    });
  }
  DeleteMovie(id: number) {
   var isDeleted:Boolean=false;
    if (confirm("Are you sure to remove this movie?")) {
      this.service.deleteMovie(id).subscribe(data => {
       this.ngOnInit();
      });
      
    }}
    public isUserAdmin(){
      if(this.service.isAdmin!="true"){
       
        return false;
      }
      else{
       
        return true;
        
      }
    }

    performOperation(date: any) {
      let currentDate = new Date();
      let givenDate = new Date(date);
  
      if (currentDate > givenDate) {
  
        return true;
      }
      else {
  
        return false;
      }
    }
 

  


  //-----------------------------------------star rating-----------------------------------
  
  title = 'Star Rating';  
starList: boolean[] = [true,true,true,true,true];       // create a list which contains status of 5 stars
rating!:number;  
//Create a function which receives the value counting of stars click, 
//and according to that value we do change the value of that star in list.
setStar(data:any){
      this.rating=data; 
                                    
      for(var i=0;i<=4;i++){  
        if(i<data){  
          this.starList[i]=false;  
        }  
        else{  
          this.starList[i]=true;  
        }  
     }  
 }  


}

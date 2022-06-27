import { formatDate, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


//import { Component, OnInit } from '@angular/core';

import { Router}from '@angular/router'
import { Form,FormControl,Validator,FormGroup} from '@angular/forms'
//import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {




  movieDescription!:string;
  movieName!:string;
  photoFileName:string="blank_image.png";
  photoFilePath!:string;
 
  
  fare!:number;
  showDate:any=[];
  numberOfShow=1;
  showFare:any=[];
  showTime:any=[]
 
  
   //showdetails:{date:new Date().toISOString().split('T')[0];time:any ,fare:number}[]=[];

   movieReleaseDate!:string;
   DateOfJoining!: string;
   isShowAdded!:boolean;

   private id!:number;

  numbers: number[]=[];
  constructor(private service:SharedService, private router:Router) { 
   
    this.numbers = Array(this.numberOfShow).fill(2);
    this.showDate = Array(this.numberOfShow).fill(new Date().toISOString().split('T')[0]);
   this.showTime = Array(this.numberOfShow).fill(new Date().toISOString().split('T')[1]);
    this.showFare = Array(this.numberOfShow).fill(100);
    // this.showdetails[this.numberOfShow].date=new Date().toISOString().split('T')[0];
    // this.showdetails[this.numberOfShow].time=new Date().toISOString().split('T')[1];
    // this.showdetails[this.numberOfShow].fare=100;
    
    
   
  //  this.showdetails= Array(this.numberOfShow).fill({new Date().toISOString().split('T')[0],  new Date().toISOString().split('T')[1],100});
   
    
    
  }

  ngOnInit(): void {
if(this.service.userId==null||this.service.userId==""||this.service.userId==undefined){
  this.router.navigate(["/login"]);
}
  else if(this.service.isAdmin==null||this.service.isAdmin==""|| this.service.isAdmin=="false"){
    alert("acess denied !");
      this.router.navigate(["/home"]);
    }
    else{
    this.photoFilePath=this.service.photoUrl+"/" + this.photoFileName;
   // this.date = new Date().toISOString().split('T')[0];
    this.movieReleaseDate = new Date().toISOString().split('T')[0];


   


   // this.time=new Date().toISOString().split('T')[1];
    }
   
  }
  addAShow(){
   
   this.numberOfShow=this.numberOfShow+1;
   this.numbers = Array(this.numberOfShow).fill(2);
  //  this.showdetails[this.numberOfShow].date=new Date().toISOString().split('T')[0];
  //   this.showdetails[this.numberOfShow].time=new Date().toISOString().split('T')[1];
  //   this.showdetails[this.numberOfShow].fare=100;
  //  this.showDate = Array(this.numberOfShow).fill(new Date().toISOString().split('T')[0]);
  // this.showTime = Array(this.numberOfShow).fill(new Date().toISOString().split('T')[1]);
  //  this.showFare = Array(this.numberOfShow).fill(100);
   
   
  }
  
  parseDate(dateString: string): Date {
 
      let  date= Date.parse(dateString);
      
      return new Date(date);
   
}

  addMovie(){
    //console.log(this.movieReleaseDate);
    let releaseDate:Date=this.parseDate(this.movieReleaseDate);
    
    const movie={
      movie_name:this.movieName,
      movie_description:this.movieDescription,
      
      movie_image_address:this.photoFileName,
      movie_release_date:this.movieReleaseDate
    


    }
   
    this.service.addMovie(movie).subscribe(data=>{
      this.id=data;
      
      const addshow=[];
      for(let i=0;i<this.showFare.length;i++)
      {
  
        let show={
          movie_id:this.id,
          date: this.showDate[i],
          show_time:this.showTime[i],
          ticket_price:this.showFare[i]
  
        }
        addshow.push(show);
  
      }
     
      this.service.addShow(addshow).subscribe(data=>{
        this.isShowAdded=data;
       
             });
      this.router.navigate(["/home"]);
    });
   
   
   
    
  }
  uploadPhoto(event: any){
    var file=<File>event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);
    
    console.log(formData);
    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      
      this.photoFileName=data.toString();
      this.photoFilePath=this.service.photoUrl+"/"+this.photoFileName;

    });
  }

}

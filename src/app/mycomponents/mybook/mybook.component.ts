import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-mybook',
  templateUrl: './mybook.component.html',
  styleUrls: ['./mybook.component.css']
})
export class MybookComponent implements OnInit {

  userId!: string;
  allBooking: any[] = [];
  photoFilePath!: string;

  noOfBook!: number;

  constructor(private service: SharedService, private router: Router) { }

  ngOnInit(): void {
    if (this.service.userId == null || this.service.userId == "") {
      this.router.navigate(["/login"]);
    }
    else {
      this.userId = this.service.userId;

      this.getAllBookingDetails(this.userId);




    }
  }

  // getmovie(id:number){
  //   this.service.getMovieById(id).subscribe(data=>{
  //     this.imageAddress=data.movie_image_address;
  //     this.photoFilePath=this.service.photoUrl+"/"+this.imageAddress;
  //     this.movieName=data.movie_name;
  //   })

  // }
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

  getAllBookingDetails(userId: string) {
    this.service.getBookingDetailsById(userId).subscribe(data => {

      this.allBooking = data;

      this.noOfBook = this.allBooking.length;
      //console.log(this.noOfBook);
      for (let book of this.allBooking) {
        this.service.getMovieById(book.movie_id).subscribe(data => {
          // this.imageAddress.push(this.service.photoUrl+"/"+data.movie_image_address);
          // this.movieName.push(data.movie_name);
          book.movie_image_address = this.service.photoUrl + "/" + data.movie_image_address;
          book.movieName = data.movie_name;
        })
      }
      for (let i = 0; i < this.allBooking.length; i++) {
        let arr: boolean[] = [];
        for (let j = 0; j < 5; j++) {
          if (parseInt(this.allBooking[i].rating) != NaN)
            if (parseInt(this.allBooking[i].rating) > j) {
              arr[j] = false;
            }
            else {
              arr[j] = true;
            }
        }
        this.allBooking[i].myList = arr;

      }



      //console.log(this.allBooking);
    });
  }

  addRating(index: number) {
    this.service.addRating(this.allBooking[index]).subscribe(data => {
      // console.log(data);
      this.ngOnInit();
    })

  }

  cancelBooking(id: number, index: number) {
    if (confirm("Are you sure to cancel booking ??")) {
      this.service.cancelBooking(id).subscribe(data => {
        this.ngOnInit();

      });

      let movieId = this.allBooking[index].movie_id;
      let showDate = this.allBooking[index].date.split("T")[0];
      let showTime = this.allBooking[index].show_time;
      let noOfTicket = this.allBooking[index].number_of_ticket;
      this.service.addSeat(movieId, showDate, showTime, noOfTicket).subscribe(data => {
        if (data) {
          alert("successfully cancel booking !!");
        }
      });
    }
  }



  //----------------------------------- star --------------------

  rating!: number;

  setStarTable(index: any, data: any) {
    this.allBooking[index].rating = data + 1;
    //var tableList = this.allBooking.find(function (obj: any) { return obj.id === record.id });  
    for (var i = 0; i <= 4; i++) {
      if (i <= data) {
        this.allBooking[index].myList[i] = false;
      }
      else {
        this.allBooking[index].myList[i] = true;
      }
    }
  }

}

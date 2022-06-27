import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  movie_id!: number;
  movie: any;
  showList: any;
  photoFilePath!: string;
  selectedShowTime = "00:00";
  numberOfTicketBook!: number;
  seatCapacity!: number;
  selectShowIndex!: number;

  futureShowList: any = [];



  constructor(private service: SharedService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.service.userId == null || this.service.userId == "") {
      this.router.navigate(["/login"]);
    }
    else {
      this.movie_id = parseInt(this.route.snapshot.paramMap.get("id") || '{}');
      if (Number.isNaN(this.movie_id)) {
        this.router.navigate(["/register"]);
      }
      //console.log(this.movie_id);

      this.getMovie(this.movie_id);
      this.getAllShow(this.movie_id);


    }
  }
  getMovie(id: any) {
    this.service.getMovieById(id).subscribe(data => {
      this.movie = data;

      this.photoFilePath = this.service.photoUrl + "/" + this.movie.movie_image_address;
    });
  }
  // getShow(id:number){
  //   this.service.getShowById(id).subscribe(data=>{

  //     console.log(data);
  //   });
  // }

  getAllShow(id: number) {
    this.service.getShowById(id).subscribe(data => {
      this.showList = data;
      for (let show of this.showList) {
        if (!this.performOperation(show.date)) {
          this.futureShowList.push(show);
        }
      }



    })
  }

  bookTicket() {
    //let showDate:Date= new Date(new Date(this.selectedShowTime.split(" at ")[0]));
    if (this.selectShowIndex == undefined) {
      alert("please select a show time");
    }
    else
      if (confirm("Are you sure ??")) {

        const bookObj = {
          movie_id: this.movie.movie_id,
          rating: 0,
          review: "",
          show_time: this.showList[this.selectShowIndex].show_time,
          date: this.showList[this.selectShowIndex].date,
          ticket_price: this.showList[this.selectShowIndex].ticket_price,
          user_id: this.service.userId,
          number_of_ticket: this.numberOfTicketBook

        }
        this.service.bookTicket(bookObj).subscribe(data => {
          console.log(data);
          if (data != null) {

            this.router.navigate(["/mybooking"]);
          }
        });
        this.service.removeSeat(this.showList[this.selectShowIndex].id, this.numberOfTicketBook).subscribe(data => {
          if (data) {
            alert("successfully booked");
          }
        })

      }


  }
  showIndex(i: number) {
    this.selectShowIndex = parseInt(i.toString());
    this.seatCapacity = this.showList[this.selectShowIndex].seat_capacity;
    //this.getShow(this.movie_id);
    //console.log(i);
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


}

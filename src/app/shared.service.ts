import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  static isUserLogin: boolean;
  isAdmin!: string;
  userName!: string;
  userId!: string;
  localItem: any;
  localItem1: any;
  localItem2: any;
  readonly apiUrl = "https://localhost:44318/api";
  readonly photoUrl = "https://localhost:44318/Photos";




  constructor(private http: HttpClient) {
    this.localItem = localStorage.getItem("userName") || "{}";
    this.localItem1 = localStorage.getItem("name") || "{}";
    this.localItem2 = localStorage.getItem("isAdmin") || "{}";
    if (localStorage.getItem("userName") == null || localStorage.getItem("userName") == "") {
      this.userName = "";
      this.userId = "";
      this.isAdmin = "false";
    } else {
      this.userId = this.localItem;
      this.userName = this.localItem1;
      this.isAdmin = this.localItem2
    }
  }

  userActive(email: string) {

    localStorage.setItem("userName", email);
    localStorage.setItem("name", this.userName);
    // localStorage.setItem("isAdmin","true");
  }
  userActiveAdmin(email: string) {

    localStorage.setItem("userName", email);
    localStorage.setItem("name", this.userName);
    localStorage.setItem("isAdmin", this.isAdmin);
  }




  login(email: string, password: string): Observable<any[]> {
    this.http.get<any>(this.apiUrl + "/authentication/?email=" + email + "&password=" + password).subscribe(data => {
      this.userName = data;
      if (data != null) {
        this.userActive(email);
        this.userId = email;
      }
    });


    return this.http.get<any>(this.apiUrl + "/authentication/?email=" + email + "&password=" + password);
  }



  adminLogin(email: string, password: string): Observable<any[]> {
    this.http.get<any>(this.apiUrl + "/authentication/admin/?email=" + email + "&password=" + password + "&isAdmin=true").subscribe(data => {
      this.userName = data;
      if (data != null) {
       
        this.userId = email;
        this.isAdmin = "true";
        this.userActiveAdmin(email);
      }
    });


    return this.http.get<any>(this.apiUrl + "/authentication/admin/?email=" + email + "&password=" + password + "&isAdmin=true");
  }



  registration(email: string, password: string, firstName: string, lastName: string, gender: string, contact: number, isAdmin: string): Observable<any> {
    //Post( string email,string firstName, string lastName, string gender, decimal contact, string isAdmin,string password)

    return this.http.post<any>(this.apiUrl + "/authentication/?email=" + email + "&firstName=" + firstName + "&lastName=" + lastName + "&gender=" + gender + "&contact=" + contact + "&isAdmin=" + isAdmin + "&password=" + password, Object);
    //return this.http.get<any>(this.apiUrl+"/authentication/?email="+email+"&password="+password);
  }
  getAllMovieList(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + "/MovieDetails");


  }
  getMovieById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/MovieDetails/?id=" + id);

  }
  getBookingDetailsById(id: string): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + "/UserTicketBookingDetails/?id=" + id);

  }

  addMovie(val: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(val);
    //console.log(body);
    return this.http.post<any>(this.apiUrl + "/MovieDetails", body, { 'headers': headers });
  }
  deleteMovie(val: any): Observable<any> {
    // const headers = { 'content-type': 'application/json' }
    // const body = JSON.stringify(val);
    // //console.log(body);
    return this.http.delete<any>(this.apiUrl + "/MovieDetails/id?="+val);
  }


  bookTicket(val: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(val);
    //console.log(body);
    return this.http.post<any>(this.apiUrl + "/UserTicketBookingDetails", body, { 'headers': headers });

  }

  addRating(val: any) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(val);
    //console.log(body);
    return this.http.put<any>(this.apiUrl + "/UserTicketBookingDetails", body, { 'headers': headers });
  }

  cancelBooking(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/UserTicketBookingDetails/?id=" + id);
  }

  addSeat(movie_id: number, date: any, time: string, seatNo: number) {
    return this.http.put(this.apiUrl + "/showDetails/addseat/?movie_id=" + movie_id + "&date=" + date + "&time=" + time + "&seatNo=" + seatNo, Object);
  }
  removeSeat(id: number, seatAmountChange: number) {
    return this.http.put(this.apiUrl + "/showDetails/removeseat/?id=" + id + "&seatAmountChange=" + seatAmountChange, Object);
  }

  addShow(val: any[]): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(val);
    console.log(body);
    return this.http.post<any>(this.apiUrl + "/ShowDetails/", body, { 'headers': headers });
  }
  getShowById(id: number): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + "/ShowDetails/?id=" + id);
  }


  UploadPhoto(val: any): Observable<any> {

    return this.http.post(this.apiUrl + "/MovieDetails/saveFile", val);
  }
}

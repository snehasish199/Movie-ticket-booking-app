import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './mycomponents/register/register.component';
import { LoginComponent } from './mycomponents/login/login.component';
import { HomeComponent } from './mycomponents/home/home.component';
import{ ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './shared.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddMovieComponent } from './mycomponents/add-movie/add-movie.component';
import { BookComponent } from './mycomponents/book/book.component';
import { MybookComponent } from './mycomponents/mybook/mybook.component';
import { ErrorComponent } from './mycomponents/error/error.component';
import { AdminloginComponent } from './mycomponents/adminlogin/adminlogin.component';


// import { Observable} from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AddMovieComponent,
    BookComponent,
    MybookComponent,
    ErrorComponent,
    AdminloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

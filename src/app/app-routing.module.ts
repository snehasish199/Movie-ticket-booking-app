import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './mycomponents/add-movie/add-movie.component';
import { DeleteMovieComponent } from './mycomponents/delete-movie/delete-movie.component';
import { AdminloginComponent } from './mycomponents/adminlogin/adminlogin.component';
import { BookComponent } from './mycomponents/book/book.component';
import { ErrorComponent } from './mycomponents/error/error.component';
import { HomeComponent } from './mycomponents/home/home.component';
import { LoginComponent } from './mycomponents/login/login.component';
import { MybookComponent } from './mycomponents/mybook/mybook.component';
import { RegisterComponent } from './mycomponents/register/register.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"addmovie",component:AddMovieComponent},
  {path:"deletemovie",component:DeleteMovieComponent},
  {path:"mybooking",component:MybookComponent},
  {path:"book/:id", component:BookComponent},
{path:"login",component:LoginComponent},
{path:"adminlogin",component:AdminloginComponent},
{path:"register",component:RegisterComponent},
{path:"**",component:ErrorComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

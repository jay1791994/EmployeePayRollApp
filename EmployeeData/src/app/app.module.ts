import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoursComponent } from './data/hours.component';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { AppRoutingModule } from './app-routing.module';
import {BrowserModule} from "@angular/platform-browser"
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './Admin/admin.component';
import { EmployeeDetailsComponent } from './Admin/employee-details/employee-details.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './data/profile/profile.component';
import { ProfiledetailsComponent } from './data/profiledetails.component';
import { NewEmployeeComponent } from './Admin/new-employee/new-employee.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
 
  imports: [
    CommonModule,
    FormsModule,
    MyDateRangePickerModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent ,HoursComponent, AdminComponent, EmployeeDetailsComponent, HomeComponent, ProfileComponent, ProfiledetailsComponent, NewEmployeeComponent],
  bootstrap:    [ AppComponent ]

})
export class AppModule { }
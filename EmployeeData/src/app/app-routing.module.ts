import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HoursComponent } from './data/hours.component';
import { AdminComponent } from './Admin/admin.component';
import { EmployeeDetailsComponent } from './Admin/employee-details/employee-details.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './data/profile/profile.component';
import { NewEmployeeComponent } from './Admin/new-employee/new-employee.component';


const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'newEmployee', component:NewEmployeeComponent},
  { path:'emp', component: AdminComponent},
  {path: 'profile/:id', component:ProfileComponent},
  { path:'empData/:id', component: EmployeeDetailsComponent},
  {path:'', component:HomeComponent},
  { path: 'employee', component: HoursComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Admin/Employee.model';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  emp : Employee ;
  displayTimesheet: boolean= false ;

  constructor( private _route:ActivatedRoute, private _employeeService:EmployeeService) { }

  ngOnInit() {
  let empId =   this._route.snapshot.paramMap.get('id');
  this._employeeService.getEmployeeDataforUser(empId).subscribe(
       data => {
         console.log(data);
         this.emp = data ;
       },
       err =>{
          console.log(err);
       }
  );
  }

  displaytimesheet(){
       this.displayTimesheet = true;
  }


  gotomainpage(){
    this.displayTimesheet = false;
  }
}

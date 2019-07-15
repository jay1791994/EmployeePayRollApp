import { Component, OnInit } from '@angular/core';
import { Employee } from './Employee.model';
import { EmployeeService } from '../services/employee.service';
import { DateRangeUtilService } from 'mydaterangepicker/dist/services/my-date-range-picker.date.range.util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {



  employeeData: Employee[] = [];

  rowtype: string="success";
  constructor(private _employeeService: EmployeeService, private _router: Router) { }

  ngOnInit() {

     this._employeeService.getEmployeeData().subscribe(
         data => {
           console.log("data is"+ data);
           this.employeeData = data ;
         }
     );

  }

  createProfile(){
    this._router.navigate(['newEmployee'], {skipLocationChange : true})
  }

  getclassfromhere():string{
    if(this.rowtype === 'success'){
      this.rowtype = 'danger' ;
      
      return 'danger' ;
    }else{
      this.rowtype = 'success' ;
     
      return 'success';
    }
  }

  viewdetails(emp: Employee){
    console.log(emp.empId);
     this._router.navigate(['empData', emp.empId], { skipLocationChange: true });
  }

  deleteemp(emp:Employee){
      
    this._employeeService.deleteEmployee(emp).subscribe(
       (data)=>{

       },
       err => {

       },
       ()=>{
        this._employeeService.getEmployeeData().subscribe(
          data => {
            console.log("data is"+ data);
            this.employeeData = data ;
          }
      )
       }

    );

  }

  filterdata(str: string){
    console.log(str);
    this.employeeData = this._employeeService.filterdata(str);;
  }

}

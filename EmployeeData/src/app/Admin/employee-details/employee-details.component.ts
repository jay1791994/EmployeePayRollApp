import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../Employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  empId: string ;
  emp : Employee ;
  constructor(private _route: ActivatedRoute,
    private _router: Router
  , private _employeeService: EmployeeService) { }

  ngOnInit() {
    
     this.empId =   this._route.snapshot.paramMap.get('id');
    this._employeeService.getEmployee(this.empId).subscribe(
        data => {
          console.log("this is data" +  data)
          this.emp = data;
        },
        err => {
           console.log(err);
        }
    );
  }

  goback(){
     this._router.navigate(['emp'], { skipLocationChange: true });
  }
}
 
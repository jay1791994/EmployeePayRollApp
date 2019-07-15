import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { newEmployee } from './newEmployee.model';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {


  profileForm =new FormGroup({
    
    empName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    rate : new FormControl('', Validators.required),
    ssn : new FormControl('',Validators.required),
    cmp_Name: new FormControl('', Validators.required),
    methodofpayment: new FormControl('', Validators.required) ,
    address : new FormControl(''),
    contactNumber: new FormControl('')

  });

  constructor(private _router: Router, private _employeeService: EmployeeService) { }

  ngOnInit() {
  }
   
  goback(){
       this._router.navigate(['emp'] , { skipLocationChange: true });
  }

  onsubmitform(){
     if(this.profileForm.valid === false){
       console.log(this.profileForm.value);
       alert("some of the fields are invalid");
       return ;
     }else {
      console.log(this.profileForm.value);
      
        let newemp : newEmployee = new newEmployee(this.profileForm.value.empName, 
        this.profileForm.value.email,
        this.profileForm.value.ssn,
        this.profileForm.value.cmp_Name,
        this.profileForm.value.methodofpayment,
        this.profileForm.value.address,
        this.profileForm.value.contactNumber,
        this.profileForm.value.rate);

      console.log(newemp)

      this._employeeService.postEmployee(newemp).subscribe(
               data => {
                 console.log("subscribing the value");
                 console.log(data);
               },
               error => {
                 console.log(error);
               },
               ()=>{
                 this._router.navigate(['emp']);
               }


      );
     }

  }

}

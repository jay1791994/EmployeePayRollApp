import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { newEmployee } from './newEmployee.model';
import { AuthService } from 'src/app/services/auth.service';


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
    contactNumber: new FormControl(''),
    password: new FormControl('')

  });

  userExists: boolean = false;

  constructor(private _router: Router, private _employeeService: EmployeeService, private _auth: AuthService) { }

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

      console.log(newemp);

      let credentials = new Credentials();
       credentials.username = this.profileForm.value.email;
       credentials.password = this.profileForm.value.password ;

      this._auth.registeruser(credentials).subscribe(
                    data => {
                       console.log(data);
                       this._employeeService.postEmployee(newemp).subscribe(
                                  data => {
                                    console.log("subscribing the value");
                                   console.log(data);
                                  },
                                  error => {
                                    console.log(error);
                                  },
                                 ()=>{

                       })
                     },
                     err => {
                        this.userExists = true;
                     },
                     () =>{
                      this._router.navigate(['emp'], { skipLocationChange: true });
                     }
  
  
                  );
  
     }

  }

}


class Credentials{
  username:string;
  password:string;
}

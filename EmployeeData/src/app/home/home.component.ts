import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  userName: string="" ;
  password: string="";
  role: string ;
  wrongcredentials: boolean = true ;
  constructor(private _auth: AuthService, private _router: Router, private _employeeService:EmployeeService) { }

  ngOnInit() {
  }

  login() : void {
     
  
    this._auth.singin(this.userName, this.password).subscribe(
      data => {
        this._auth.settoken(data.jwttoken);
     
        this.role = data.role ;
        this.wrongcredentials = true;
      },
      err => {
        console.log(err);
        this.wrongcredentials = false;  
       },
      ()=>{
         
        if(this.role === "ROLE_ADMIN"){
          this._router.navigate(["emp"], {skipLocationChange:true});
        }else if(this.role === "ROLE_EMPLOYEE"){
          let id : String ;
         
          this._employeeService.findIdforUserName(this.userName).subscribe(
            data => {
              id = data.empId ;
           
            },
            err =>{
               console.log(err)
            },
            ()=>{
                this._router.navigate(["profile", id], {skipLocationChange:true});
            }
          )  
            }else{
          this._router.navigate(["/"]);
        }
      }
           
    );
  

  }

}

import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Admin/Employee.model';
import { newEmployee } from '../Admin/new-employee/newEmployee.model';
import { AuthService } from './auth.service';
import {map} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  host: string = "http://localhost:8080/";
  constructor(private _http: HttpClient, private _auth: AuthService) {

  }

  deleteEmployee(emp: Employee): Observable<newEmployee> {

    let webtoken = 'Bearer ' + this._auth.gettoken();
    const header = new HttpHeaders({ 'myKey': webtoken });
    return this._http.delete<newEmployee>(this.host + "api/employee/" + emp.empId, { headers: header });

  }


  getEmployeeData(): Observable<any> {

    let webtoken = 'Bearer ' + this._auth.gettoken();
    const header = new HttpHeaders({ 'myKey': webtoken });
    return this._http.get<any>(this.host + "api/employees", { headers: header });

  }



  getEmployee(id: string): Observable<newEmployee> {

    let webtoken = 'Bearer ' + this._auth.gettoken();
    const header = new HttpHeaders({ 'myKey': webtoken });
    return this._http.get<any>("http://localhost:8080/api/employee/" + id, { headers: header });

  }

  getEmployeeDataforUser(id: string): Observable<Employee> {
    console.log("get user called");
    let webtoken = 'Bearer ' + this._auth.gettoken();
    const header = new HttpHeaders({ 'myKey': webtoken });
    return this._http.get<Employee>("http://localhost:8080/api/employee/" + id, { headers: header });

  }


  filterdata(paymentmethod: string): Employee[] {


    if (paymentmethod === 'all') {
      return [];
    }




    return [];


  }

  postEmployee(emp: newEmployee): Observable<any> {

    let webtoken = 'Bearer ' + this._auth.gettoken();
    const header = new HttpHeaders({ 'myKey': webtoken });
    return this._http.post("http://localhost:8080/api/employee", emp, { headers: header });

  }


  findIdforUserName(username: string): Observable<any>{

    let webtoken = 'Bearer ' + this._auth.gettoken();
    const header = new HttpHeaders({ 'myKey': webtoken
                                    });
    const param = new HttpParams().set('email', username);

      return this._http.get(this.host+"api/getuserIdbyUsername",{headers:header, params:param});
  }

}
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../Admin/Employee.model';
import { newEmployee } from '../Admin/new-employee/newEmployee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  host:string = "http://localhost:8080/";

  constructor(private _http:HttpClient) {

   }


   deleteEmployee(emp:Employee): Observable<Employee>{
      
         return  this._http.delete<Employee>(this.host+"api/employee/"+emp.empId);
      
   }


   getEmployeeData(): Observable<Employee[]>{
       return  this._http.get<Employee[]>("http://localhost:8080/api/employees");
   }


     
  getEmployee(id:string): Observable<any> {
    console.log("service called");
    return this._http.get<any>("http://localhost:8080/api/employee/"+id);

  }

  filterdata( paymentmethod: string): Employee[]{
    

    if(paymentmethod === 'all'){
        return [];
    }


    

   return [];


  }

  postEmployee(emp: newEmployee): Observable<any>{
       
     return this._http.post("http://localhost:8080/api/employee", emp);

  }

}
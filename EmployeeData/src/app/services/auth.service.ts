

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../Admin/Employee.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

   constructor(){

    }


    singin(userName:string, password:string){

        if(userName === 'admin' && password === 'password'){
            return "ROLE_ADMIN";
        }else if(userName === "user" && password === "password" ){
            return "ROLE_USER";
        }
    }

}
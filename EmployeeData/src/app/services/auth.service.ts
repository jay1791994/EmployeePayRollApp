

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

   role: string;
   token: string ;
   host:string = "http://localhost:8080/";


   constructor(private _http:HttpClient){

    }


    singin(userName:string, passWord:string): Observable<any>{

       let credential: Credentials = new Credentials;

       credential.username = userName ;
       credential.password = passWord ;

 
        
      return this._http.post("http://localhost:8080/authenticate", credential);
         
     }

      settoken(tkn:string):void {
         this.token = tkn;
       }

       gettoken():string {
        return this.token;
      }

       registeruser(cred: Credentials): Observable<any>{

        
            let webtoken = 'Bearer '+this.gettoken();
            const header = new HttpHeaders({'myKey':webtoken});

          return this._http.post<any>(this.host+"create/user", cred, {headers:header} );
       }

   
}

class Credentials{
    username:string;
    password:string;
    
}
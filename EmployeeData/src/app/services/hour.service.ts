import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Injectable } from '@angular/core';
import { HoursRequest } from '../data/hoursRequest.model';
import { AuthService } from './auth.service';
import { InvoiceRequest } from '../Admin/employee-details/invoiceRequest.model';



@Injectable({
  providedIn: 'root'
})
export class HourService {

    host:string = "http://localhost:8080/";

    constructor(private _http: HttpClient, private _auth:AuthService){

    }

    uploadHours(hrs: HoursRequest):Observable<any>{

        let webtoken = 'Bearer '+this._auth.gettoken();
        const header = new HttpHeaders({'myKey':webtoken});
        return this._http.post(this.host+"api/hours", hrs,{headers: header});

    }

    generatehours(invoiceRequest:InvoiceRequest){
    
      let webtoken = 'Bearer '+this._auth.gettoken();
      const header = new HttpHeaders({'myKey':webtoken});
      const param = new HttpParams().set('empId', invoiceRequest.empId).set('startDate', invoiceRequest.startDate).set('endDate', invoiceRequest.endDate);
      return this._http.get(this.host+"api/hours", {
             headers:header,
             params:param
      })

    }

}
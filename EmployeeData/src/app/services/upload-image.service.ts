import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private _http:HttpClient, private _auth:AuthService) { }
  

  fileupload(file: File,  bdate:string, edate:string, empId:string){

    console.log(bdate);
    console.log(edate);
  
  this.uploadFile("http://localhost:8080/api/doUpload",file, bdate, edate, empId).pipe(
         map( res=>{
           
          return res;
         } 
       
          )  
         ).subscribe(res =>{

            
            
         },
         error =>{
           console.log("this is called on error")
         },
         () => {
          alert("TIMSHEET GOT UPLOADED");
         } )
     
  }


  invoiceUpload(file: File,  bdate:string, edate:string, empId:string){

    
    console.log(bdate);
    console.log(edate);
  
  this.uploadFile("http://localhost:8080/invoice/upload",file, bdate, edate, empId).pipe(
         map( res=>{
           
          return res;
         } 
       
          )  
         ).subscribe(res =>{

            
            
         },
         error =>{
           console.log(error);
           console.log("this is called on error")
         },
         () => {
            alert("INVOICE GOT UPLOADED")
         } )
     

  }

  uploadFile(url: string, file: File, begindate:string, enddate: string, empId:string): Observable<any>{

    let formData = new FormData();
    formData.append('file', file);
    formData.append('begindate', begindate);
    formData.append('enddate',enddate);
    formData.append('empId', empId)

    let params = new HttpParams();
    let webtoken = 'Bearer ' + this._auth.gettoken();
    const header = new HttpHeaders({ 'myKey': webtoken });

    const options = {
      headers: header,
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);
    return this._http.request(req);
  }
 
}

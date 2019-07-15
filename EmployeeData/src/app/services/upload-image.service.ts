import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private _http:HttpClient) { }
  

  fileupload(file: File,  bdate:string, edate:string){

    console.log(bdate);
    console.log(edate);
  
  this.uploadFile("http://localhost:8080/doUpload",file, bdate, edate).pipe(
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
         
         } )
     
  }

  uploadFile(url: string, file: File, begindate:string, enddate: string): Observable<any>{

    let formData = new FormData();
    formData.append('file', file);
    formData.append('begindate', begindate);
    formData.append('enddate',enddate);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);
    return this._http.request(req);
  }
 
}

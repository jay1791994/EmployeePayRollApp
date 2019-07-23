import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { newEmployee } from '../new-employee/newEmployee.model';
import { IMyDrpOptions } from 'mydaterangepicker';
import { InvoiceRequest } from './invoiceRequest.model';
import { HourService } from 'src/app/services/hour.service';
import { InvoiceResponse } from '../invoiceResponse.model';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  empId: string ;
  emp : newEmployee ;
  dates :String[] = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
  months :String[] = ["01","02","03","04","05","06","07","08","09","10","11","12"]; 
  invoiceResponse: InvoiceResponse ;
  
  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
  };

  constructor(private _route: ActivatedRoute,
    private _router: Router,
   private _employeeService: EmployeeService,
   private _hourService: HourService,
   private _uploadService: UploadImageService) { }

  ngOnInit() {
    
     this.empId =   this._route.snapshot.paramMap.get('id');
    this._employeeService.getEmployee(this.empId).subscribe(
        data => {
          console.log("this is data" +  data)
          this.emp = data;
        },
        err => {
           console.log(err);
        }
    );
  }

  goback(){
     this._router.navigate(['emp'], { skipLocationChange: true });
  }


  bDate: Date ;
  eDate: Date ; 

  datesSubmitted(event): void{

     console.log(event);

     this.bDate = new Date();
     this.eDate = new Date();
  
      this.bDate.setMonth(event.beginDate.month-1);
      this.bDate.setDate(event.beginDate.day);
      this.bDate.setFullYear(event.beginDate.year);

      this.eDate.setMonth(event.endDate.month-1);
      this.eDate.setDate(event.endDate.day);
      this.eDate.setFullYear(event.endDate.year);


  }

  generateInvoice():void{
    
    let sDate :string = this.months[this.bDate.getMonth()]+"/"+this.dates[this.bDate.getDate()]+"/"+this.bDate.getFullYear();
    let eDate :string = this.months[this.eDate.getMonth()]+"/"+this.dates[this.eDate.getDate()]+"/"+this.eDate.getFullYear();
    

      let invoiceRequest : InvoiceRequest = new InvoiceRequest();
      invoiceRequest.empId = this.empId;
      invoiceRequest.startDate = sDate;
      invoiceRequest.endDate = eDate;
     
      this._hourService.generatehours(invoiceRequest).subscribe(
        data => {
          this.invoiceResponse = data ;
          console.log(this.invoiceResponse);
        },
        err => {
          console.log(err)
        },
        
      )


       

  }

  file : File ;
  onfilechange(event){
    console.log("file changed");
    this.file = event.target.files[0];
  }

onfileupload(){
    
    if(this.file == null){
        alert("FILE IS NOT SELECTED");
        return;
    }
    let startdate :string = this.months[this.bDate.getMonth()]+"/"+this.dates[this.bDate.getDate()]+"/"+this.bDate.getFullYear();
    let endingdate :string =this.months[this.eDate.getMonth()]+"/"+this.dates[this.eDate.getDate()]+"/"+this.eDate.getFullYear();
    this._uploadService.invoiceUpload(this.file,startdate, endingdate, this.emp.empName);
  }
}
 
import { Component, OnInit } from '@angular/core';
import {IMyDrpOptions} from 'mydaterangepicker';
import { WorkingDay } from './WorkingDay';
import { UploadImageService } from '../services/upload-image.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {


  file : File;
  daysofweek: WorkingDay[] = [];
  displayColumns: boolean= false ;
  dateInterval: Date[]= [];
 days :String[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  months :String[] = ['January','February','March','April','May','June','July','August','September','October','November','December']; 


  myDateRangePickerOptions: IMyDrpOptions = {
      dateFormat: 'dd.mm.yyyy',
};

  constructor(private _uploadService: UploadImageService) { }

  ngOnInit() {
  }

  bDate: Date = new Date();
  eDate: Date = new Date(); 

  datesSubmitted(event): void{

      this.dateInterval = [];
      this.daysofweek =  [];
      this.displayColumns = true;

  
      this.bDate.setMonth(event.beginDate.month-1);
      this.bDate.setDate(event.beginDate.day);
      this.bDate.setFullYear(event.beginDate.year);
     
  
     
       for(var i=0 ; i < 7 ; i++){
       
          this.eDate = new Date();
          this.eDate= new Date(this.bDate.getTime()+1000*60*60*24*i) ;
         
          let workingDay = new WorkingDay(this.eDate, 0);
          this.dateInterval.push(this.eDate);
          this.daysofweek.push(workingDay);
       }

       console.log(this.bDate);
       console.log(this.eDate);
       
      
      }


      total: number = 0 ;

  calculatehours(){

         this.total = 0;
         for(var i=0 ; i < 7 ; i++){
           this.total = this.total + this.daysofweek[i].hour ;
         }

         console.log("total hous is " +  this.total);
         
  }

  onfilechange(event){
        
        console.log("file changed");
        this.file = event.target.files[0];

  }

  onfileupload(){
        
        if(this.file == null){
            alert("FILE IS NOT SELECTED");
            return;
        }
        let startdate :string = this.bDate.getMonth()+1+"/"+this.bDate.getDate()+"/"+this.bDate.getFullYear();
        let endingdate :string =this.eDate.getMonth()+1+"/"+this.eDate.getDate()+"/"+this.eDate.getFullYear();

        console.log("start date is" +startdate);
        console.log("ending date is"+ endingdate);

        this._uploadService.fileupload(this.file,startdate, endingdate);
      }


      onDateRangeChanged(event){
        console.log(event.beginDate);
        console.log(event.endDate);
      }
 
    }

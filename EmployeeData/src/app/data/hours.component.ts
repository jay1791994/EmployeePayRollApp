import { Component, OnInit, Input } from '@angular/core';
import {IMyDrpOptions} from 'mydaterangepicker';
import { WorkingDay } from './WorkingDay';
import { UploadImageService } from '../services/upload-image.service';
import { HoursRequest } from './hoursRequest.model';

import { HourService } from '../services/hour.service';


@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {



  @Input() empId: string;

  file : File;
  daysofweek: WorkingDay[] = [];
  displayColumns: boolean= false ;
  dateInterval: Date[]= [];
  dates :String[] = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
  months :String[] = ["01","02","03","04","05","06","07","08","09","10","11","12"]; 
  dayTobeAdded: string ;
  days : string[] = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THUSRDAY","FRIDAY","SATURDAY"];

  myDateRangePickerOptions: IMyDrpOptions = {
      dateFormat: 'dd.mm.yyyy',
};

  constructor(private _uploadService: UploadImageService, private _hoursService: HourService) { }

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
     

      console.log(event.beginDate);
  
      console.log(this.bDate);
     
       for(var i=0 ; i < 7 ; i++){
       
          this.eDate = new Date();
          this.eDate= new Date(this.bDate.getTime()+1000*60*60*24*i) ;

          console.log(this.eDate);

          let workingDay = new WorkingDay(this.eDate, 0);
          this.dateInterval.push(this.eDate);
          this.daysofweek.push(workingDay);
       }

      }


      total: number = 0 ;

  calculatehours(){
           
         let hrsRequest: HoursRequest = new HoursRequest();
         hrsRequest.empId = this.empId;
         this.total = 0;
         for(var i=0 ; i < 7 ; i++){

          console.log(this.daysofweek[i].dateoftheday+"  "+ this.daysofweek[i].hour);

          this.dayTobeAdded= this.daysofweek[i].dateoftheday.getFullYear()+"-"+(this.months[this.daysofweek[i].dateoftheday.getMonth()])+"-"+this.dates[this.daysofweek[i].dateoftheday.getDate()];
          console.log("DAY TO B ADDED IS"+ this.dayTobeAdded)
          hrsRequest.hourMap[this.dayTobeAdded] = this.daysofweek[i].hour;
          this.total = this.total + this.daysofweek[i].hour ;
         }

         console.log(hrsRequest);

         this._hoursService.uploadHours(hrsRequest).subscribe(
             data => {
               console.log(data);
             },
             err => {
               console.log(err);
             }
         )
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
        let startdate :string = this.months[this.bDate.getMonth()]+"/"+this.dates[this.bDate.getDate()]+"/"+this.bDate.getFullYear();
        let endingdate :string =this.months[this.eDate.getMonth()]+"/"+this.dates[this.eDate.getDate()]+"/"+this.eDate.getFullYear();
        this._uploadService.fileupload(this.file,startdate, endingdate, this.empId);
      }
 }

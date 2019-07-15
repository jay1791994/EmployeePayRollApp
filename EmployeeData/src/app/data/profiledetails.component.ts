import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../Admin/Employee.model';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css']
})
export class ProfiledetailsComponent implements OnInit {


  @Input() emp: Employee;
  constructor() { }

  ngOnInit() {
  }

}

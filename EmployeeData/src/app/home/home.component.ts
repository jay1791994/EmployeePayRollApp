import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  userName: string="" ;
  password: string="";
  role: string ;
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  login() : boolean {
     
  
   this.role =  this._auth.singin(this.userName, this.password) ;

   if(this.role === "ROLE_ADMIN"){
            this._router.navigate(["emp"], { skipLocationChange: true });
   }else if(this.role === "ROLE_USER"){
           this._router.navigate(["profile",'abc' ], { skipLocationChange: true });
   }else{
          this._router.navigate([""]);
   }
  return true;

  }

}

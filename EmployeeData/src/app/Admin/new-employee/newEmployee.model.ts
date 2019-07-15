export class newEmployee{

    empName: string;
    email: string;
    rate : number;
    ssn : string;
    cmp_Name: string;
    methodofpayment: string;
    address : string;
    contactNumber : string;

     
    constructor(empName:string, email:string, ssn:string, cmp_Name:string, methodofpayment:string, address:string,contactNumber:string, rate:number){

         this.empName = empName;
         this.email = email ;
         this.ssn = ssn;
         this.cmp_Name = cmp_Name;
         this.methodofpayment = methodofpayment;
         this.address = address;
         this.contactNumber = contactNumber;
         this.rate = rate ;
    
    }


}
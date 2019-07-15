package com.jay.employee.model;

import java.util.Random;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;






public class Employee {
	
	   @Id
	   String empId;
	   String empName;
	   String ssn ;
	   String address;
	   double rate ;
	   String cmp_Name;
	  
	   @Indexed(unique=true)
       String email;
	   String contactNumber;
	   String methodofpayment;
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public String getSsn() {
		return ssn;
	}
	public void setSsn(String ssn) {
		this.ssn = ssn;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public double getRate() {
		return rate;
	}
	public void setRate(double rate) {
		this.rate = rate;
	}
	public String getCmp_Name() {
		return cmp_Name;
	}
	public void setCmp_Name(String cmp_Name) {
		this.cmp_Name = cmp_Name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getMethodofpayment() {
		return methodofpayment;
	}
	public void setMethodofpayment(String methodofpayment) {
		this.methodofpayment = methodofpayment;
	}
	   
    public String generateId() {
    	
    	Random random = new Random();
    	
    	String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@&*";
    	
    	StringBuilder builder = new StringBuilder();
    	
    	for(int i=0 ; i<12 ; i++) {
    		builder.append(str.charAt(random.nextInt(str.length())));
    	}
    	
    	return builder.toString();
   }
	   
}

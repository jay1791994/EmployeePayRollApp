package com.jay.employee.request;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

public class HoursRequest {
 
  private	String empId;
  
  @DateTimeFormat(pattern="MM/dd/yyyy")
  private	LocalDate startDate;
  
  @DateTimeFormat(pattern="MM/dd/yyyy")
  private	LocalDate endDate;
 
  public String getEmpId() {
	return empId;
}
public void setEmpId(String empId) {
	this.empId = empId;
}
public LocalDate getStartDate() {
	return startDate;
}
public void setStartDate( @DateTimeFormat(pattern="MM/dd/yyyy") LocalDate startDate) {
	this.startDate = startDate;
}
public LocalDate getEndDate() {
	return endDate;
}
public void setEndDate(LocalDate endDate) {
	this.endDate = endDate;
}
  
 }

package com.jay.employee.response;

import java.util.HashMap;

public class InvoiceResponse {
	
	String empId;
	HashMap<String, Double> hourMap ;
	Double totalAmount;
	Double totalHours;
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public HashMap<String, Double> getHourMap() {
		return hourMap;
	}
	public void setHourMap(HashMap<String, Double> hourMap) {
		this.hourMap = hourMap;
	}
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public Double getTotalHours() {
		return totalHours;
	}
	public void setTotalHours(Double totalHours) {
		this.totalHours = totalHours;
	}
	
}

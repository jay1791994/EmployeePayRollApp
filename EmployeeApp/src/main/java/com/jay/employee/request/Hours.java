package com.jay.employee.request;

import java.time.LocalDate;

import java.util.Date;
import java.util.HashMap;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

@Document
public class Hours {
	
	@Id
	String empId;
	
	HashMap<String, Double> hourMap = new HashMap<>();
	
	
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
	
}

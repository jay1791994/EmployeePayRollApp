package com.jay.employee.controller;

import java.time.LocalDate;

import java.time.format.DateTimeFormatter;
import java.util.Date;
import com.jay.employee.model.*;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jay.employee.repo.EmployeeRepo;
import com.jay.employee.request.Hours;
import com.jay.employee.request.HoursRequest;
import com.jay.employee.response.InvoiceResponse;
import com.jay.employee.service.EmployeeService;
import com.jay.employee.service.HourService;

@RestController
@RequestMapping("api")
public class HoursControllers {
	
	
	@Autowired
	HourService hourservice;
	

	@PostMapping("hours")
	boolean putHours(@RequestBody Hours hrs) {
		
		
		hourservice.addHours(hrs);
	
	    return true;
	}
	
	@GetMapping("hours")
	InvoiceResponse getHours(@RequestParam("empId") String empId, @RequestParam("startDate") String sDate,@RequestParam("endDate") String eDate ) {
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
		
		LocalDate startDate = LocalDate.parse(sDate, formatter);
		LocalDate endDate = LocalDate.parse(eDate, formatter);
		
		HoursRequest hrs = new HoursRequest();
		hrs.setEmpId(empId);
		hrs.setStartDate(startDate);
		hrs.setEndDate(endDate);
	
	
		return hourservice.getHours(hrs);
	
	   
	}
	
	
}	
	
	   


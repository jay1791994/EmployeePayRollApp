package com.jay.employee.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.jay.employee.model.Employee;
import com.jay.employee.service.EmployeeService;
import com.jay.employee.service.EmployeeServiceImpl;

@RestController
@RequestMapping("api")
public class EmployeeController {
	
    @Autowired
    private StorageService storageService;

    
    @Autowired
    private EmployeeService empService;
    
    @RequestMapping(value = "/doUpload", method = RequestMethod.POST)
    @CrossOrigin(origins = { "http://localhost:4200" })
    public String upload(@RequestParam("file") MultipartFile file, @RequestParam("begindate")  @DateTimeFormat(pattern="MM/dd/yyyy") Date begindate , @RequestParam("enddate")  @DateTimeFormat(pattern="MM/dd/yyyy") Date enddate ) throws Exception {

    
    
    	storageService.uploadFile(file, begindate, enddate);
    	
		return "UPLOADED";
    }
    
    @GetMapping("employee/{empId}")
    @CrossOrigin(origins = { "http://localhost:4200" })
    public Employee getEmployee(@PathVariable("empId") String empId) {
    	
    	return empService.getEmp(empId);
    }
    
     
    @PostMapping("/employee")
     @CrossOrigin(origins = { "http://localhost:4200" })
     public Employee createEmployee(@RequestBody Employee emp) {
    	 
    	 System.out.println(emp.toString());
    	 empService.saveEmployee(emp);
    	 
    	 
    	 return emp;
     }
    
    
    
     @DeleteMapping("/employee/{empId}")
     @CrossOrigin(origins = { "http://localhost:4200" })
     public boolean deleteEmployee(@PathVariable("empId") String empId) {
    	 
    	
    	 boolean empDeleted = empService.deleteEmployee(empId);
    	 
    	 
    	 return empDeleted;
     }
     
     
     @GetMapping("/employees")
     @CrossOrigin(origins = { "http://localhost:4200" })
     public List<Employee> getEmployees() {
    	 
    	
    	return  empService.getEmployees();
    	 
    	 
    	 
     }
    
   
  }

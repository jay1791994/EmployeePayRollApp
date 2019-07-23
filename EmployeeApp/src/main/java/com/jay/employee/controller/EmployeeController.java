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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.jay.employee.model.Employee;
import com.jay.employee.repo.AuthRepo;
import com.jay.employee.request.UserCredentials;
import com.jay.employee.service.EmployeeService;
import com.jay.employee.service.EmployeeServiceImpl;

@RestController
@RequestMapping("api")
public class EmployeeController {
	
    @Autowired
    private StorageService storageService;

    
    @Autowired
    private EmployeeService empService;
    
    @Autowired
	AuthRepo authRepo;
	
    
    @RequestMapping(value="doUpload", method = RequestMethod.POST)
    @CrossOrigin(origins = { "http://localhost:4200" })
    @Secured("ROLE_EMPLOYEE")
    public boolean upload(@RequestParam("file") MultipartFile file, @RequestParam("begindate")  @DateTimeFormat(pattern="MM/dd/yyyy") Date begindate , @RequestParam("enddate")  @DateTimeFormat(pattern="MM/dd/yyyy") Date enddate, @RequestParam("empId") String empId ) throws Exception {

    
    	Employee employee = empService.getEmployeeNamefromEmpId(empId);
    	
    	String empName = employee.getEmpName();
    
    	storageService.uploadFile(file, begindate, enddate, empName);
    	
		return true;
    }
    
    @GetMapping("employee/{empId}")
    @CrossOrigin(origins = { "http://localhost:4200" })
    @Secured({"ROLE_ADMIN" , "ROLE_EMPLOYEE"})
    public Employee getEmployee(@PathVariable("empId") String empId) {
    	
    	return empService.getEmp(empId);
    }
    
     
    @PostMapping("/employee")
    @CrossOrigin(origins = { "http://localhost:4200" })
    @Secured("ROLE_ADMIN")
     public Employee createEmployee(@RequestBody Employee emp) {
    	 
    	 
    	 System.out.println(emp.toString());
    	 empService.saveEmployee(emp);
    	 
    	 
    	 return emp;
     }
    
    
    
     @DeleteMapping("/employee/{empId}")
     @CrossOrigin(origins = { "http://localhost:4200" })
     @Secured("ROLE_ADMIN")
     public boolean deleteEmployee(@PathVariable("empId") String empId) {
    	 
    	 
    	 Employee emp = empService.getEmp(empId);
    	
    	 boolean empDeleted = empService.deleteEmployee(empId);
    	 
    	
    
    	 return empDeleted;
     }
     
     
     @GetMapping("/employees")
     @Secured("ROLE_ADMIN")
     @CrossOrigin(origins ={"http://localhost:4200"})
     public List<Employee> getEmployees() {
    	 
    	
    	return  empService.getEmployees();
    	 
    	 
    	 
     }
     
     @GetMapping(value="/getuserIdbyUsername")
     @Secured({"ROLE_EMPLOYEE","ROLE_ADMIN"})
     @CrossOrigin(origins ={"http://localhost:4200"})
     public Employee getUserIdByUserName(@RequestParam("email") String userName) {
    	
    	
    	return  empService.getempIdfromEmail(userName);
    	
    	
    	 
     }
     
     
     
    
    
   
  }

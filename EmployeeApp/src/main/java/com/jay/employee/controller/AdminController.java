package com.jay.employee.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jay.employee.repo.AuthRepo;
import com.jay.employee.request.JwtRequest;
import com.jay.employee.request.UserCredentials;

@RestController
public class AdminController {
	
	@Autowired
	AuthRepo authRepo;
	
	@Autowired
	StorageService storageService;
	
	
	
	@PostMapping("create/admin")
	boolean createAdmin(@RequestBody UserCredentials userCredentials) {
		
		
		System.out.println("THIS IS CALLED");
		userCredentials.setRole("ROLE_ADMIN");
		authRepo.save(userCredentials);
		return true ;
	}
	
	
	@PostMapping("create/user")
	boolean createUser(@RequestBody UserCredentials userCredentials) {
		
		
		userCredentials.setRole("ROLE_EMPLOYEE");
	    authRepo.save(userCredentials);
		return true ;
	}
	
	
	 @RequestMapping(value = "invoice/upload", method = RequestMethod.POST)
	    @CrossOrigin(origins = { "http://localhost:4200" })
	    @Secured("ROLE_ADMIN")
	    public boolean upload(@RequestParam("file") MultipartFile file, @RequestParam("begindate")  @DateTimeFormat(pattern="MM/dd/yyyy") Date begindate , @RequestParam("enddate")  @DateTimeFormat(pattern="MM/dd/yyyy") Date enddate, @RequestParam("empId") String empName ) throws Exception {

		  try {
	    
		 System.out.println("start date is "+  begindate.toString());
			System.out.println("start date is "+  enddate.toString());
	         
	    	storageService.invoiceFile(file, begindate, enddate, empName);
		  }catch(Exception e) {
			  throw new Exception();
		  }
			return true;
	    }
	
	

}

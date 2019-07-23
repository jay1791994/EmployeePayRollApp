package com.jay.employee.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jay.employee.service.EmployeeService;

@Service
public class StorageService {

	@Value("${value.to.invoice}")
	String pathoffolderforinvoice;
	
	@Value("${value.to.timesheets}")
	String pathoffolderfortimesheet;


	public void invoiceFile(MultipartFile file, Date begindate, Date enddate, String empName) throws Exception {

 
		
		
		String fileName = file.getOriginalFilename();
		
		String ext = fileName.substring(fileName.lastIndexOf("."), fileName.length());
		 
		
		
		String filename = getfilename(begindate, enddate, empName);
		String month = getmonth(begindate.getMonth());
		System.out.println("Month is " + month);
		int year = begindate.getYear() + 1900;
		
		

		File theDir = new File(pathoffolderforinvoice + month + year);
		theDir.mkdir();
		Path newfile = Paths.get(pathoffolderforinvoice + theDir.getName() + "//" + filename+ext);
		try {

			Files.write(newfile, file.getBytes());

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

	}

	public void uploadFile(MultipartFile file, Date begindate, Date enddate, String empName) throws Exception {

		 
		String fileName = file.getOriginalFilename();
		
		String ext = fileName.substring(fileName.lastIndexOf("."), fileName.length());
		 
		
		
		String filename = getfilename(begindate, enddate, empName);
		String month = getmonth(begindate.getMonth());
		System.out.println("Month is " + month);
		int year = begindate.getYear() + 1900;
		
		

		File theDir = new File(pathoffolderfortimesheet + month + year);
		theDir.mkdir();
		Path newfile = Paths.get(pathoffolderfortimesheet + theDir.getName() + "//" + filename+ext);
		try {

			Files.write(newfile, file.getBytes());

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

	}

	
	private String getmonth(int month) {

		switch (month) {

		case 0:
			return "JANUARY";
		case 1:
			return "FEBRUARY";
		case 2:
			return "MARCH";
		case 3:
			return "APRIL";
		case 4:
			return "MAY";
		case 5:
			return "JUNE";
		case 6:
			return "JULY";
		case 7:
			return "AUGUST";
		case 8:
			return "SEPTEMBER";
		case 9:
			return "OCTOBER";
		case 10:
			return "NOVEMBER";
		case 11:
			return "DECEMBER";
		default:
			return null;

		}

	}

	private static String getfilename(Date begindate, Date enddate, String empName) {

		String filename = begindate.toInstant().toString().substring(0, 10) + "to"
				+ enddate.toInstant().toString().substring(0, 10) + empName;
		return filename;
	}
}

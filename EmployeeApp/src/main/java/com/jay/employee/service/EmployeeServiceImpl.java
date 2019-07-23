package com.jay.employee.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jay.employee.model.Employee;
import com.jay.employee.repo.EmployeeRepo;


@Service
public class EmployeeServiceImpl implements EmployeeService{
	
	@Autowired
	EmployeeRepo empRepo;
	
	public Employee getEmp(String empId) {
		
		Optional<Employee> emp = empRepo.findById(empId);
        
		if(emp.isPresent()) {
			return emp.get();
		}else {
			return null;
		}
	}
	
	public Employee saveEmployee(Employee emp) {
		
		String id = emp.generateId();

		while (empRepo.existsById(id)) {
			id = emp.generateId();
		}

		emp.setEmpId(id);
		
		System.out.println("generated empiD IS"+ emp.getEmpId());

		empRepo.save(emp);

		return emp;
		
		
	}
	
	public List<Employee> getEmployees(){
		
		List<Employee> li = empRepo.findAll();	
		return li;
	}

	@Override
	public boolean deleteEmployee(String empId) {
		// TODO Auto-generated method stub
	try {
		empRepo.deleteById(empId);
	}catch(Exception e) {
		return false;
	}
	return true;
}
	
	
	
	public Employee getempIdfromEmail(String userName) {
	
		Employee empId = empRepo.getempIdfromEmail(userName);
		if(empId == null) {
			System.out.println("this is null");
		}
		return empId;
	}

	@Override
	public Employee getEmployeeRate(String empId) {
		return empRepo.getEmployeeRatefromEmpId(empId);
	}

	@Override
	public Employee getEmployeeNamefromEmpId(String empId) {
		
		return empRepo.getEmployeeNamefromEmpId(empId);
	}
	

}

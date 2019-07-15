package com.jay.employee.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jay.employee.model.Employee;

@Service
public interface EmployeeService {

    Employee getEmp(String empId);
	Employee saveEmployee(Employee emp);
	List<Employee> getEmployees();
	boolean deleteEmployee(String empId);

}

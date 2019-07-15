package com.jay.employee.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.jay.employee.model.Employee;


@Repository
public interface EmployeeRepo extends MongoRepository<Employee, String> {
	
}

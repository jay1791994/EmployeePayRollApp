package com.jay.employee.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.jay.employee.model.Employee;


@Repository
public interface EmployeeRepo extends MongoRepository<Employee, String> {
	
	@Query(value="{ 'email' : ?0}", fields="{'empId':1}")
	Employee getempIdfromEmail(String email);

	@Query(value="{ '_id' : ?0}", fields="{'rate':1}")
	Employee getEmployeeRatefromEmpId(String empId);

	@Query(value="{ '_id' : ?0}", fields="{'empName':1}")
	Employee getEmployeeNamefromEmpId(String empId);
	

	
}

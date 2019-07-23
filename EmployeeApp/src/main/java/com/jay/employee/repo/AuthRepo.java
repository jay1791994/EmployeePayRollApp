package com.jay.employee.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.jay.employee.request.JwtRequest;
import com.jay.employee.request.UserCredentials;

@Repository
public interface AuthRepo extends MongoRepository<UserCredentials, String> {

	
	  @Query("{ 'username' : ?0}")
	  Optional<UserCredentials> findByUserName(String username);
	
}

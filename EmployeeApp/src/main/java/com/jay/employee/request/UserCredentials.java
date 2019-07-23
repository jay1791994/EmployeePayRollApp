package com.jay.employee.request;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("USER")
public class UserCredentials {
	
private static final long serialVersionUID = 5926468583005150707L;
	
    @Indexed(unique=true)
	private String username;
	private String password;
	private String role;
	
	
	//need default constructor for JSON Parsing
	public UserCredentials()
	{
		
	}

	public UserCredentials(String username, String password) {
		this.setUsername(username);
		this.setPassword(password);
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}

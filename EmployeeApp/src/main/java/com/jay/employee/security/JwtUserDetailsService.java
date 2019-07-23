package com.jay.employee.security;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jay.employee.repo.AuthRepo;
import com.jay.employee.request.JwtRequest;
import com.jay.employee.request.UserCredentials;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	
	@Autowired
	AuthRepo authRepo;
	
	
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		BCryptPasswordEncoder encoder = (BCryptPasswordEncoder) passwordEncoder();
		
		Optional<UserCredentials> admin = authRepo.findByUserName(username);
		
		if(admin.isPresent()) {
			
			UserCredentials adm = admin.get();
		
			String password = adm.getPassword() ;
			String role = adm.getRole();
			System.out.println("role given to user is "+ role);
			List<SimpleGrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority(role));
			
		    return new User(username, encoder.encode(password), authorities);
			
			
		}else {
			
			System.out.println(username);
			
			throw new UsernameNotFoundException("User not found with : " + username);
	}
		
	
	}
	
	
}



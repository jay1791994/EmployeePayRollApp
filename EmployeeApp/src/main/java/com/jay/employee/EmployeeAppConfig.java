package com.jay.employee;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;




@Configuration
public class EmployeeAppConfig  extends WebMvcConfigurationSupport  {
 
	@Override
	protected void	addCorsMappings(CorsRegistry registry) {
	   
		registry.addMapping("/**")
		.allowedMethods("*")
		.allowedOrigins("*");
        
	}
	
	
	
}




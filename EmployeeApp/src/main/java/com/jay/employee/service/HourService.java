package com.jay.employee.service;

import org.springframework.web.bind.annotation.RequestBody;

import com.jay.employee.request.Hours;
import com.jay.employee.request.HoursRequest;
import com.jay.employee.response.InvoiceResponse;

public interface HourService {
	
	public void addHours(Hours hrs);
	InvoiceResponse getHours(HoursRequest hrs);

}

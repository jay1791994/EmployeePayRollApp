package com.jay.employee.service;

import java.time.LocalDate;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import static org.springframework.data.mongodb.core.query.Criteria.where;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.jay.employee.request.HoursRequest;
import com.jay.employee.response.InvoiceResponse;
import com.jay.employee.model.Employee;
import com.jay.employee.request.Hours;
import com.mongodb.WriteResult;
import com.mongodb.client.result.UpdateResult;

@Service
public class HourServiceImpl implements HourService {

	@Autowired
	MongoTemplate mongoTemplate;
	
	@Autowired
	EmployeeService employeeService;


	public void addHours(Hours hrs) {

		Set<Entry<String, Double>> hourData = hrs.getHourMap().entrySet();

		Query query = new Query(Criteria.where("empId").is(hrs.getEmpId()));

		Update update = new Update();

		for (Entry<String, Double> entry : hourData) {

			System.out.println(entry.getKey().toString());

			update.set("hourMap." + entry.getKey(), entry.getValue());
		}

		mongoTemplate.upsert(query, update, Hours.class);

	}

	public InvoiceResponse getHours(HoursRequest hrs) {
		
		LocalDate myDate = hrs.getStartDate();
		LocalDate endDate = hrs.getEndDate();
		LocalDate startDate = hrs.getStartDate();

		Query query = new Query();
		query.addCriteria(new Criteria().where("_id").is(hrs.getEmpId()));

		int i = 0;
		while (myDate.compareTo(endDate) < 0) {
            
			
			myDate = startDate.plusDays(i);
			query.fields().include("hourMap." + myDate.toString());
			i++;

		}

		Hours queryHours = mongoTemplate.findOne(query, Hours.class);
		
		
		
		InvoiceResponse invoice = new InvoiceResponse();
		
		invoice.setEmpId(queryHours.getEmpId());
		invoice.setHourMap(queryHours.getHourMap());
		
		Employee empRate = employeeService.getEmployeeRate(hrs.getEmpId());
		
		
		
		double rate = empRate.getRate();
		
		double totalHours = 0 ;
		
		Set<Entry<String, Double>> hoursForgivenDates = queryHours.getHourMap().entrySet();
		
		for(Entry<String, Double> entry: hoursForgivenDates ) {
			totalHours = totalHours + entry.getValue();
		}
		
		double totalAmount = totalHours * rate ;
		
		invoice.setTotalHours(totalHours);
		invoice.setTotalAmount(totalAmount);
		
		return invoice;
		
		
	
	
	}

}
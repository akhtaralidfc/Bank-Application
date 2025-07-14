package com.example.AdminService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.AdminService.model.Customer;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Integer> {
	
}

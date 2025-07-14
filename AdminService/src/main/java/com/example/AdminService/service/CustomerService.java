package com.example.AdminService.service;

import com.example.AdminService.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import java.util.List;

@Service
public class CustomerService {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void addCustomer(Customer customer) {
        entityManager.persist(customer);
    }

    public Customer findCustomerByAccountNumber(int acNo) {
        return entityManager.find(Customer.class, acNo);
    }

    public List<Customer> findAllCustomers() {
        return entityManager.createQuery("SELECT c FROM Customer c", Customer.class).getResultList();
    }
}

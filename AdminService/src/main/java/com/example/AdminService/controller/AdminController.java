package com.example.AdminService.controller;

import com.example.AdminService.model.Customer;
import com.example.AdminService.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController // Indicates that this is a REST controller
public class AdminController {

    @Autowired
    private CustomerRepository customerRepository;

    // In-memory "database" for customers
    private final Map<Integer, Customer> customers = new HashMap<>();

    public AdminController() {
        // Initialize with some dummy data
        customers.put(1001, new Customer(1001, "Alice Smith", 5000.00));
        customers.put(1002, new Customer(1002, "Bob Johnson", 2500.75));
        customers.put(1003, new Customer(1003, "Charlie Brown", 100.50));
    }

    // Endpoint for adding a new customer
    @PostMapping("/customers")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) {
        //System.out.println("Heyyyyyyyyyyy");
        if (customers.containsKey(customer.getAcNo())) {
            return new ResponseEntity<>("Customer with account number " + customer.getAcNo() + " already exists.", HttpStatus.CONFLICT);
        }
        //customers.put(customer.getAcNo(), customer);
        try{
            customerRepository.save(customer);
        }
        catch (Exception e){
            return new ResponseEntity<>("Customer can't be created with account number: " + customer.getAcNo(), HttpStatus.BAD_REQUEST);
        }
        System.out.println("Customer added: " + customer);
        return new ResponseEntity<>(customer, HttpStatus.CREATED);
    }

    // Endpoint for listing all customers using DB
    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> listCustomers() {
        List<Customer> customerList = customerRepository.findAll(); // Fetch from DB
        System.out.println("Listing all customers. Count: " + customerList.size());
        return new ResponseEntity<>(customerList, HttpStatus.OK);
    }

    // Endpoint for searching a customer by account number using DB
    @GetMapping("/customers/{acNo}")
    public ResponseEntity<?> searchCustomer(@PathVariable int acNo) {
        Optional<Customer> customerOpt = customerRepository.findById(acNo); // Fetch by ID
        if (customerOpt.isEmpty()) {
            return new ResponseEntity<>("Customer not found with Account Number: " + acNo, HttpStatus.NOT_FOUND);
        }
        Customer customer = customerOpt.get();
        System.out.println("Customer found: " + customer);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    // Placeholder for authorization (for frontend to check if role is ADMIN)
    @GetMapping("/check-admin-access")
    public ResponseEntity<String> checkAdminAccess() {
        // In a real app, you'd validate a JWT here and check roles
        return ResponseEntity.ok("Admin access granted (mock check)");
    }
}
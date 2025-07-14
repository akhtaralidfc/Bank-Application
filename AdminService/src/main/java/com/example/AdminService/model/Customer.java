package com.example.AdminService.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="customers")
public class Customer {
    @Id
    private int acNo;
    private String name;
    private double balance;

    public Customer() {
    }

    public Customer(int acNo, String name, double balance) {
        this.acNo = acNo;
        this.name = name;
        this.balance = balance;
    }

    public int getAcNo() {
        return acNo;
    }

    public void setAcNo(int acNo) {
        this.acNo = acNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}
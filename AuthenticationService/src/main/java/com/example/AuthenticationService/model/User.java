package com.example.AuthenticationService.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    private String username;

    private String password;

    private String role;

    // Getters and setters
}

package com.example.AuthenticationService.controller;

import com.example.AuthenticationService.model.User;
import com.example.AuthenticationService.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return authService.login(user.getUsername(), user.getPassword());
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        System.out.println("hryyyyy");
        return authService.register(user);
    }
}

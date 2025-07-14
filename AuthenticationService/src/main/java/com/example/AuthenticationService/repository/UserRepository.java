package com.example.AuthenticationService.repository;

import com.example.AuthenticationService.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository  extends JpaRepository<User, String> {
    User findByUsername(String username);
}
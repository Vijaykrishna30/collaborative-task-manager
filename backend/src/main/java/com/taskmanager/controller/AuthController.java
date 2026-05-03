package com.taskmanager.controller;

import com.taskmanager.dto.LoginRequest;
import com.taskmanager.dto.UserRequest;
import com.taskmanager.entity.User;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRequest request) {
        try {
            User user = userService.create(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createAuthResponse(user));
        } catch (IllegalArgumentException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.ok(createAuthResponse(user));
            }
        }
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", "Invalid credentials");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    private Map<String, Object> createAuthResponse(User user) {
        Map<String, Object> response = new HashMap<>();
        response.put("token", "dummy-jwt-token-for-dev-" + user.getId());
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole().name());
        return response;
    }
}

package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.common.AuthRequest;
import com.duckdzung.recruitmentsystem.repository.TokenRepository;
import com.duckdzung.recruitmentsystem.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private TokenRepository<?> tokenRepository;

    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@RequestBody AuthRequest loginRequest) {
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(200)
                .message("Login successfully")
                .data(authService.login(loginRequest))
                .build(), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseObject> signUp(@RequestBody AuthRequest signUpRequest) {
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(201)
                .message("Member registered successfully")
                .data(authService.signUp(signUpRequest))
                .build(), HttpStatus.CREATED);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ResponseObject> refreshToken(@RequestHeader("Authorization") String authorization) {
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(200)
                .message("Token refreshed successfully")
                .data(authService.refreshToken(authorization.replace("Bearer ", "")))
                .build(), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseObject> logout(@RequestHeader("Authorization") String authorization) {
        authService.logout(authorization.replace("Bearer ", ""));
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(200)
                .message("Logout successfully")
                .data(null)
                .build(), HttpStatus.OK);
    }

    @PostMapping("/validate-token")
    public ResponseEntity<Boolean> validateToken(@RequestHeader("Authorization") String authorization){
        String token = authorization.replace("Bearer ", "");
        Boolean isValid = tokenRepository.isTokenValid(token);
        return ResponseEntity.ok().body(isValid);
    }

    @PostMapping("/admin-register")
    public ResponseEntity<ResponseObject> adminSignUp(@RequestBody AuthRequest signUpRequest) {
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(201)
                .message("Admin registered successfully")
                .data(authService.createAdmin(signUpRequest))
                .build(), HttpStatus.CREATED);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok().body("Test");
    }
}

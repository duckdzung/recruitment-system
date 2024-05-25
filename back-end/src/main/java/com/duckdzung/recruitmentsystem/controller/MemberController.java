package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.common.AuthRequest;
import com.duckdzung.recruitmentsystem.security.jwt.JwtService;
import com.duckdzung.recruitmentsystem.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
public class MemberController {
    @Autowired
    private AuthService authService;
    @Autowired
    private JwtService jwtService;

    @PutMapping
    public ResponseEntity<ResponseObject> update(@RequestHeader("Authorization") String authorization, @RequestBody AuthRequest updateRequest) {
        String id = jwtService.extractUserIdFromToken(authorization);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(200)
                .message("Member updated successfully")
                .data(authService.updateMember(id, updateRequest))
                .build(), HttpStatus.OK);
    }
}

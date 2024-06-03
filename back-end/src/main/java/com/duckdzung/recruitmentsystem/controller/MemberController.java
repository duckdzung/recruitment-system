package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.common.AuthRequest;
import com.duckdzung.recruitmentsystem.security.jwt.JwtService;
import com.duckdzung.recruitmentsystem.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/members")
public class MemberController {
    @Autowired
    private AuthService authService;
    @Autowired
    private JwtService jwtService;

    @PostMapping
    public ResponseEntity<ResponseObject> update(@RequestHeader("Authorization") String authorization, @RequestBody AuthRequest updateRequest) {
        String id = jwtService.extractUserIdFromToken(authorization);
        String updateResult = authService.updateMember(id, updateRequest);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(200)
                .message(updateResult)
                .build(), HttpStatus.OK);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<ResponseObject> approve(@PathVariable String id) {
        authService.approveMemberUpgrade(id);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(200)
                .message("Enterprise approved successfully")
                .data(null)
                .build(), HttpStatus.OK);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<ResponseObject> reject(@PathVariable String id) {
        authService.rejectMemberUpgrade(id);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(200)
                .message("Enterprise rejected successfully")
                .data(null)
                .build(), HttpStatus.OK);
    }
}

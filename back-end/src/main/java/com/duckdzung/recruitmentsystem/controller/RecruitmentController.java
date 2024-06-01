package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.RecruitmentFormRequest;
import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.security.jwt.JwtService;
import com.duckdzung.recruitmentsystem.service.RecruitmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/recruitments")
public class RecruitmentController {
    @Autowired
    private RecruitmentService recruitmentService;
    @Autowired
    private JwtService jwtService;

    @PostMapping
    public ResponseEntity<ResponseObject> createRecruitment(@RequestHeader("Authorization") String authorization, @RequestBody RecruitmentFormRequest recruitmentFormRequest) {
        String memberId = jwtService.extractUserIdFromToken(authorization);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(201)
                        .message("Recruitment created successfully")
                        .data(recruitmentService.createRecruitmentInformation(memberId, recruitmentFormRequest))
                        .build()
        );
    }

}

package com.duckdzung.recruitmentsystem.controller;


import com.duckdzung.recruitmentsystem.common.ApplicationRequest;
import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.security.jwt.JwtService;
import com.duckdzung.recruitmentsystem.service.ApplicationFormService;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/application-form")
public class ApplicationFormController {
    private final ApplicationFormService applicationFormService;
    private final JwtService jwtService;

    public ApplicationFormController(ApplicationFormService applicationFormService, JwtService jwtService) {
        this.applicationFormService = applicationFormService;
        this.jwtService = jwtService;
    }

    @PostMapping
    public ResponseEntity<ResponseObject> createApplicationForm(
            @RequestBody ApplicationRequest applicationRequest
    ) {
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(201)
                        .message("Application form created successfully")
                        .data(applicationFormService.createApplicationForm(applicationRequest))
                        .build()
        );
    }

    @PutMapping
    public ResponseEntity<ResponseObject> processApplicationForm(
            @RequestHeader("Authorization") String token,
            @RequestBody ApplicationRequest applicationRequest
    ) {
        String staffId = jwtService.extractUserIdFromToken(token);
        applicationFormService.processApplicationForm(staffId, applicationRequest);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Application form processed successfully")
                        .data(null)
                        .build()
        );
    }

    @DeleteMapping
    public ResponseEntity<ResponseObject> deleteApplicationForm(
            @RequestParam int recruitId,
            @RequestParam int nomineeId,
            @RequestParam int profileId
    ) {
        applicationFormService.deleteApplicationForm(recruitId, nomineeId, profileId);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Application form deleted successfully")
                        .data(null)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ResponseObject> getApplicationForm(
            @RequestParam int recruitId,
            @RequestParam int nomineeId,
            @RequestParam int profileId
    ) {
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Application form retrieved successfully")
                        .data(applicationFormService.getApplicationForm(recruitId, nomineeId, profileId))
                        .build()
        );
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseObject> getAllApplicationForms(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("All application forms retrieved successfully")
                        .data(applicationFormService.getAllApplicationForms(PageRequest.of(page, size)))
                        .build()
        );
    }

}

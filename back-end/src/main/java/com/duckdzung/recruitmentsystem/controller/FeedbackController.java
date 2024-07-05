package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.model.FeedbackForm;
import com.duckdzung.recruitmentsystem.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<ResponseObject> sendFeedback(@RequestBody FeedbackForm feedbackForm) {
        emailService.sendFeedback(feedbackForm);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(200)
                .message("Feedback sent successfully!")
                .data(null)
                .build(), HttpStatus.OK
        );
    }
}
package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.model.FeedbackForm;
import com.duckdzung.recruitmentsystem.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<ResponseObject> sendFeedback(@RequestBody FeedbackForm feedbackForm) throws MessagingException, IOException {
        emailService.sendFeedback(feedbackForm);
        return new ResponseEntity<>(ResponseObject.builder()
                .statusCode(200)
                .message("Feedback sent successfully!")
                .data(null)
                .build(), HttpStatus.OK
        );
    }
}
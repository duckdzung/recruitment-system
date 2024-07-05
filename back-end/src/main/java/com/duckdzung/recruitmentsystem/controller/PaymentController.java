package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.PaymentConfirmRequest;
import com.duckdzung.recruitmentsystem.common.PaymentCreateRequest;
import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<ResponseObject> createPayment(@RequestBody PaymentCreateRequest paymentCreateRequest) throws StripeException {
        return ResponseEntity.ok(ResponseObject.builder()
                .statusCode(200)
                .message("Payment intent created successfully")
                .data(paymentService.createPaymentIntent(paymentCreateRequest))
                .build());
    }

    @PostMapping("/confirm")
    public ResponseEntity<ResponseObject> confirmPayment(@RequestBody PaymentConfirmRequest paymentConfirmRequest) {
        return ResponseEntity.ok(ResponseObject.builder()
                .statusCode(200)
                .message("Payment intent confirmed successfully")
                .data(paymentService.confirmPaymentIntent(paymentConfirmRequest))
                .build());
    }
}
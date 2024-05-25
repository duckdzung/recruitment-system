package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<ResponseObject> createPayment(@RequestParam Long amount, @RequestParam String currency) throws StripeException {
        return ResponseEntity.ok(ResponseObject.builder()
                .statusCode(200)
                .message("Payment intent created successfully")
                .data(paymentService.createPaymentIntent(amount, currency))
                .build());
    }

    @PostMapping("/confirm")
    public ResponseEntity<ResponseObject> confirmPayment(@RequestParam String paymentIntentId, @RequestParam String paymentMethodId) throws StripeException {
        return ResponseEntity.ok(ResponseObject.builder()
                .statusCode(200)
                .message("Payment intent confirmed successfully")
                .data(paymentService.confirmPaymentIntent(paymentIntentId, paymentMethodId))
                .build());
    }
}
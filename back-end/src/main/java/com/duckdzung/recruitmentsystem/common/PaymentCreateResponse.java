package com.duckdzung.recruitmentsystem.common;

import com.duckdzung.recruitmentsystem.model.Payment;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PaymentCreateResponse {
    Payment payment;
    PaymentIntentResponse paymentIntentResponse;
}

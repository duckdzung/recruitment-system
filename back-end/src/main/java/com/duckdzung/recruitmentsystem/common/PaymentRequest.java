package com.duckdzung.recruitmentsystem.common;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PaymentRequest {
    Long amount;
    String currency;
    String paymentMethodId;
    String paymentIntentId;
}

package com.duckdzung.recruitmentsystem.common;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PaymentIntentResponse {
    String id;
    String clientSecret;
    Long amount;
    String currency;
    String status;
}

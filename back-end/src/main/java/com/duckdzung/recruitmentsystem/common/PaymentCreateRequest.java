package com.duckdzung.recruitmentsystem.common;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PaymentCreateRequest {
    Long amount;
    String currency;
    Boolean isFullPayment;
    int recruitId;
}

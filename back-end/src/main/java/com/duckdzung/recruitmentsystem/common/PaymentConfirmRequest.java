package com.duckdzung.recruitmentsystem.common;

import com.duckdzung.recruitmentsystem.model.enums.PaymentMethod;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PaymentConfirmRequest {
    int paymentId;
    Long paymentAmount;
    PaymentMethod paymentMethod;

}

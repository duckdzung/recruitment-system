package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.common.PaymentIntentResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    public PaymentIntentResponse createPaymentIntent(Long amount, String currency) throws StripeException {
        PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
                .setAmount(amount)
                .setCurrency(currency)
                .setDescription("Payment for recruitment system")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .setAllowRedirects(PaymentIntentCreateParams.AutomaticPaymentMethods.AllowRedirects.NEVER)
                                .build()
                )
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(createParams);
        return PaymentIntentResponse.builder()
                .id(paymentIntent.getId())
                .clientSecret(paymentIntent.getClientSecret())
                .amount(paymentIntent.getAmount())
                .currency(paymentIntent.getCurrency())
                .status(paymentIntent.getStatus())
                .build();
    }

    public PaymentIntentResponse confirmPaymentIntent(String paymentIntentId, String paymentMethodId) throws StripeException {
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        Map<String, Object> params = new HashMap<>();
        params.put("payment_method", paymentMethodId);
        paymentIntent = paymentIntent.confirm(params);
        return PaymentIntentResponse.builder()
                .id(paymentIntent.getId())
                .clientSecret(paymentIntent.getClientSecret())
                .amount(paymentIntent.getAmount())
                .currency(paymentIntent.getCurrency())
                .status(paymentIntent.getStatus())
                .build();
    }
}

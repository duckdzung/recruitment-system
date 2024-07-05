package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.common.PaymentConfirmRequest;
import com.duckdzung.recruitmentsystem.common.PaymentCreateRequest;
import com.duckdzung.recruitmentsystem.common.PaymentCreateResponse;
import com.duckdzung.recruitmentsystem.common.PaymentIntentResponse;
import com.duckdzung.recruitmentsystem.exception.InvalidRequestException;
import com.duckdzung.recruitmentsystem.exception.ResourceNotFoundException;
import com.duckdzung.recruitmentsystem.model.Payment;
import com.duckdzung.recruitmentsystem.model.PaymentDetails;
import com.duckdzung.recruitmentsystem.model.RecruitmentInformation;
import com.duckdzung.recruitmentsystem.model.enums.PaymentStatus;
import com.duckdzung.recruitmentsystem.repository.PaymentDetailsRepository;
import com.duckdzung.recruitmentsystem.repository.PaymentRepository;
import com.duckdzung.recruitmentsystem.repository.RecruitmentInformationRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.transaction.Transactional;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PaymentService {

    private final String PUBLISHABLE_KEY;
    private final PaymentRepository paymentRepository;
    private final PaymentDetailsRepository paymentDetailsRepository;
    private final RecruitmentInformationRepository recruitmentInformationRepository;

    public PaymentService(Environment environment, PaymentRepository paymentRepository, PaymentDetailsRepository paymentDetailsRepository, RecruitmentInformationRepository recruitmentInformationRepository) {
        PUBLISHABLE_KEY = environment.getProperty("application.stripe.publishableKey");
        this.paymentRepository = paymentRepository;
        this.paymentDetailsRepository = paymentDetailsRepository;
        this.recruitmentInformationRepository = recruitmentInformationRepository;
    }

    public PaymentCreateResponse createPaymentIntent(PaymentCreateRequest paymentCreateRequest) throws StripeException {
        PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
                .setAmount(paymentCreateRequest.getAmount())
                .setCurrency(paymentCreateRequest.getCurrency())
                .setDescription("Payment for recruitment system")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .setAllowRedirects(PaymentIntentCreateParams.AutomaticPaymentMethods.AllowRedirects.NEVER)
                                .build()
                )
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(createParams);

        RecruitmentInformation recruitmentInformation = recruitmentInformationRepository.findById(paymentCreateRequest.getRecruitId()).orElseThrow(
                () -> new ResourceNotFoundException("Recruitment information not found")
        );

        Payment payment = Payment.builder()
                .totalPayment(BigDecimal.valueOf(paymentCreateRequest.getAmount()))
                .isFullPayment(paymentCreateRequest.getIsFullPayment())
                .paymentStatus(PaymentStatus.UNPAID)
                .recruitmentInformation(recruitmentInformation)
                .build();

        paymentRepository.save(payment);

        return PaymentCreateResponse.builder()
                .payment(payment)
                .paymentIntentResponse(PaymentIntentResponse.builder()
                        .id(paymentIntent.getId())
                        .clientSecret(paymentIntent.getClientSecret())
                        .publishableKey(PUBLISHABLE_KEY)
                        .amount(paymentIntent.getAmount())
                        .currency(paymentIntent.getCurrency())
                        .status(paymentIntent.getStatus())
                        .build())
                .build();
    }

    @Transactional
    public PaymentDetails confirmPaymentIntent(PaymentConfirmRequest paymentConfirmRequest) {
        Payment payment = paymentRepository.findById(paymentConfirmRequest.getPaymentId()).orElseThrow(
                () -> new ResourceNotFoundException("Payment not found")
        );
        if (payment == null) {
            throw new ResourceNotFoundException("Payment not found");
        }
        if (payment.getPaymentStatus() == PaymentStatus.PAID) {
            throw new InvalidRequestException("Payment already paid");
        }

        payment.setPaymentStatus(PaymentStatus.PAID);

        PaymentDetails paymentDetails = PaymentDetails.builder()
                .payment(payment)
                .paymentAmount(BigDecimal.valueOf(paymentConfirmRequest.getPaymentAmount()))
                .paymentMethod(paymentConfirmRequest.getPaymentMethod())
                .phase(0)
                .build();

        return paymentDetailsRepository.save(paymentDetails);
    }
}

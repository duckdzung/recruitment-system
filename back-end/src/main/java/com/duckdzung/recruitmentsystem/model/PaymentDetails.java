package com.duckdzung.recruitmentsystem.model;

import com.duckdzung.recruitmentsystem.model.enums.PaymentMethod;
import com.duckdzung.recruitmentsystem.model.idClass.PaymentDetailsKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "payment_details")
@IdClass(PaymentDetailsKey.class)
public class PaymentDetails {
    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "payment_id", nullable = false)
    Payment payment;

    @Id
    @Column(nullable = false)
    Integer phase;

    // Payment amount
    BigDecimal paymentAmount;

    // Payment date
    @Column(nullable = false)
    LocalDateTime paymentDate;

    // Payment method
    @Column(length = 30, nullable = false)
    @Enumerated(EnumType.STRING)
    PaymentMethod paymentMethod;

}

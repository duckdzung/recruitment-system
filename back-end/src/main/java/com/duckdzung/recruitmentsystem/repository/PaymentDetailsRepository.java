package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.PaymentDetails;
import com.duckdzung.recruitmentsystem.model.idClass.PaymentDetailsKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails, PaymentDetailsKey> {
}

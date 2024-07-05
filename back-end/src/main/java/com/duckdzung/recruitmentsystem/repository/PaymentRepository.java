package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}

package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Nominee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NomineeRepository extends JpaRepository<Nominee, Integer> {
    boolean existsByPosition(String position);
    Nominee findByPosition(String position);
}

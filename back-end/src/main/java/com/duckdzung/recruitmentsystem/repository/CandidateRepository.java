package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, String> {
    Optional<Candidate> findFirstByIdStartsWithOrderByIdDesc(String prefix);
}
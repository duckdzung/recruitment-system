package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.UpgradeRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UpgradeRequestRepository extends JpaRepository<UpgradeRequest, Integer> {
}

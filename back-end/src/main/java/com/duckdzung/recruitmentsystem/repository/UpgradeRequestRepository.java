package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.UpgradeRequest;
import com.duckdzung.recruitmentsystem.model.enums.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UpgradeRequestRepository extends JpaRepository<UpgradeRequest, Integer> {
    Page<UpgradeRequest> findAllByRole(Role role, Pageable pageable);
}

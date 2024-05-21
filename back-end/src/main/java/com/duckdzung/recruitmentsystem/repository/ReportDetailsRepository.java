package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.ReportDetails;
import com.duckdzung.recruitmentsystem.model.idClass.ReportDetailsKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportDetailsRepository extends JpaRepository<ReportDetails, ReportDetailsKey> {
}

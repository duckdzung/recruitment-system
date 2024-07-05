package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Enterprise;
import com.duckdzung.recruitmentsystem.model.Report;
import com.duckdzung.recruitmentsystem.model.ReportDetails;
import com.duckdzung.recruitmentsystem.model.idClass.ReportDetailsKey;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportDetailsRepository extends JpaRepository<ReportDetails, ReportDetailsKey> {
    Page<ReportDetails> findAllByReport(Report report, Pageable pageable);

    ReportDetails findByReportAndEnterprise(Report report, Enterprise enterprise);
}

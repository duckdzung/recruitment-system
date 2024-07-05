package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.common.ReportDetailsRequest;
import com.duckdzung.recruitmentsystem.exception.ResourceNotFoundException;
import com.duckdzung.recruitmentsystem.model.Enterprise;
import com.duckdzung.recruitmentsystem.model.Report;
import com.duckdzung.recruitmentsystem.model.ReportDetails;
import com.duckdzung.recruitmentsystem.model.enums.ReportStatus;
import com.duckdzung.recruitmentsystem.repository.EnterpriseRepository;
import com.duckdzung.recruitmentsystem.repository.ReportDetailsRepository;
import com.duckdzung.recruitmentsystem.repository.ReportRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final ReportDetailsRepository reportDetailsRepository;
    private final EnterpriseRepository enterpriseRepository;

    public ReportService(ReportRepository reportRepository, ReportDetailsRepository reportDetailsRepository, EnterpriseRepository enterpriseRepository) {
        this.reportRepository = reportRepository;
        this.reportDetailsRepository = reportDetailsRepository;
        this.enterpriseRepository = enterpriseRepository;
    }

    @Transactional
    public Page<ReportDetails> getReportByMonthAndYear(int month, int year, Pageable pageable) {
        Report report = reportRepository.findByDate_MonthAndDate_Year(month, year);
        if (report == null) {
            report = new Report();
            report.setDate(LocalDate.of(year, month, 1));
            reportRepository.save(report);
        }

        // get Enterprises with dateOfExpiration is within a month
        Report finalReport = report;

        List<Enterprise> enterprises = enterpriseRepository.findEnterpriseWithExpirationDateWithinAMonth(month, year);
        List<ReportDetails> reportDetails = enterprises
                .stream()
                .map(enterprise -> ReportDetails.builder()
                        .report(finalReport)
                        .enterprise(enterprise)
                        .build())
                .filter(rd -> reportDetailsRepository.findByReportAndEnterprise(rd.getReport(), rd.getEnterprise()) == null)
                .toList();

        reportDetailsRepository.saveAll(reportDetails);

        return reportDetailsRepository.findAllByReport(report, pageable);
    }

    @Transactional
    public void updateReportDetailsAsPresident(ReportDetailsRequest reportDetailsRequest) {
        Report report = reportRepository.findById(reportDetailsRequest.getReportId()).orElseThrow(() -> new ResourceNotFoundException("Report not found"));
        Enterprise enterprise = enterpriseRepository.findByEnterpriseId(reportDetailsRequest.getEnterpriseId()).orElseThrow(() -> new ResourceNotFoundException("Enterprise not found"));
        ReportDetails existingReportDetails = reportDetailsRepository.findByReportAndEnterprise(report, enterprise);
        if (existingReportDetails == null) {
            throw new ResourceNotFoundException("ReportDetails not found");
        }
        if (reportDetailsRequest.getIsPotential() != null) {
            existingReportDetails.setIsPotential(reportDetailsRequest.getIsPotential());
        } else if (reportDetailsRequest.getIsGreatPotential() != null) {
            existingReportDetails.setIsGreatPotential(reportDetailsRequest.getIsGreatPotential());
        }
        if (reportDetailsRequest.getStrategy() != null) {
            existingReportDetails.setStrategy(reportDetailsRequest.getStrategy());
        }
        if (reportDetailsRequest.getReportStatus() == ReportStatus.FAILED && existingReportDetails.getReportStatus() == ReportStatus.IN_PROGRESS) {
            existingReportDetails.setReportStatus(reportDetailsRequest.getReportStatus());
        }

        reportDetailsRepository.save(existingReportDetails);
    }

    @Transactional
    public void updateReportDetailsAsStaff(ReportDetailsRequest reportDetailsRequest) {
        Report report = reportRepository.findById(reportDetailsRequest.getReportId()).orElseThrow(() -> new ResourceNotFoundException("Report not found"));
        Enterprise enterprise = enterpriseRepository.findByEnterpriseId(reportDetailsRequest.getEnterpriseId()).orElseThrow(() -> new ResourceNotFoundException("Enterprise not found"));
        ReportDetails existingReportDetails = reportDetailsRepository.findByReportAndEnterprise(report, enterprise);
        if (existingReportDetails == null) {
            throw new ResourceNotFoundException("ReportDetails not found");
        }

        if (reportDetailsRequest.getReportStatus() != null && existingReportDetails.getReportStatus() == ReportStatus.IN_PROGRESS) {
            existingReportDetails.setReportStatus(reportDetailsRequest.getReportStatus());
        }

        reportDetailsRepository.save(existingReportDetails);
    }
}

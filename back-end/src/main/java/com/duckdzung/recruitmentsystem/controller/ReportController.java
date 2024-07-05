package com.duckdzung.recruitmentsystem.controller;

import com.duckdzung.recruitmentsystem.common.ReportDetailsRequest;
import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.duckdzung.recruitmentsystem.model.ReportDetails;
import com.duckdzung.recruitmentsystem.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;
    @Autowired
    private PagedResourcesAssembler<ReportDetails> pagedResourcesAssembler;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping
    public ResponseEntity<ResponseObject> getAllReports(
            @RequestParam int month,
            @RequestParam int year,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ReportDetails> reports = reportService.getReportByMonthAndYear(month, year, Pageable.ofSize(size).withPage(page));
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("Reports retrieved successfully")
                        .data(pagedResourcesAssembler.toModel(reports))
                        .build()
        );
    }

    @PutMapping
    public ResponseEntity<ResponseObject> updateReportDetailsAsPresident(@RequestBody ReportDetailsRequest reportDetailsRequest) {
        reportService.updateReportDetailsAsPresident(reportDetailsRequest);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("ReportDetails updated successfully")
                        .build()
        );
    }

    @PatchMapping
    public ResponseEntity<ResponseObject> updateReportDetailsAsStaff(@RequestBody ReportDetailsRequest reportDetailsRequest) {
        reportService.updateReportDetailsAsStaff(reportDetailsRequest);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(200)
                        .message("ReportDetails updated successfully")
                        .build()
        );
    }
}

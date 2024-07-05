package com.duckdzung.recruitmentsystem.common;

import com.duckdzung.recruitmentsystem.model.enums.ReportStatus;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ReportDetailsRequest {
    int reportId;
    String enterpriseId;
    Boolean isPotential;
    Boolean isGreatPotential;
    String strategy;
    ReportStatus reportStatus;

}

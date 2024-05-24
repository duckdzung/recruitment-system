package com.duckdzung.recruitmentsystem.model;

import com.duckdzung.recruitmentsystem.model.idClass.ReportDetailsKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "report_details")
@IdClass(ReportDetailsKey.class)
public class ReportDetails {
    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "report_id", nullable = false)
    Report report;

    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    Enterprise enterprise;

    // If the enterprise is potential
    Boolean isPotential;

    // If the enterprise is great potential
    Boolean isGreatPotential;

    @Column(length = 50)
    String strategy;
}

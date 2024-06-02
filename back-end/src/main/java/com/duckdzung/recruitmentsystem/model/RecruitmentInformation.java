package com.duckdzung.recruitmentsystem.model;


import com.duckdzung.recruitmentsystem.model.enums.TimePeriodType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "recruitment_info")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RecruitmentInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int recruitId;
    @Column(nullable = false)
    TimePeriodType timePeriod;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    Enterprise enterprise;

}

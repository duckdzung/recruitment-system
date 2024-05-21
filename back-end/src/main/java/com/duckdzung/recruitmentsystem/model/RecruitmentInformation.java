package com.duckdzung.recruitmentsystem.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "recruitment_info")
public class RecruitmentInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int recruitId;
    @Column(nullable = false)
    LocalDateTime deadline;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    Enterprise enterprise;

}

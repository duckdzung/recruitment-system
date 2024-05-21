package com.duckdzung.recruitmentsystem.model;

import com.duckdzung.recruitmentsystem.model.idClass.RecruitmentDetailsKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recruitment_details")
@IdClass(RecruitmentDetailsKey.class)
public class RecruitmentDetails {

    @Column(nullable = false)
    int quantity;
    @Column(length = 50)
    String requiredInfo;
    @Id
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recruit_id", nullable = false)
    RecruitmentInformation recruitmentInformation;
    @Id
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "nominee_id", nullable = false)
    Nominee nominee;
}

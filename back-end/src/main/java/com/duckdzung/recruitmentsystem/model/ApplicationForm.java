package com.duckdzung.recruitmentsystem.model;

import com.duckdzung.recruitmentsystem.model.idClass.ApplicationFormKey;
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
@Table(name = "application_form")
@IdClass(ApplicationFormKey.class)
public class ApplicationForm {
    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "nominee_id", nullable = false)
    Nominee nominee;

    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recruit_id", nullable = false)
    RecruitmentInformation recruitmentInformation;

    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "profile_id", nullable = false)
    Profile profile;

    // Application form status
    @Builder.Default
    Boolean isProcessed = false;

    // The staff who processed the application form
    String processedBy;

    // If the application form is responded by the enterprise
    @Builder.Default
    Boolean isResponded = false;

}

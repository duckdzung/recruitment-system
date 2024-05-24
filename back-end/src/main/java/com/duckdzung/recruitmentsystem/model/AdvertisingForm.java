package com.duckdzung.recruitmentsystem.model;

import com.duckdzung.recruitmentsystem.model.enums.AdvertisingType;
import com.duckdzung.recruitmentsystem.model.idClass.AdvertisingFormKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "advertising_form")
@IdClass(AdvertisingFormKey.class)
public class AdvertisingForm {


    // Recruitment method
    @Enumerated(EnumType.STRING)
    @Column(length = 30, nullable = false)
    AdvertisingType advertisingType;

    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recruit_id", nullable = false)
    RecruitmentInformation recruitmentInformation;

    @Id
    @Column(nullable = false)
    LocalDateTime recruitmentTime;
}

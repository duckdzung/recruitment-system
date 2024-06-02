package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.AdvertisingForm;
import com.duckdzung.recruitmentsystem.model.RecruitmentInformation;
import com.duckdzung.recruitmentsystem.model.enums.AdvertisingType;
import com.duckdzung.recruitmentsystem.model.idClass.AdvertisingFormKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface AdvertisingFormRepository extends JpaRepository<AdvertisingForm, AdvertisingFormKey> {
    boolean existsByRecruitmentInformationAndRecruitmentTimeAndAdvertisingType(RecruitmentInformation recruitmentInformation, LocalDateTime recruitmentTime, AdvertisingType advertisingType);
    AdvertisingForm findByRecruitmentInformation(RecruitmentInformation recruitmentInformation);
}

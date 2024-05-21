package com.duckdzung.recruitmentsystem.model.idClass;

import com.duckdzung.recruitmentsystem.model.RecruitmentInformation;

import java.io.Serializable;
import java.time.LocalDateTime;

public class AdvertisingFormKey implements Serializable {
    // Recruitment ID
    RecruitmentInformation recruitmentInformation;
    // Datetime of recruitment launched
    LocalDateTime recruitmentTime;
}

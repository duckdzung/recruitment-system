package com.duckdzung.recruitmentsystem.model.idClass;

import com.duckdzung.recruitmentsystem.model.Nominee;
import com.duckdzung.recruitmentsystem.model.RecruitmentInformation;

import java.io.Serializable;


public class RecruitmentDetailsKey implements Serializable {
    RecruitmentInformation recruitmentInformation;
    Nominee nominee;
}

package com.duckdzung.recruitmentsystem.common;

import com.duckdzung.recruitmentsystem.model.AdvertisingForm;
import com.duckdzung.recruitmentsystem.model.RecruitmentDetails;
import lombok.Builder;
import lombok.Value;

import java.io.Serializable;

@Value
@Builder
public class RecruitmentFormRequest implements Serializable {
    RecruitmentDetails recruitmentDetails;
    AdvertisingForm advertisingForm;
}

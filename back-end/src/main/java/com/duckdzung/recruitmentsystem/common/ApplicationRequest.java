package com.duckdzung.recruitmentsystem.common;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ApplicationRequest {
    int nomineeId;
    int recruitId;
    Integer profileId;

}

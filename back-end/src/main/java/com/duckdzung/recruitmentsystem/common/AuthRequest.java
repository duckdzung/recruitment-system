package com.duckdzung.recruitmentsystem.common;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AuthRequest {
    private String username;
    private String password;
    private String email;
    private String phoneNum;
    private String address;
    private String name;
    private String companyName;
    private String companyRepresentative;
    private String taxCode;
    private String accessToken;
    private String refreshToken;
}

package com.duckdzung.recruitmentsystem.common;

import com.duckdzung.recruitmentsystem.model.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TokenResponse {
    String username;
    Role role;
    String accessToken;
    String refreshToken;
    Date issuedAt;
    Date expirationTime;
}

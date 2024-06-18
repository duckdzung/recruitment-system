package com.duckdzung.recruitmentsystem.common;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenRequest {
    String refreshToken;
}

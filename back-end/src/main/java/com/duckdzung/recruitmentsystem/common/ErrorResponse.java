package com.duckdzung.recruitmentsystem.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ErrorResponse {

    private int statusCode;
    
    private String message;

    public ErrorResponse(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

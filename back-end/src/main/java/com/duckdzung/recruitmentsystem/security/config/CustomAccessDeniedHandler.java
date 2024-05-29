package com.duckdzung.recruitmentsystem.security.config;

import com.duckdzung.recruitmentsystem.common.ResponseObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper;

    public CustomAccessDeniedHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");

        ResponseObject responseBody = ResponseObject.builder()
                .statusCode(HttpServletResponse.SC_FORBIDDEN)
                .message("Access denied")
                .data(null)
                .build();

        response.getWriter().write(objectMapper.writeValueAsString(responseBody));
    }
}

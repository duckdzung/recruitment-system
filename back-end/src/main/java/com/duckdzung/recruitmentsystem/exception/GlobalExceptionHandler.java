package com.duckdzung.recruitmentsystem.exception;

import com.duckdzung.recruitmentsystem.common.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public @ResponseBody ErrorResponse handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
    }

    @ExceptionHandler(InvalidRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public @ResponseBody ErrorResponse handleInvalidRequestException(InvalidRequestException ex) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public @ResponseBody ErrorResponse handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        return new ErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage());
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public @ResponseBody ErrorResponse handleUnauthorizedException(UnauthorizedException ex) {
        return new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), ex.getMessage());
    }

    @ExceptionHandler(InternalServerErrorException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public @ResponseBody ErrorResponse handleInternalServerErrorException(InternalServerErrorException ex) {
        return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
    }
}

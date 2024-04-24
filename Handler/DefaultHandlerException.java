package com.marketin.main.Handler;

import com.marketin.main.Exception.ApiError;
import com.marketin.main.Exception.DniNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class DefaultHandlerException  extends ResponseEntityExceptionHandler
{
    @ExceptionHandler
    public ResponseEntity<Object> usuarioNotFoundException(DniNotFoundException ex){

        ApiError apiError = ApiError.builder()
                .message(ex.getMessage())
                .httpStatus(HttpStatus.BAD_REQUEST)
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
    }
}

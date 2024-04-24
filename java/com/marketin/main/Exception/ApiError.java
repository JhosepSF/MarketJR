package com.marketin.main.Exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiError 
{
    private HttpStatus httpStatus;
    private String message;
    
	public HttpStatus getHttpStatus() {
		return httpStatus;
	}
	public void setHttpStatus(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}

	private ApiError() {
    }
	
	// Método estático para obtener una instancia del builder
    public static Builder builder() {
        return new Builder();
    }

    // Clase interna estática para construir instancias de ApiError
    public static class Builder {
        private HttpStatus httpStatus;
        private String message;

        private Builder() {
        }

        public Builder httpStatus(HttpStatus httpStatus) {
            this.httpStatus = httpStatus;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public ApiError build() {
            ApiError apiError = new ApiError();
            apiError.httpStatus = this.httpStatus;
            apiError.message = this.message;
            return apiError;
        }
    }
}

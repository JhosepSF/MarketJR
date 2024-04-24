package com.marketin.main.Exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DniNotFoundException extends RuntimeException
{
	private static final long serialVersionUID = 1L;
	
	private String message;
	
	public DniNotFoundException (String message) 
	{
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
    
    
}

package com.marketin.main.Request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoriaRequest 
{
    private String descripcion;

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String Descripcion) {
		descripcion = Descripcion;
	}
    
    
}

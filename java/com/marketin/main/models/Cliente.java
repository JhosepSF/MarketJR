package com.marketin.main.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Cliente 
{
    @Id
	@Size(min = 8, max = 11)
	private String dniRUC;
	
	@Column
	String nombre;
	String razonSocial;
	
	public String getDniRUC() {
		return dniRUC;
	}
	public void setDniRUC(String dniRUC) {
		this.dniRUC = dniRUC;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getRazonSocial() {
		return razonSocial;
	}
	public void setRazonSocial(String razonSocial) {
		this.razonSocial = razonSocial;
	}
}

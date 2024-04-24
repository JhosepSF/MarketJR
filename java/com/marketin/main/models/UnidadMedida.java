package com.marketin.main.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UnidadMedida
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long CodMedida;
	
    @Column (name = "descripcion")
	String descripcion;

    public Long getCodMedida() {
		return CodMedida;
	}

	public void setCodMedida(Long codMedida) 
    {
		CodMedida = codMedida;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
}

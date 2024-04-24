package com.marketin.main.models;

import java.sql.Date;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ReporteDiario 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idreporte;
	
	@Column
	private String estado;
	private Date fecha;
	@JsonFormat(pattern = "HH:mm")
	private LocalTime horaapertura;
	@JsonFormat(pattern = "HH:mm")
	private LocalTime horacierre;
	private Double montoapertura;
	private Double montocierre;
	private Double saldo;
	
	@ManyToOne
	@JoinColumn(name = "idempleado")
	private Empleado idempleado;
	
	public Long getIdreporte() {
		return idreporte;
	}
	public void setIdreporte(Long idreporte) {
		this.idreporte = idreporte;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public LocalTime getHoraapertura() {
		return horaapertura;
	}
	public void setHoraapertura(LocalTime horaapertura) {
		this.horaapertura = horaapertura;
	}
	public LocalTime getHoracierre() {
		return horacierre;
	}
	public void setHoracierre(LocalTime horacierre) {
		this.horacierre = horacierre;
	}
	public Double getMontoapertura() {
		return montoapertura;
	}
	public void setMontoapertura(Double montoapertura) {
		this.montoapertura = montoapertura;
	}
	public Double getMontocierre() {
		return montocierre;
	}
	public void setMontocierre(Double montocierre) {
		this.montocierre = montocierre;
	}
	public Double getSaldo() {
		return saldo;
	}
	public void setSaldo(Double saldo) {
		this.saldo = saldo;
	}
	public Empleado getIdempleado() {
		return idempleado;
	}
	public void setIdempleado(Empleado idempleado) {
		this.idempleado = idempleado;
	}
}

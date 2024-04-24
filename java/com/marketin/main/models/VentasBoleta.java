package com.marketin.main.models;

import java.sql.Date;
import java.time.LocalTime;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public class VentasBoleta 
{
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
	@GenericGenerator(name = "native", strategy = "native")
	private Long VentaId;

    @Column (name = "fecha")
	Date fecha;
    @JsonFormat(pattern = "HH:mm")
	LocalTime hora;
    double monto;
    double vuelto;
    String tarjeta;
    String yape;
    String efectivo;
	String tipocomprobante;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "dniempleado")
	private Empleado dniempleado;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "dnicliente")
	private Cliente dnicliente;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ruccliente")
	private Cliente ruccliente;

	public Long getVentaId() {
		return VentaId;
	}

	public void setVentaId(Long ventaId) {
		VentaId = ventaId;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public LocalTime getHora() {
		return hora;
	}

	public void setHora(LocalTime hora) {
		this.hora = hora;
	}

	public double getMonto() {
		return monto;
	}

	public void setMonto(double monto) {
		this.monto = monto;
	}

	public double getVuelto() {
		return vuelto;
	}

	public void setVuelto(double vuelto) {
		this.vuelto = vuelto;
	}

	public String getTarjeta() {
		return tarjeta;
	}

	public void setTarjeta(String tarjeta) {
		this.tarjeta = tarjeta;
	}

	public String getYape() {
		return yape;
	}

	public void setYape(String yape) {
		this.yape = yape;
	}

	public String getEfectivo() {
		return efectivo;
	}

	public void setEfectivo(String efectivo) {
		this.efectivo = efectivo;
	}

	public String getTipocomprobante() {
		return tipocomprobante;
	}

	public void setTipocomprobante(String tipocomprobante) {
		this.tipocomprobante = tipocomprobante;
	}

	public Empleado getDniempleado() {
		return dniempleado;
	}

	public void setDniempleado(Empleado dniempleado) {
		this.dniempleado = dniempleado;
	}

	public Cliente getDnicliente() {
		return dnicliente;
	}

	public void setDnicliente(Cliente dnicliente) {
		this.dnicliente = dnicliente;
	}

	public Cliente getRuccliente() {
		return ruccliente;
	}

	public void setRuccliente(Cliente ruccliente) {
		this.ruccliente = ruccliente;
	}
}
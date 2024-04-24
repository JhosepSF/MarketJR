package com.marketin.main.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public class Compras
{
	@Id
	private String CodCompra;
	
	@Column (nullable = false)
	String tipoComprobante;
	@Column(name = "fecha_compra")
	Date fechaCompra;
	double monto;
	double deuda;
	String estado;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "rucproveedor")
	private Proveedores rucproveedor;
	
	public String getCodCompra() {
		return CodCompra;
	}

	public void setCodCompra(String codCompra) {
		CodCompra = codCompra;
	}

	public Date getFechaCompra() {
		return fechaCompra;
	}

	public void setFechaCompra(Date fechaCompra) {
		this.fechaCompra = fechaCompra;
	}

	public double getMonto() {
		return monto;
	}

	public void setMonto(double monto) {
		this.monto = monto;
	}

	public double getDeuda() {
		return deuda;
	}

	public void setDeuda(double deuda) {
		this.deuda = deuda;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Proveedores getRucproveedor() {
		return rucproveedor;
	}

	public void setRucproveedor(Proveedores rucproveedor) {
		this.rucproveedor = rucproveedor;
	}

	public String getTipoComprobante() {
		return tipoComprobante;
	}

	public void setTipoComprobante(String tipoComprobante) {
		this.tipoComprobante = tipoComprobante;
	}	
}
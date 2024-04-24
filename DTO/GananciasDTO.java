package com.marketin.main.DTO;

import java.sql.Date;

public class GananciasDTO
{
	Date fecha;
	Double montoapertura;
	Double montocierre;
	Double saldo;
	String nombreDia;
	String nombreMes;
	String nombreAno;
	
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
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
	public String getNombreDia() {
		return nombreDia;
	}
	public void setNombreDia(String nombreDia) {
		this.nombreDia = nombreDia;
	}
	public String getNombreMes() {
		return nombreMes;
	}
	public void setNombreMes(String nombreMes) {
		this.nombreMes = nombreMes;
	}
	public String getNombreAno() {
		return nombreAno;
	}
	public void setNombreAno(String nombreAno) {
		this.nombreAno = nombreAno;
	}
	public GananciasDTO(Date fecha, Double montoapertura, Double montocierre, Double saldo, String nombreDia,
			String nombreMes, String nombreAno) {
		super();
		this.fecha = fecha;
		this.montoapertura = montoapertura;
		this.montocierre = montocierre;
		this.saldo = saldo;
		this.nombreDia = nombreDia;
		this.nombreMes = nombreMes;
		this.nombreAno = nombreAno;
	}
}
package com.marketin.main.Request;

public class ReporteRequest 
{
	String estado;
	String fecha;
	String horaapertura;
	String horacierre;
	Double montoapertura;
	Double montocierre;
	Double saldo;
	String dni;
	
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public String getHoraapertura() {
		return horaapertura;
	}
	public void setHoraapertura(String horaapertura) {
		this.horaapertura = horaapertura;
	}
	public String getHoracierre() {
		return horacierre;
	}
	public void setHoracierre(String horacierre) {
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
	public String getDni() {
		return dni;
	}
	public void setDni(String dni) {
		this.dni = dni;
	}
}

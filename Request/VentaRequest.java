package com.marketin.main.Request;

public class VentaRequest 
{
	Long ventaId;
	String fecha;
	String hora;
	double monto;
	double vuelto;
	String tarjeta;
	String yape;
	String efectivo;
	String tipocomprobante;
	String nombreempleado;
	String idcliente;
    
	public Long getVentaId() {
		return ventaId;
	}
	public void setVentaId(Long ventaId) {
		this.ventaId = ventaId;
	}
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public String getHora() {
		return hora;
	}
	public void setHora(String hora) {
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
	public String getNombreempleado() {
		return nombreempleado;
	}
	public void setNombreempleado(String nombreempleado) {
		this.nombreempleado = nombreempleado;
	}
	public String getIdcliente() {
		return idcliente;
	}
	public void setIdcliente(String idcliente) {
		this.idcliente = idcliente;
	}
}

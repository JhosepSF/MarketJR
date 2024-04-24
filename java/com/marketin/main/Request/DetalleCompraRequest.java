package com.marketin.main.Request;

public class DetalleCompraRequest 
{
	String idcompra;
    Long idproducto;
    Double precio;
    Double cantidad;
    Double subtotal;
    
	public String getIdcompra() {
		return idcompra;
	}
	public void setIdcompra(String idcompra) {
		this.idcompra = idcompra;
	}
	public Long getIdproducto() {
		return idproducto;
	}
	public void setIdproducto(Long idproducto) {
		this.idproducto = idproducto;
	}
	public Double getPrecio() {
		return precio;
	}
	public void setPrecio(Double precio) {
		this.precio = precio;
	}
	public Double getCantidad() {
		return cantidad;
	}
	public void setCantidad(Double cantidad) {
		this.cantidad = cantidad;
	}
	public Double getSubtotal() {
		return subtotal;
	}
	public void setSubtotal(Double subtotal) {
		this.subtotal = subtotal;
	}
}

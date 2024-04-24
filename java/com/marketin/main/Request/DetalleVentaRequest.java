package com.marketin.main.Request;

public class DetalleVentaRequest 
{
	Long idventaboleta;
	Long idventafactura;
	Long idproducto;
    Double precio;
    Double cantidad;
    Double subtotal;

	public Long getIdventaboleta() {
		return idventaboleta;
	}
	public void setIdventaboleta(Long idventaboleta) {
		this.idventaboleta = idventaboleta;
	}
	public Long getIdventafactura() {
		return idventafactura;
	}
	public void setIdventafactura(Long idventafactura) {
		this.idventafactura = idventafactura;
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

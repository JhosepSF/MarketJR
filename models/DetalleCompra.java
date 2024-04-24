package com.marketin.main.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Detalle_Compra")
public class DetalleCompra 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
    @ManyToOne
    @JoinColumn(name = "compra_id")
    private Compras idcompra;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Productos idproducto;

    @Column
    Double precio;
    Double cantidad;
    Double subtotal;
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Compras getIdcompra() {
		return idcompra;
	}
	public void setIdcompra(Compras idcompra) {
		this.idcompra = idcompra;
	}
	public Productos getIdproducto() {
		return idproducto;
	}
	public void setIdproducto(Productos idproducto) {
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
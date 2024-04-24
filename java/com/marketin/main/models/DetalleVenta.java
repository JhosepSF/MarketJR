package com.marketin.main.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Detalle_Venta")
public class DetalleVenta 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne
    @JoinColumn(name = "idventaboleta")
    private VentasBoleta idventaboleta;
	
	@ManyToOne
    @JoinColumn(name = "idventafactura")
    private VentasFactura idventafactura;

    @ManyToOne
    @JoinColumn(name = "idproducto")
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
	public VentasBoleta getIdventaboleta() {
		return idventaboleta;
	}
	public void setIdventaboleta(VentasBoleta idventaboleta) {
		this.idventaboleta = idventaboleta;
	}
	public VentasFactura getIdventafactura() {
		return idventafactura;
	}
	public void setIdventafactura(VentasFactura idventafactura) {
		this.idventafactura = idventafactura;
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
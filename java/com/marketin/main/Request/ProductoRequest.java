package com.marketin.main.Request;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductoRequest 
{
    private Long productoId;
    private String nombre;
    private Double precioCompra;
    private Double precioVenta;
    private int stock;
    private Set<Long> unidad;
    private Set<Long> codMarca;
    private Set<Long> codCategoria;
    private String observacion;
    
	public Long getProductoId() {
		return productoId;
	}
	public void setProductoId(Long productoId) {
		this.productoId = productoId;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public Double getPrecioCompra() {
		return precioCompra;
	}
	public void setPrecioCompra(Double precioCompra) {
		this.precioCompra = precioCompra;
	}
	
	public Double getPrecioVenta() {
		return precioVenta;
	}
	public void setPrecioVenta(Double precioVenta) {
		this.precioVenta = precioVenta;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	public Set<Long> getUnidad() {
		return unidad;
	}
	public void setUnidad(Set<Long> unidad) {
		this.unidad = unidad;
	}
	public Set<Long> getCodMarca() {
		return codMarca;
	}
	public void setCodMarca(Set<Long> codMarca) {
		this.codMarca = codMarca;
	}
	public Set<Long> getCodCategoria() {
		return codCategoria;
	}
	public void setCodCategoria(Set<Long> codCategoria) {
		this.codCategoria = codCategoria;
	}
	public String getObservacion() {
		return observacion;
	}
	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}
}

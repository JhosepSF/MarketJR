package com.marketin.main.models;

import java.util.Set;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Productos 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
	@GenericGenerator(name = "native", strategy = "native")
	private Long ProductoId;
	
	@Column (name = "nombre")
	String nombre;
	@Column
	Double PrecioCompra;
	Double PrecioVenta;
	int stock;
	String Observacion;
		
	@ManyToMany(fetch = FetchType.EAGER, targetEntity = UnidadMedida.class, cascade = CascadeType.PERSIST)
	@JoinTable(name = "Producto_Unidad", joinColumns = @JoinColumn(name = "unidadId"), inverseJoinColumns = @JoinColumn(name="CodMedida"))
	private Set<UnidadMedida> unidad;

	@ManyToMany(fetch = FetchType.EAGER, targetEntity = Marcas.class, cascade = CascadeType.PERSIST)
	@JoinTable(name = "Producto_Marca", joinColumns = @JoinColumn(name = "marcaId"), inverseJoinColumns = @JoinColumn(name="CodMarca"))
	private Set<Marcas> codMarca;

	@ManyToMany(fetch = FetchType.EAGER, targetEntity = Categorias.class, cascade = CascadeType.PERSIST)
	@JoinTable(name = "Producto_Categoria", joinColumns = @JoinColumn(name = "categoriaId"), inverseJoinColumns = @JoinColumn(name="CodCategoria"))
	private Set <Categorias> codCategoria;
    
	public Long getProductoId() {
		return ProductoId;
	}

	public void setProductoId(Long productoId) {
		ProductoId = productoId;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getObservacion() {
		return Observacion;
	}

	public void setObservacion(String observacion) {
		Observacion = observacion;
	}

	public Double getPrecioCompra() {
		return PrecioCompra;
	}

	public void setPrecioCompra(Double precioCompra) {
		PrecioCompra = precioCompra;
	}

	public Double getPrecioVenta() {
		return PrecioVenta;
	}

	public void setPrecioVenta(Double precioVenta) {
		PrecioVenta = precioVenta;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public Set<UnidadMedida> getUnidad() {
		return unidad;
	}

	public void setUnidad(Set<UnidadMedida> unidad) {
		this.unidad = unidad;
	}

	public Set<Marcas> getCodMarca() {
		return codMarca;
	}

	public void setCodMarca(Set<Marcas> codMarca) {
		this.codMarca = codMarca;
	}

	public Set<Categorias> getCodCategoria() {
		return codCategoria;
	}

	public void setCodCategoria(Set<Categorias> codCategoria) {
		this.codCategoria = codCategoria;
	}	
}
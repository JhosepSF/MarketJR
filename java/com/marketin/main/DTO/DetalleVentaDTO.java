package com.marketin.main.DTO;

public class DetalleVentaDTO
{
    private Double cantidad;
    private String descripcion;
    private Double precioUnitario;
    private Double importe;

    public DetalleVentaDTO() {}

    public DetalleVentaDTO(Double cantidad, String descripcion, Double precioUnitario, Double importe) {
        this.cantidad = cantidad;
        this.descripcion = descripcion;
        this.precioUnitario = precioUnitario;
        this.importe = importe;
    }


	public Double getCantidad() {
		return cantidad;
	}

	public void setCantidad(Double cantidad) {
		this.cantidad = cantidad;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Double getPrecioUnitario() {
		return precioUnitario;
	}

	public void setPrecioUnitario(Double precioUnitario) {
		this.precioUnitario = precioUnitario;
	}

	public Double getImporte() {
		return importe;
	}

	public void setImporte(Double importe) {
		this.importe = importe;
	}

}
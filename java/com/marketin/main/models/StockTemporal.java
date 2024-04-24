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
@Table(name = "Stock_Temporal")
public class StockTemporal 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne
    @JoinColumn(name = "compra_id")
    private Compras compra;

    @ManyToOne
    @JoinColumn(name = "venta_boleta")
    private VentasBoleta ventaBoleta;
	
	@Column
	int Stock;

	public Compras getCompra() {
		return compra;
	}

	public void setCompra(Compras compra) {
		this.compra = compra;
	}

	public VentasBoleta getVenta() {
		return ventaBoleta;
	}

	public void setVenta(VentasBoleta venta) {
		this.ventaBoleta = venta;
	}

	public int getStock() {
		return Stock;
	}

	public void setStock(int stock) {
		Stock = stock;
	}
}
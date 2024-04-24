package com.marketin.main.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.marketin.main.models.DetalleVenta;
import com.marketin.main.models.VentasBoleta;
import com.marketin.main.models.VentasFactura;

public interface DetalleVentaRepository extends CrudRepository <DetalleVenta, Long>
{
	List<DetalleVenta> findByIdventaboleta(VentasBoleta venta);
	List<DetalleVenta> findByIdventafactura(VentasFactura venta);
}

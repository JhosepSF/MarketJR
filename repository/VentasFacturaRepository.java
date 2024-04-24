package com.marketin.main.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.marketin.main.models.Cliente;
import com.marketin.main.models.Empleado;
import com.marketin.main.models.VentasFactura;

public interface VentasFacturaRepository extends CrudRepository <VentasFactura, Long>
{
	List<VentasFactura> findByFecha(Date fecha);
	
	List<VentasFactura> findByTipocomprobante(String tipo);
	
	List<VentasFactura> findByDniempleado(Empleado empleado);
	
	List<VentasFactura> findByDnicliente(Cliente dnicliente);
	
	List<VentasFactura> findByRuccliente(Cliente ruccliente);
}

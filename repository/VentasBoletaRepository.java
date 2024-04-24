package com.marketin.main.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.marketin.main.models.Cliente;
import com.marketin.main.models.Empleado;
import com.marketin.main.models.VentasBoleta;

public interface VentasBoletaRepository extends CrudRepository <VentasBoleta, Long>
{
	List<VentasBoleta> findByFecha(Date fecha);
	
	List<VentasBoleta> findByTipocomprobante(String tipo);
	
	List<VentasBoleta> findByDniempleado(Empleado empleado);
	
	List<VentasBoleta> findByDnicliente(Cliente dnicliente);
	
	List<VentasBoleta> findByRuccliente(Cliente ruccliente);
}

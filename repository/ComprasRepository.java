package com.marketin.main.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.marketin.main.models.Compras;
import com.marketin.main.models.Proveedores;

public interface ComprasRepository extends CrudRepository <Compras, String>
{
	List<Compras> findByFechaCompra(Date fecha);
	
	List<Compras> findByRucproveedor(Proveedores rucproveedor);
}

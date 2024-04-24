package com.marketin.main.repository;

import org.springframework.data.repository.CrudRepository;

import com.marketin.main.models.Proveedores;

public interface ProveedoresRepository extends CrudRepository <Proveedores, String>
{
	Boolean existsByRUC(String ruc);
}

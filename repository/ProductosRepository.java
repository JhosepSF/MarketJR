package com.marketin.main.repository;

import org.springframework.data.repository.CrudRepository;

import com.marketin.main.models.Productos;

public interface ProductosRepository extends CrudRepository <Productos, Long>
{
	Boolean existsByNombre(String nombre);
}

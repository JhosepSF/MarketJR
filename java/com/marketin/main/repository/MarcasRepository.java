package com.marketin.main.repository;

import org.springframework.data.repository.CrudRepository;

import com.marketin.main.models.Marcas;

public interface MarcasRepository extends CrudRepository <Marcas, Long>
{
	Boolean existsByDescripcion(String descripcion);
}

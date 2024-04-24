package com.marketin.main.repository;

import org.springframework.data.repository.CrudRepository;

import com.marketin.main.models.Categorias;

public interface CategoriasRepository extends CrudRepository <Categorias, Long>
{
	Boolean existsByDescripcion(String descripcion);
}

package com.marketin.main.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.marketin.main.models.UnidadMedida;

public interface UnidadMedidaRepository extends CrudRepository <UnidadMedida, Long>
{
	Optional <UnidadMedida> findById(Long id);
	Boolean existsByDescripcion(String descripcion);
}

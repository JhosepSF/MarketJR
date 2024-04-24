package com.marketin.main.repository;

import org.springframework.data.repository.CrudRepository;

import com.marketin.main.models.Cliente;

public interface ClienteRepository extends CrudRepository <Cliente, String>
{
}

package com.marketin.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketin.main.models.Cliente;
import com.marketin.main.repository.ClienteRepository;

@Service
public class ClientesService 
{
	@Autowired
	ClienteRepository clientes;
	
	public Cliente clienteById(String idcliente) 
	{
		Cliente clie = clientes.findById(idcliente)
				.orElseThrow(()->new RuntimeException("No se encontro al cliente"));
		return clie;
	}
	
	public void guardar(Cliente clie) 
	{
		clientes.save(clie);
	}
}

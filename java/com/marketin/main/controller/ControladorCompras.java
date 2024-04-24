package com.marketin.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ControladorCompras 
{
	@GetMapping("/proveedor")
	public String proveedores() 
	{
		return "Compras/proveedor.html";
	}
	
	@GetMapping("/proveedorInactivos")
	public String proveedoresI() 
	{
		return "Compras/proveedorinactivo.html";
	}
	
	@GetMapping("/compras")
	public String compras() 
	{
		return "Compras/compra.html";
	}
	
	@GetMapping("/registrarcompras")
	public String registrarcompra() 
	{
		return "Compras/registrocompra.html";
	}
}

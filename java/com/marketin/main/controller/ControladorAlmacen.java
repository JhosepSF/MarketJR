package com.marketin.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ControladorAlmacen 
{
	@GetMapping("/categoria")
	public String categoria() 
	{
		return "Inventario/categoria.html";
	}
	
	@GetMapping("/marca")
	public String marca() 
	{
		return "Inventario/marca.html";
	}
	
	@GetMapping("/producto")
	public String producto()
	{
		return "Inventario/producto.html";
	}
	
	@GetMapping("/productoinactivo")
	public String productoI()
	{
		return "Inventario/productoinactivo.html";
	}
	
	@GetMapping("/unidad")
	public String unidad() 
	{
		return "Inventario/unidad.html";
	}
}

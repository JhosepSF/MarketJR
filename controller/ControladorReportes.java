package com.marketin.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ControladorReportes 
{
	@GetMapping("/reportes")
	public String reporte() 
	{
		return "reportes/reporte";
	}
	
	@GetMapping("/reportes/ganancias")
	public String ganancias() 
	{
		return "reportes/reporteganancias";
	}
	
	@GetMapping("/reportes/gastos")
	public String gastos() 
	{
		return "reportes/reportegastos";
	}
	
	@GetMapping("/reportes/ingresos")
	public String ingresos() 
	{
		return "reportes/reporteingresos";
	}
	
	@GetMapping("/reportes/gananciasmes")
	public String gananciasmes() 
	{
		return "reportes/reportegananciasmes";
	}
	
	@GetMapping("/reportes/gastosmes")
	public String gastosmes() 
	{
		return "reportes/reportegastosmes";
	}
	
	@GetMapping("/reportes/ingresosmes")
	public String ingresosmes() 
	{
		return "reportes/reporteingresosmes";
	}
	
	@GetMapping("/reportes/gananciasanual")
	public String gananciasanual() 
	{
		return "reportes/reportegananciasanual";
	}
	
	@GetMapping("/reportes/gastosanual")
	public String gastosanual() 
	{
		return "reportes/reportegastosanual";
	}
	
	@GetMapping("/reportes/ingresosanual")
	public String ingresosanual() 
	{
		return "reportes/reporteingresosanual";
	}
	
	@GetMapping("/reportes/productos")
	public String productos () 
	{
		return "reportes/reporteproductos";
	}
}

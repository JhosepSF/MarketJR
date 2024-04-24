package com.marketin.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ControladorSeguridad
{
	@GetMapping("/verusuario")
	public String viewuser()
	{
		return "Seguridad/usuario.html";
	}
	
	@GetMapping("/usuarioinactivo")
	public String viewuserI()
	{
		return "Seguridad/usuarioinactivo.html";
	}
}

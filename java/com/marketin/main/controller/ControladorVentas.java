package com.marketin.main.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ControladorVentas
{
    @GetMapping("/venta")
    public String ventas()
    {
        return "Ventas/venta.html";
    }

    @GetMapping("/registrarventa")
    public String registrarventa()
    {
        return "Ventas/registrarventa.html";
    }

    @GetMapping("/apertura")
    public String aperturaCaja()
    {
        return "Ventas/aperturacaja.html";
    }
    
    @GetMapping("/cerrar")
    public String cierreCaja()
    {
        return "Ventas/cerrarcaja.html";
    }
    
    @GetMapping("/pdfboleta")
    public String pdfboleta()
    {
    	return "Ventas/pdfboleta.html";
    }
    
    @GetMapping("/pdffactura")
    public String pdffactura()
    {
    	return "Ventas/pdfruc.html";
    }
}
package com.marketin.main.controller.Ventas;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketin.main.DTO.VentasBoletaDTO;
import com.marketin.main.DTO.VentasFacturaDTO;
import com.marketin.main.services.VentasService;

@RestController
@RequestMapping("/ventas")
public class ControladorVenta
{	
	@Autowired
	VentasService servicioventa;
	
	@GetMapping("/boletas")
    public List<VentasBoletaDTO> getVentasBoleta()
    {
    	return servicioventa.getAllBoletaDTO();
    }
	
	@GetMapping("/facturas")
    public List<VentasFacturaDTO> getVentasFactura()
    {
    	return servicioventa.getAllFacturaDTO();
    }
	
	@GetMapping("/boleta/{idventa}")
    public ResponseEntity<?> getVentasIdboleta(@PathVariable Long idventa)
    {
		try 
		{
			return ResponseEntity.ok(servicioventa.getVentasBoletaId(idventa));
		}
		catch(Exception e)
		{
			return ResponseEntity.badRequest().body("Error en: " + e.getMessage());
		}
    }
	
	@GetMapping("/factura/{idventa}")
    public ResponseEntity<?> getVentasIdfactura(@PathVariable Long idventa)
    {
		try 
		{
			return ResponseEntity.ok(servicioventa.getVentasFacturaId(idventa));
		}
		catch(Exception e)
		{
			return ResponseEntity.badRequest().body("Error en: " + e.getMessage());
		}
    }
}

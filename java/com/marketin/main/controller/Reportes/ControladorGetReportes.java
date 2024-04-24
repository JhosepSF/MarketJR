package com.marketin.main.controller.Reportes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketin.main.services.ReportesService;

@RestController
@RequestMapping("/reportes")
public class ControladorGetReportes 
{
	@Autowired
	ReportesService servicio;
	
	@GetMapping("/datosventa/boleta")
	public ResponseEntity<?> getVentasBoletaDTO()
	{
		return ResponseEntity.ok(servicio.getVentasBoletaDTO());
	}
	
	@GetMapping("/datosventa/factura")
	public ResponseEntity<?> getVentasFacturaDTO()
	{
		return ResponseEntity.ok(servicio.getVentasFacturaDTO());
	}
	
	@GetMapping("/datoscompra")
	public ResponseEntity<?> getComprasDTO()
	{
		return ResponseEntity.ok(servicio.getComprasDTO());
	}
	
	@GetMapping("/datosganancia")
	public ResponseEntity<?> getGananciasDTO()
	{
		return ResponseEntity.ok(servicio.getGananciasDTO());
	}
	
	@GetMapping("/datosproducto")
	public ResponseEntity<?> getProductosDTO()
	{
		return ResponseEntity.ok(servicio.getProductos());
	}
}

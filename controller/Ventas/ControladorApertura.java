package com.marketin.main.controller.Ventas;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketin.main.Request.ReporteRequest;
import com.marketin.main.models.Empleado;
import com.marketin.main.models.ReporteDiario;
import com.marketin.main.repository.EmpleadoRepository;
import com.marketin.main.services.AperturaService;

@RestController
@RequestMapping("/apertura")
public class ControladorApertura
{
	@Autowired
	AperturaService servicio;
	
	@Autowired
	EmpleadoRepository repository;
	
	@PostMapping("/abrir")
	public ResponseEntity<?> aperturacaja (@RequestBody ReporteRequest reporte)
	{
		try
		{
			servicio.aperturacaja(reporte);
			return ResponseEntity.ok().body("Se guardo el detalle de apertura");
		}
		catch (Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hubo un problema con el registro");
		}
	}
	
	@PostMapping("/cerrar")
	public ResponseEntity<?> cerrarcaja (@RequestBody ReporteRequest reporte)
	{
		try
		{
			servicio.cerrarcaja(reporte);
			return ResponseEntity.ok().body("Se guardo el detalle de cierre");
		}
		catch (Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hubo un problema con el registro");
		}
	}
	
	@GetMapping("/actual/{dia}")
	public ReporteDiario actual(@PathVariable Date dia)
	{
		return servicio.reportedia(dia);
	}
	
	@GetMapping("/empleadonombre/{nombre}")
	public ResponseEntity<?> getUserName(@PathVariable String nombre)
    {
    	Empleado opt = repository.findByEmpleadoNombre(nombre);
    	return ResponseEntity.ok(opt);
    }
}

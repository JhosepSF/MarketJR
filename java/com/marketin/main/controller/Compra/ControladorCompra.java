package com.marketin.main.controller.Compra;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketin.main.DTO.ComprasDTO;
import com.marketin.main.Request.CompraRequest;
import com.marketin.main.Request.DetalleCompraRequest;
import com.marketin.main.services.ComprasService;
import com.marketin.main.services.DetalleCompraService;

@RestController
@RequestMapping("/compras")
public class ControladorCompra 
{
	@Autowired
	DetalleCompraService detalleservicio;
	
	@Autowired
	ComprasService compraservicio;
	
	@GetMapping("/vercompras")
	public List<ComprasDTO> getComprasDTO() 
	{
	    return compraservicio.getAllDTO();
	}
	
	@GetMapping("/vercompras/{codCompra}")
    public ResponseEntity<?> getComprasId(@PathVariable String codCompra)
    {
		try 
		{
			return ResponseEntity.ok(compraservicio.getComprasId(codCompra));
		}
		catch(Exception e)
		{
			return ResponseEntity.badRequest().body("Error en: " + e.getMessage());
		}
    }
	
	@PostMapping("/register/detalle")
    public ResponseEntity<?> registrarDetalle(@RequestBody DetalleCompraRequest request)
	{
		try 
		{
			detalleservicio.guardarDetalle(request);
            return ResponseEntity.ok().body("{\"message\": \"Detalle registrado con exito.\"}");
		}
		catch(Exception e) 
		{
            return ResponseEntity.badRequest().body("Error en la creacion de los detalles: " + e.getMessage());
		}
	}
	
	@PostMapping("/register")
    public ResponseEntity<?> RegistrarCompra(@RequestBody CompraRequest compraRequest)
	{
        try 
        {   
        	compraservicio.RegistrarCompra(compraRequest);
            return ResponseEntity.ok().body("{\"message\": \"Compra registrado con exito.\"}");
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Error en la creacion de la compra: " + e.getMessage());
        }
    }
	
	@PutMapping("/update/{codCompra}")
	public ResponseEntity<?> actualizarCompra(@PathVariable String codCompra, @RequestBody CompraRequest compraRequest)
	{
	    try 
	    {	    	    	
	    	compraservicio.actualizarCompra(codCompra, compraRequest);
	        return ResponseEntity.ok().body("Compra actualizado con éxito.");
	    } 
	    catch (Exception e) {
	        return ResponseEntity.badRequest().body("Error al actualizar la compra: " + e.getMessage());
	    }
	}
	
	@PutMapping("/pay/{codCompra}")
	public ResponseEntity<String> pagarCompra(@PathVariable String codCompra, @RequestBody CompraRequest compraRequest)
	{
	    try 
	    {
	    	compraservicio.pagarCompra(codCompra, compraRequest);
	        return ResponseEntity.ok().body("Compra actualizado con éxito.");
	    } 
	    catch (Exception e) {
	        return ResponseEntity.badRequest().body("Error al actualizar la compra: " + e.getMessage());
	    }
	}
}

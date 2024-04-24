package com.marketin.main.controller.Ventas;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketin.main.DTO.DetalleVentaDTO;
import com.marketin.main.Request.DetalleVentaRequest;
import com.marketin.main.Request.ProductoRequest;
import com.marketin.main.Request.ReporteRequest;
import com.marketin.main.Request.VentaRequest;
import com.marketin.main.models.Cliente;
import com.marketin.main.services.AperturaService;
import com.marketin.main.services.ClientesService;
import com.marketin.main.services.VentasService;

@RestController
@RequestMapping("/registroventa")
public class ControladorRegistroVenta 
{
	@Autowired
	ClientesService clientes;
	
	@Autowired
	VentasService servicioventa;
	
	@Autowired
	AperturaService apertura;
	
	@GetMapping("/cliente/{dniruc}")
	public ResponseEntity<?> getClientes(@PathVariable String dniruc)
	{
		try 
		{
			return ResponseEntity.ok(clientes.clienteById(dniruc));
		}
		catch(Exception e) 
		{
			return ResponseEntity.badRequest().body("No se encontro el cliente");
		}
	}
	
	@GetMapping("/boleta/{idventa}")
    public List<DetalleVentaDTO> getDetalleByIdventaBoleta(@PathVariable Long idventa)
    {
    	return servicioventa.getByIdventaboleta(idventa);
    }
	
	@GetMapping("/factura/{idventa}")
    public List<DetalleVentaDTO> getDetalleByIdventaFactura(@PathVariable Long idventa)
    {
    	return servicioventa.getByIdventafactura(idventa);
    }
	
	@PostMapping("/cliente/registro")
	public ResponseEntity<?> guardarClientes(@RequestBody Cliente cliente)
	{
		try 
		{
			clientes.guardar(cliente);
			return ResponseEntity.ok(Map.of("mensaje", "Cliente creado exitosamente"));
		}
		catch (Exception e) 
		{
			return ResponseEntity.badRequest().body("Hubo un error al guardar al cliente");
		}
	}
	
	@PostMapping("/editarcierre")
	public ResponseEntity<?> editarcierre(@RequestBody ReporteRequest reporte)
	{
		try 
		{
			apertura.editar(reporte);
			return ResponseEntity.ok(Map.of("mensaje", "Monto agregdo"));
		}
		catch (Exception e) 
		{
			return ResponseEntity.badRequest().body("Hubo un error en " + e.getMessage());
		}
	}
	
	@PostMapping("/registro")
    public ResponseEntity<?> RegistrarVenta (@RequestBody VentaRequest request)
	{
        try 
        {   
        	String respuesta = servicioventa.RegistrarVenta(request);
            return ResponseEntity.ok(Map.of("mensaje", respuesta));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Error en la creacion de la venta: " + e.getMessage());
        }
    }
	
	@PutMapping("/stock/{codProducto}")
	public ResponseEntity<String> actualizarStockPC(@PathVariable int codProducto, @RequestBody ProductoRequest productoRequest)
	{
	    try 
	    {
	    	servicioventa.venta(codProducto, productoRequest);      
	        return ResponseEntity.ok().body("{\"message\": \"Producto actualizado con éxito.\"}");
	    } 
	    catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar el producto: " + e.getMessage());
	    }
	}
	
	@PostMapping("/register/detalleboleta")
    public ResponseEntity<?> registrarDetalleBoleta(@RequestBody DetalleVentaRequest request)
	{
		try 
		{
			servicioventa.guardarDetalleBoleta(request);
            return ResponseEntity.ok().body("{\"message\": \"Detalle registrado con exito.\"}");
		}
		catch(Exception e) 
		{
            return ResponseEntity.badRequest().body("Error en la creacion de los detalles: " + e.getMessage());
		}
	}
	
	@PostMapping("/register/detallefactura")
    public ResponseEntity<?> registrarDetalleFactura(@RequestBody DetalleVentaRequest request)
	{
		try 
		{
			servicioventa.guardarDetalleFactura(request);
            return ResponseEntity.ok().body("{\"message\": \"Detalle registrado con exito.\"}");
		}
		catch(Exception e) 
		{
            return ResponseEntity.badRequest().body("Error en la creacion de los detalles: " + e.getMessage());
		}
	}
}

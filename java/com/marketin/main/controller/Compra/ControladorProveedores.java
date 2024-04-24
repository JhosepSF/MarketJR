package com.marketin.main.controller.Compra;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketin.main.Request.ProveedorRequest;
import com.marketin.main.models.Proveedores;
import com.marketin.main.repository.ProveedoresRepository;

@RestController
@RequestMapping("/proveedores")
public class ControladorProveedores 
{
	@Autowired
	ProveedoresRepository repository;
	
	
	@GetMapping("/viewproveedores")
    public List<Proveedores> getProveedores()
    {
    	return (List<Proveedores>) repository.findAll();
    }
	
	@GetMapping("/viewproveedores/{ruc}")
    public ResponseEntity<Proveedores> getProveedorRuc(@PathVariable String ruc)
    {
    	Optional<Proveedores> opt = repository.findById(ruc);
    	if(opt.isEmpty()) 
    	{
    		return ResponseEntity.badRequest().build();
    	}
    	else
    	{
    		return ResponseEntity.ok(opt.get());
    	}
    }
	
	@PostMapping("/register")
    public ResponseEntity<?> RegistrarProveedor(@RequestBody ProveedorRequest proveedorRequest)
	{
        try 
        {
        	
        	String ruc = proveedorRequest.getRuc();

            if (repository.existsByRUC(ruc)) 
            {
                throw new RuntimeException("Ya existe un proveedor con el mismo RUC");
            }
            
        	Proveedores proveedor = new Proveedores();
        	proveedor.setRUC(proveedorRequest.getRuc());
        	proveedor.setRazonSocial(proveedorRequest.getRazonsocial());
        	proveedor.setRepresentante(proveedorRequest.getRepresentante());
        	proveedor.setDireccion(proveedorRequest.getDireccion());
        	proveedor.setTelefono(proveedorRequest.getTelefono());
        	proveedor.setObservacion(proveedorRequest.getObservacion());
            repository.save(proveedor);
            return ResponseEntity.ok().body("{\"message\": \"Proveedor registrado con exito.\"}");
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error en la creacion del proveedor: " + e.getMessage());
        }
    }
	
	@PutMapping("/update/{ruc}")
	public ResponseEntity<String> actualizarProveedor(@PathVariable String ruc, @RequestBody ProveedorRequest proveedorRequest)
	{
	    try 
	    {
	    	Proveedores proveedorExistente = repository.findById(ruc)
	                .orElseThrow(() -> new RuntimeException("ruc no encontrado"));
	    	
        	proveedorExistente.setTelefono(proveedorRequest.getTelefono());
	    	repository.save(proveedorExistente);
	        
	        return ResponseEntity.ok().body("{\"message\": \"Proveedor actualizado con éxito.\"}");
	    } 
	    catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar el proveedor: " + e.getMessage());
	    }
	}
	
	@DeleteMapping("/delete/{ruc}")
	public ResponseEntity<Proveedores> BorrarProveedor(@PathVariable String ruc)
	{
		if (ruc == null || !repository.existsById(ruc)) 
		{
    		return ResponseEntity.badRequest().build();
		}
		Proveedores proveedorExistente = repository.findById(ruc)
                .orElseThrow(() -> new RuntimeException("ruc no encontrado"));
    	proveedorExistente.setObservacion("Inactivo");
    	repository.save(proveedorExistente);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/activate/{ruc}")
	public ResponseEntity<Proveedores> ActivarProveedor(@PathVariable String ruc)
	{
		if (ruc == null || !repository.existsById(ruc)) 
		{
    		return ResponseEntity.badRequest().build();
		}
		Proveedores proveedorExistente = repository.findById(ruc)
                .orElseThrow(() -> new RuntimeException("ruc no encontrado"));
    	proveedorExistente.setObservacion("Activo");
    	repository.save(proveedorExistente);
		return ResponseEntity.noContent().build();
	}
}

package com.marketin.main.controller.inventario;
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

import com.marketin.main.Request.UnidadRequest;
import com.marketin.main.models.UnidadMedida;
import com.marketin.main.repository.UnidadMedidaRepository;

@RestController
@RequestMapping("/unidad")
public class ControladorUnidad 
{
	@Autowired
	UnidadMedidaRepository repository;
	
	
	@GetMapping("/viewunidades")
    public List<UnidadMedida> getUnidades()
    {
    	return (List<UnidadMedida>) repository.findAll();
    }
	
	@GetMapping("/viewunidades/{codUnidad}")
    public ResponseEntity<UnidadMedida> getUnidadId(@PathVariable int codUnidad)
    {
    	Optional<UnidadMedida> opt = repository.findById(Long.valueOf(codUnidad));
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
    public ResponseEntity<?> RegistrarUnidad(@RequestBody UnidadRequest unidadRequest)
	{
        try 
        {
        	if (repository.existsByDescripcion(unidadRequest.getDescripcion())) {
                throw new RuntimeException("Error: La unidad con esta descripción ya existe.");
            }
        	
        	UnidadMedida unidad = new UnidadMedida();
            unidad.setDescripcion(unidadRequest.getDescripcion());
            repository.save(unidad);
            return ResponseEntity.ok().body("{\"message\": \"Unidad registrada con exito.\"}");
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error en la creacion de la unidad: " + e.getMessage());
        }
    }
	
	@PutMapping("/update/{codUnidad}")
	public ResponseEntity<String> actualizarUnidad(@PathVariable int codUnidad, @RequestBody UnidadRequest unidadRequest)
	{
	    try 
	    {
	    	UnidadMedida unidadExistente = repository.findById(Long.valueOf(codUnidad))
	                .orElseThrow(() -> new RuntimeException("Unidad no encontrado"));
	    	
	    	if (repository.existsByDescripcion(unidadRequest.getDescripcion())) {
                throw new RuntimeException("Error: La unidad con esta descripción ya existe.");
            }
	    	
	    	unidadExistente.setDescripcion(unidadRequest.getDescripcion());
	    	repository.save(unidadExistente);
	        
	        return ResponseEntity.ok().body("{\"message\": \"Unidad actualizado con éxito.\"}");
	    } 
	    catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar la unidad: " + e.getMessage());
	    }
	}
	
	@DeleteMapping("/delete/{codUnidad}")
	public ResponseEntity<UnidadMedida> BorrarUnidad(@PathVariable int codUnidad)
	{
		if (codUnidad == 0 || !repository.existsById(Long.valueOf(codUnidad))) 
		{
    		return ResponseEntity.badRequest().build();
		}
		repository.deleteById(Long.valueOf(codUnidad));
		return ResponseEntity.noContent().build();
	}
}

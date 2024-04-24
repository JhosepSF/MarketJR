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

import com.marketin.main.Request.MarcaRequest;
import com.marketin.main.models.Marcas;
import com.marketin.main.repository.MarcasRepository;

@RestController
@RequestMapping("/marcas")
public class ControladorMarcas 
{
	@Autowired
	MarcasRepository repository;
	
	
	@GetMapping("/viewmarcas")
    public List<Marcas> getMarcas()
    {
    	return (List<Marcas>) repository.findAll();
    }
	
	@GetMapping("/viewmarcas/{codMarcas}")
    public ResponseEntity<Marcas> getMarcaId(@PathVariable int codMarcas)
    {
    	Optional<Marcas> opt = repository.findById(Long.valueOf(codMarcas));
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
    public ResponseEntity<?> RegistrarMarca(@RequestBody MarcaRequest marcaRequest)
	{
        try 
        {
        	if (repository.existsByDescripcion(marcaRequest.getDescripcion())) {
                throw new RuntimeException("Error: La marca con esta descripción ya existe.");
            }
        	
        	Marcas marca = new Marcas();
            marca.setDescripcion(marcaRequest.getDescripcion());
            repository.save(marca);
            return ResponseEntity.ok().body("{\"message\": \"Marca registrada con exito.\"}");
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error en la creacion de la marca: " + e.getMessage());
        }
    }
	
	@PutMapping("/update/{codMarca}")
	public ResponseEntity<String> actualizarMarca(@PathVariable int codMarca, @RequestBody MarcaRequest marcaRequest)
	{
	    try 
	    {
	    	Marcas marcaExistente = repository.findById(Long.valueOf(codMarca))
	                .orElseThrow(() -> new RuntimeException("Marca no encontrado"));
	    	
	    	if (repository.existsByDescripcion(marcaRequest.getDescripcion())) {
                throw new RuntimeException("Error: La marca con esta descripción ya existe.");
            }
	    	
	    	marcaExistente.setDescripcion(marcaRequest.getDescripcion());
	    	repository.save(marcaExistente);
	        
	        return ResponseEntity.ok().body("{\"message\": \"Marca actualizado con éxito.\"}");
	    } 
	    catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar la marca: " + e.getMessage());
	    }
	}
	
	@DeleteMapping("/delete/{codMarcas}")
	public ResponseEntity<Marcas> BorrarMarca(@PathVariable int codMarcas)
	{
		if (codMarcas == 0 || !repository.existsById(Long.valueOf(codMarcas))) 
		{
    		return ResponseEntity.badRequest().build();
		}
		repository.deleteById(Long.valueOf(codMarcas));
		return ResponseEntity.noContent().build();
	}
}

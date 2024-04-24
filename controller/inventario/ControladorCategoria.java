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

import com.marketin.main.Request.CategoriaRequest;
import com.marketin.main.models.Categorias;
import com.marketin.main.repository.CategoriasRepository;

@RestController
@RequestMapping("/categoria")
public class ControladorCategoria 
{
	@Autowired
	CategoriasRepository repository;
	
	@GetMapping("/viewcategory")
    public List<Categorias> getCategorias()
    {
    	return (List<Categorias>) repository.findAll();
    }
	
	@GetMapping("/viewcategory/{codCategoria}")
    public ResponseEntity<Categorias> getCategoriaId(@PathVariable int codCategoria)
    {
    	Optional<Categorias> opt = repository.findById(Long.valueOf(codCategoria));
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
    public ResponseEntity<?> RegistrarCategoria(@RequestBody CategoriaRequest categoriaRequest)
	{
        try 
        {
        	if (repository.existsByDescripcion(categoriaRequest.getDescripcion())) {
                throw new RuntimeException("Error: La categoria con esta descripción ya existe.");
            }
        	
        	Categorias categoria = new Categorias();
            categoria.setDescripcion(categoriaRequest.getDescripcion());
            repository.save(categoria);
            return ResponseEntity.ok().body("{\"message\": \"Categoria registrada con exito.\"}");
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error en la creacion de la categoria: " + e.getMessage());
        }
    }
	
	@PutMapping("/update/{codCategoria}")
	public ResponseEntity<String> actualizarCategoria(@PathVariable int codCategoria, @RequestBody CategoriaRequest categoriaRequest)
	{
	    try 
	    {
	    	Categorias categoriaExistente = repository.findById(Long.valueOf(codCategoria))
	                .orElseThrow(() -> new RuntimeException("Categoria no encontrado"));
	    	
	    	if (repository.existsByDescripcion(categoriaRequest.getDescripcion())) {
                throw new RuntimeException("Error: La categoria con esta descripción ya existe.");
            }
	    	
	    	categoriaExistente.setDescripcion(categoriaRequest.getDescripcion());
	    	repository.save(categoriaExistente);
	        
	        return ResponseEntity.ok().body("{\"message\": \"Categoria actualizado con éxito.\"}");
	    } 
	    catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar la categoria: " + e.getMessage());
	    }
	}
	
	@DeleteMapping("/delete/{codCategoria}")
	public ResponseEntity<Categorias> BorrarCategoria(@PathVariable int codCategoria)
	{
		if (codCategoria == 0 || !repository.existsById(Long.valueOf(codCategoria))) 
		{
    		return ResponseEntity.badRequest().build();
		}
		repository.deleteById(Long.valueOf(codCategoria));
		return ResponseEntity.noContent().build();
	}
}

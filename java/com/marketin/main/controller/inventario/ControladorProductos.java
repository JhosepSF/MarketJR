package com.marketin.main.controller.inventario;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

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

import com.marketin.main.Request.ProductoRequest;
import com.marketin.main.models.Categorias;
import com.marketin.main.models.Marcas;
import com.marketin.main.models.Productos;
import com.marketin.main.models.UnidadMedida;
import com.marketin.main.repository.CategoriasRepository;
import com.marketin.main.repository.MarcasRepository;
import com.marketin.main.repository.ProductosRepository;
import com.marketin.main.repository.UnidadMedidaRepository;

@RestController
@RequestMapping("/productos")
public class ControladorProductos 
{
	@Autowired
	ProductosRepository repository;
	
	@Autowired
    CategoriasRepository categoriare;
	
	@Autowired
    UnidadMedidaRepository unidadre;
	
	@Autowired
    MarcasRepository marcare;
	
	@GetMapping("/viewproducts")
    public List<Productos> getProductos()
    {
    	return (List<Productos>) repository.findAll();
    }
	
	@GetMapping("/viewproducts/{codProducto}")
    public ResponseEntity<Productos> getProductoId(@PathVariable int codProducto)
    {
    	Optional<Productos> opt = repository.findById(Long.valueOf(codProducto));
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
    public ResponseEntity<?> RegistrarProducto(@RequestBody ProductoRequest productoRequest)
	{
        try 
        {   
        	if (repository.existsByNombre(productoRequest.getNombre())) {
                throw new RuntimeException("Error: Un producto con esta nombre ya existe.");
            }
        	
            Set <Categorias> categoria = new HashSet<>();
            for (Long CodCategoria : productoRequest.getCodCategoria()) 
            {
                Categorias cate = categoriare.findById(CodCategoria)
    	                .orElseThrow(() -> new RuntimeException("Categoria no encontrada"));
                categoria.add(cate);
            }
            
            Set <Marcas> marca = new HashSet<>();
            for (Long CodMarca : productoRequest.getCodMarca()) 
            {
                Marcas mar = marcare.findById(CodMarca)
    	                .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
                marca.add(mar);
            }
                        
            Set <UnidadMedida> unidad = new HashSet<>();
            for (Long CodMedida : productoRequest.getUnidad()) 
            {
                UnidadMedida medida = unidadre.findById(CodMedida)
                		.orElseThrow(() -> new NoSuchElementException("Unidad no encontrada"));
                unidad.add(medida);
            }
                        
                        
            Productos producto = new Productos();
            producto.setNombre(productoRequest.getNombre());
            producto.setPrecioCompra(productoRequest.getPrecioCompra());
            producto.setPrecioVenta(productoRequest.getPrecioVenta());
            producto.setStock(productoRequest.getStock());
            producto.setCodCategoria(categoria);
            producto.setCodMarca(marca);
            producto.setUnidad(unidad);
            producto.setObservacion(productoRequest.getObservacion());
            repository.save(producto);
            return ResponseEntity.ok().body("{\"message\": \"Producto registrado con exito.\"}");
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error en la creacion del producto: " + e.getMessage());
        }
    }
	
	@PutMapping("/update/{codProducto}")
	public ResponseEntity<String> actualizarProducto(@PathVariable int codProducto, @RequestBody ProductoRequest productoRequest)
	{
	    try 
	    {
	    	Productos productoExistente = repository.findById(Long.valueOf(codProducto))
	                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
	        
	    	if (repository.existsByNombre(productoRequest.getNombre())) {
                throw new RuntimeException("Error: Un producto con esta nombre ya existe.");
            }
	    	
	        productoExistente.setNombre(productoRequest.getNombre());
	        productoExistente.setPrecioCompra(productoRequest.getPrecioCompra());
	        productoExistente.setPrecioVenta(productoRequest.getPrecioVenta());
	        productoExistente.setStock(productoRequest.getStock());
            	            
            repository.save(productoExistente);
            
	        return ResponseEntity.ok().body("{\"message\": \"Producto actualizado con éxito.\"}");
	    } 
	    catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar el producto: " + e.getMessage());
	    }
	}
	
	@PutMapping("/stock/{codProducto}")
	public ResponseEntity<String> actualizarStockPC(@PathVariable int codProducto, @RequestBody ProductoRequest productoRequest)
	{
	    try 
	    {
	    	Productos productoExistente = repository.findById(Long.valueOf(codProducto))
	                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
	        
	        
	        productoExistente.setPrecioCompra(productoRequest.getPrecioCompra());
	        productoExistente.setStock(productoExistente.getStock() + productoRequest.getStock());
            	            
            repository.save(productoExistente);
            
	        return ResponseEntity.ok().body("{\"message\": \"Producto actualizado con éxito.\"}");
	    } 
	    catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar el producto: " + e.getMessage());
	    }
	}
	
	@DeleteMapping("/delete/{codProducto}")
	public ResponseEntity<Productos> BorrarProducto(@PathVariable int codProducto)
	{
		if (codProducto == 0 || !repository.existsById(Long.valueOf(codProducto))) 
		{
    		return ResponseEntity.badRequest().build();
		}
		Productos productoExistente = repository.findById(Long.valueOf(codProducto))
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        productoExistente.setObservacion("Inactivo");
        repository.save(productoExistente);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/activate/{codProducto}")
	public ResponseEntity<Productos> ActivarProducto(@PathVariable int codProducto)
	{
		if (codProducto == 0 || !repository.existsById(Long.valueOf(codProducto))) 
		{
    		return ResponseEntity.badRequest().build();
		}
		Productos productoExistente = repository.findById(Long.valueOf(codProducto))
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        productoExistente.setObservacion("Activo");
        repository.save(productoExistente);
		return ResponseEntity.noContent().build();
	}
}

package com.marketin.main.controller.seguridad;
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

import com.marketin.main.Request.EmpleadoRequest;
import com.marketin.main.models.Empleado;
import com.marketin.main.repository.EmpleadoRepository;
import com.marketin.main.services.AuthService;

@RestController
@RequestMapping("/empleado")
public class ControladorEmpleado 
{
	@Autowired
	EmpleadoRepository repository;
	
	@Autowired
    AuthService authService;
	
	@GetMapping("/viewuser")
    public List<Empleado> getUser()
    {
    	return (List<Empleado>) repository.findAll();
    }
	
	@GetMapping("/viewuser/{dni}")
    public ResponseEntity<Empleado> getUserDNI(@PathVariable String dni)
    {
    	Optional<Empleado> opt = repository.findByEmpleadoDni(dni);
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
    public ResponseEntity<?> RegistrarEmpleado(@RequestBody EmpleadoRequest empleadoRequest){
        try 
        {
            authService.registrarEmpleado(empleadoRequest);
            return ResponseEntity.ok().body("{\"message\": \"Usuario registrado con exito.\"}");
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error en la creacion del empleado: " + e.getMessage());
        }
    }
	
	@PutMapping("/update/{dni}")
	public ResponseEntity<String> actualizarEmpleado(@PathVariable String dni, @RequestBody EmpleadoRequest empleadoRequest)
	{
	    try 
	    {
	        authService.actualizarEmpleado(dni, empleadoRequest);
	        return ResponseEntity.ok().body("{\"message\": \"Usuario actualizado con éxito.\"}");
	    } 
	    catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el usuario: " + e.getMessage());
	    }
	}
	
	@DeleteMapping("/delete/{dni}")
	public ResponseEntity<Empleado> BorrarEmpleado(@PathVariable String dni)
	{
		if (dni == null || !repository.existsById(dni)) 
		{
    		return ResponseEntity.badRequest().build();
		}
		
		Empleado empleadoExistente = repository.findByEmpleadoDni(dni)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        empleadoExistente.setObservacion("Inactivo");
        repository.save(empleadoExistente);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/activate/{dni}")
	public ResponseEntity<Empleado> ActivarEmpleado(@PathVariable String dni)
	{
		if (dni == null || !repository.existsById(dni)) 
		{
    		return ResponseEntity.badRequest().build();
		}
		
		Empleado empleadoExistente = repository.findByEmpleadoDni(dni)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        empleadoExistente.setObservacion("Activo");
        repository.save(empleadoExistente);
		return ResponseEntity.noContent().build();
	}
}

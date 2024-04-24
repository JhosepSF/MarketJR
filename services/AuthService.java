package com.marketin.main.services;


import com.marketin.main.Request.EmpleadoRequest;
import com.marketin.main.models.Empleado;
import com.marketin.main.models.Perfil;
import com.marketin.main.repository.EmpleadoRepository;
import com.marketin.main.repository.PerfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthService 
{
    @Autowired
    EmpleadoRepository empleadoRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private PerfilRepository perfilRepository;

    public void registrarEmpleado(EmpleadoRequest empleadoRequest)
    {
    	if (empleadoRepository.existsByEmpleadoDni(empleadoRequest.getEmpleadodni())) {
            throw new RuntimeException("Error: El empleado con este DNI ya está registrado.");
        }
    	
        String encodedPassword = passwordEncoder.encode(empleadoRequest.getEmpleadoPassword());
        Set<Perfil> authorities = new HashSet<>();
        for (Long perfilid : empleadoRequest.getPerfiles()) 
        {
            Perfil perfil = perfilRepository.findById(perfilid).orElseThrow(() ->
                    new RuntimeException("Error: Perfil is not found."));
            authorities.add(perfil);
        }
        Empleado empleado = new Empleado();
        empleado.setEmpleadoDni(empleadoRequest.getEmpleadodni());
        empleado.setEmpleadoApellidos(empleadoRequest.getEmpleadoapellidos());
        empleado.setEmpleadoNombre(empleadoRequest.getEmpleadonombre());
        empleado.setEmpleadoMail(empleadoRequest.getEmpleadomail());
        empleado.setEmpleadoDirection(empleadoRequest.getEmpleadodireccion());
        empleado.setEmpleadoTelefono(empleadoRequest.getEmpleadoTelefono());
        empleado.setEmpleadoPassword(encodedPassword);
        empleado.setPerfiles(authorities);
        empleado.setObservacion(empleadoRequest.getObservacion());
        empleadoRepository.save(empleado);
    }
    
    public void actualizarEmpleado(String dni, EmpleadoRequest empleadoRequest) 
    {
        Empleado empleadoExistente = empleadoRepository.findByEmpleadoDni(dni)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
        
        String encodedPassword = passwordEncoder.encode(empleadoRequest.getEmpleadoPassword());
        empleadoExistente.setEmpleadoNombre(empleadoRequest.getEmpleadonombre());
        empleadoExistente.setEmpleadoApellidos(empleadoRequest.getEmpleadoapellidos());
        empleadoExistente.setEmpleadoMail(empleadoRequest.getEmpleadomail());
        empleadoExistente.setEmpleadoDirection(empleadoRequest.getEmpleadodireccion());
        empleadoExistente.setEmpleadoTelefono(empleadoRequest.getEmpleadoTelefono());
        empleadoExistente.setEmpleadoPassword(encodedPassword);

        empleadoRepository.save(empleadoExistente);
    }
}
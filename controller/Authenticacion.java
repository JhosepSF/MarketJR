package com.marketin.main.controller;

import com.marketin.main.Request.LoginRequest;
import com.marketin.main.models.Empleado;
import com.marketin.main.repository.EmpleadoRepository;
import com.marketin.main.services.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class Authenticacion 
{
    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    AuthService authService;
    
    @Autowired
    EmpleadoRepository repository;
    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request)
    {
        UsernamePasswordAuthenticationToken authReq
                = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
        try 
        {
            Authentication auth = authenticationManager.authenticate(authReq);
            SecurityContext sc = SecurityContextHolder.getContext();
            sc.setAuthentication(auth);
            HttpSession session = request.getSession(true);
            session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, sc);
            return ResponseEntity.ok().body("{\"message\": \"Usuario autenticado con éxito y sesión iniciada.\"}");
        }   
        catch (AuthenticationException e) 
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error en la autenticación: " + e.getMessage());
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        try 
        {
            request.getSession().invalidate();
            return ResponseEntity.ok().body("{\"message\": \"Sesión cerrada con éxito.\"}");
        } 
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al cerrar la sesión: " + e.getMessage());
        }
    }
    
    @GetMapping("/user/{dni}")
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
}
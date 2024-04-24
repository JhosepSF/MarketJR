package com.marketin.main.Configuracion;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.marketin.main.models.Empleado;
import com.marketin.main.models.Perfil;
import com.marketin.main.repository.EmpleadoRepository;
import com.marketin.main.repository.PerfilRepository;

@Configuration
public class DataInitializer 
{

    @Bean
    CommandLineRunner initializeData(EmpleadoRepository empleadoRepository, PerfilRepository perfilRepository, PasswordEncoder passwordEncoder) 
    {
        return args ->
        {
            Perfil perfilGerente = new Perfil(1, "GERENTE");
            Perfil perfilCajero = new Perfil(2, "CAJERO");
            Perfil perfilAlmacenero = new Perfil(3, "ALMACENERO");

            perfilRepository.saveAll(List.of(perfilGerente, perfilCajero, perfilAlmacenero));

            Empleado empleado = new Empleado();
            empleado.setEmpleadoDni("72394996");
            empleado.setEmpleadoNombre("Jhosep");
            empleado.setEmpleadoApellidos("Sanchez");
            empleado.setEmpleadoMail("jsanchezf@alumno.unsm.edu.pe");
            empleado.setEmpleadoDirection("Jr. Leoncio Prado 1475");
            empleado.setEmpleadoTelefono("986644487");
            empleado.setEmpleadoPassword(passwordEncoder.encode("1234567"));
            empleado.setObservacion("Activo");
            Set<Perfil> authorities = new HashSet<>();
            authorities.add(perfilGerente);
            empleado.setPerfiles(authorities);
            empleadoRepository.save(empleado);
        };
    }
}
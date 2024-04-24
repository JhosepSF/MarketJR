package com.marketin.main.Configuracion;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration 
{

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    AuthenticationManager authManager(UserDetailsService detailsService) {
        DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
        daoProvider.setUserDetailsService(detailsService);
        daoProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(daoProvider);
    }
    
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
        http
                .csrf((csrf) -> csrf.disable())
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers(
                    						"/login", "/auth/**", 
                    						"/static/**","/js/**",
                    						"/css/**", "/img/**"
                    					).permitAll();
                    auth.requestMatchers("/menu").hasAnyRole("ALMACENERO","CAJERO","GERENTE");
                    auth.requestMatchers(
                    						"/verusuario", "/usuarioinactivo",
                    						"/empleado/**", "/perfiles/**",
                    						"/reportes", "/reportes/**"
                    					).hasRole("GERENTE");
                    auth.requestMatchers(
                    						"/marcas", "/marca/**",
                    						"/categoria", "/categoria/**",
                    						"/producto", "/productos/**",
                    						"/productoinactivo",
                    						"/unidad", "/unidad/**", 
                    						"/proveedor", "/proveedores/**",
                    						"/proveedorInactivos",
                    						"/compras","/compras/**",
                    						"/registrarcompras"
                    					).hasAnyRole("ALMACENERO","GERENTE");
                    auth.requestMatchers(
                    						"/apertura", "/apertura/**",
                    						"/venta", "/ventas/**",
                    						"/registrarventa", "/registro"
                    					).hasAnyRole("CAJERO","GERENTE");
                    auth.anyRequest().authenticated();
                });
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED));
        http.authenticationManager(authenticationManager);
        return http.build();
    }
}
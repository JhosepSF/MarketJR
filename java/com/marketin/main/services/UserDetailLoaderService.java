package com.marketin.main.services;

import com.marketin.main.Exception.DniNotFoundException;
import com.marketin.main.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserDetailLoaderService implements UserDetailsService 
{
    @Autowired
    private EmpleadoRepository empleadoRepository;
    
    @Override
    public UserDetails loadUserByUsername(String dni) 
    {
       return empleadoRepository.findByEmpleadoDni(dni).orElseThrow(()-> new DniNotFoundException("DNI NO ENCONTRADO"));
    }
}

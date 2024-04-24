package com.marketin.main.controller.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketin.main.models.Perfil;
import com.marketin.main.repository.PerfilRepository;

@RestController
@RequestMapping("/perfiles")
public class ControladorPerfiles 
{
    @Autowired
    PerfilRepository perfilRepository;

    @GetMapping("/listar")
    public List<Perfil> listarPerfiles() {
        return (List<Perfil>) perfilRepository.findAll();
    }
}
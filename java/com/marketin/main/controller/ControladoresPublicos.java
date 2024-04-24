package com.marketin.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ControladoresPublicos 
{
	@GetMapping("/login")
	public String Login()
	{
        return "login.html";
    }

	@GetMapping("/menu")
	public String menu()
	{
		return "menuPrincipal.html";
	}
	
	@GetMapping("/logout")
	public String logout() 
	{
		return "login.html";
	}
}

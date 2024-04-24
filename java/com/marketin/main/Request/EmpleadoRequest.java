package com.marketin.main.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpleadoRequest {
    private String empleadodni;
    private String empleadonombre;
    private String empleadoapellidos;
    private String empleadomail;
    private String empleadodireccion;
    private String empleadoTelefono;
    private String empleadoPassword;
    private Set<Long> perfiles;
    private String observacion;
    
	public String getEmpleadodni() {
		return empleadodni;
	}
	public void setEmpleadodni(String empleadodni) {
		this.empleadodni = empleadodni;
	}
	public String getEmpleadonombre() {
		return empleadonombre;
	}
	public void setEmpleadonombre(String empleadonombre) {
		this.empleadonombre = empleadonombre;
	}
	public String getEmpleadoapellidos() {
		return empleadoapellidos;
	}
	public void setEmpleadoapellidos(String empleadoapellidos) {
		this.empleadoapellidos = empleadoapellidos;
	}
	public String getEmpleadomail() {
		return empleadomail;
	}
	public void setEmpleadomail(String empleadomail) {
		this.empleadomail = empleadomail;
	}
	public String getEmpleadodireccion() {
		return empleadodireccion;
	}
	public void setEmpleadodireccion(String empleadodireccion) {
		this.empleadodireccion = empleadodireccion;
	}
	public String getEmpleadoTelefono() {
		return empleadoTelefono;
	}
	public void setEmpleadoTelefono(String empleadoTelefono) {
		this.empleadoTelefono = empleadoTelefono;
	}
	public String getEmpleadoPassword() {
		return empleadoPassword;
	}
	public void setEmpleadoPassword(String empleadoPassword) {
		this.empleadoPassword = empleadoPassword;
	}
	public Set<Long> getPerfiles() {
		return perfiles;
	}
	public void setPerfiles(Set<Long> perfiles) {
		this.perfiles = perfiles;
	}
	public String getObservacion() {
		return observacion;
	}
	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}   
}

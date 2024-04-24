package com.marketin.main.models;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@AllArgsConstructor
@Entity
@Table(name="Empleado")
public class Empleado implements UserDetails 
{

	private static final long serialVersionUID = 1L;

	@Id
	@NotBlank
	@Size(min = 8, max = 8, message = "El DNI debe tener exactamente 8 caracteres")
	private String empleadoDni;
	
	@NotBlank
	String empleadoNombre;
	@NotBlank
	String empleadoApellidos;

	@Email
	@NotBlank
	@Size( max = 80 )
	String empleadoMail;
	String observacion;
	String empleadoDirection;
	
	@NotBlank
	@Size(min = 9, max = 9, message = "El telefono debe tener 9 digitos")
	private String empleadoTelefono;
	
	
	@NotBlank
	@Size(min = 6, max = 255, message = "La contraseña tiene que tener entre 6 a 12 caracteres")
	private String empleadoPassword;

	@ManyToMany(fetch = FetchType.EAGER, targetEntity = Perfil.class, cascade = CascadeType.PERSIST)
	@JoinTable(name = "Empleado_Perfil", joinColumns = @JoinColumn(name = "empleadoId"), inverseJoinColumns = @JoinColumn(name="perfilId"))
	private Set<Perfil> perfiles;
	
	public Empleado()
	{
		perfiles = new HashSet<>();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return perfiles;
	}

	@Override
	public String getPassword() {
		return empleadoPassword;
	}


	@Override
	public String getUsername() {
		return empleadoDni;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public String getEmpleadoDni() {
		return empleadoDni;
	}

	public void setEmpleadoDni(String empleadoDni) {
		this.empleadoDni = empleadoDni;
	}

	public String getEmpleadoNombre() {
		return empleadoNombre;
	}

	public void setEmpleadoNombre(String empleadoNombre) {
		this.empleadoNombre = empleadoNombre;
	}

	public String getEmpleadoApellidos() {
		return empleadoApellidos;
	}

	public void setEmpleadoApellidos(String empleadoApellidos) {
		this.empleadoApellidos = empleadoApellidos;
	}

	public String getEmpleadoMail() {
		return empleadoMail;
	}

	public void setEmpleadoMail(String empleadoMail) {
		this.empleadoMail = empleadoMail;
	}

	public String getEmpleadoDirection() {
		return empleadoDirection;
	}

	public void setEmpleadoDirection(String empleadoDirection) {
		this.empleadoDirection = empleadoDirection;
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

	public Set<Perfil> getPerfiles() {
		return perfiles;
	}

	public void setPerfiles(Set<Perfil> perfiles) {
		this.perfiles = perfiles;
	}
	
	public String getObservacion() {
		return observacion;
	}

	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}

	public void Empleado1(){}
}
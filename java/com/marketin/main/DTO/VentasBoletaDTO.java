package com.marketin.main.DTO;

import java.sql.Date;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class VentasBoletaDTO
{
	Long ventaId;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    Date fecha;

    @JsonFormat(pattern = "HH:mm")
    LocalTime hora;

    double monto;
    double vuelto;
    String metodo;
    String tipoComprobante;

    String empleadonombre;
    String dninombre;
    String rucnombre;
    
    String nombreDia;
    String nombreMes;
    String nombreAno;

    public VentasBoletaDTO() {}

    public VentasBoletaDTO(Long ventaId, Date fecha, LocalTime hora, 
    				 double monto, double vuelto, String metodo, 
    				 String tipoComprobante, String dniEmpleadoId, 
    				 String dniClienteId, String rucClienteId,
    				 String nombredia, String nombremes, String nombreano) 
    {
        this.ventaId = ventaId;
        this.fecha = fecha;
        this.hora = hora;
        this.monto = monto;
        this.vuelto = vuelto;
        this.metodo = metodo;
        this.tipoComprobante = tipoComprobante;
        this.empleadonombre = dniEmpleadoId;
        this.dninombre= dniClienteId;
        this.rucnombre = rucClienteId;
        this.nombreDia = nombredia;
        this.nombreMes = nombremes;
        this.nombreAno = nombreano;
    }

    public Long getVentaId() {
        return ventaId;
    }

    public void setVentaId(Long ventaId) {
        this.ventaId = ventaId;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public double getMonto() {
        return monto;
    }

    public void setMonto(double monto) {
        this.monto = monto;
    }

    public double getVuelto() {
        return vuelto;
    }

    public void setVuelto(double vuelto) {
        this.vuelto = vuelto;
    }

    public String getMetodo() {
		return metodo;
	}

	public void setMetodo(String metodo) {
		this.metodo = metodo;
	}

	public String getTipoComprobante() {
        return tipoComprobante;
    }

    public void setTipoComprobante(String tipoComprobante) {
        this.tipoComprobante = tipoComprobante;
    }

	public String getEmpleadonombre() {
		return empleadonombre;
	}

	public void setEmpleadonombre(String empleadonombre) {
		this.empleadonombre = empleadonombre;
	}

	public String getDninombre() {
		return dninombre;
	}

	public void setDninombre(String dninombre) {
		this.dninombre = dninombre;
	}

	public String getRucnombre() {
		return rucnombre;
	}

	public void setRucnombre(String rucnombre) {
		this.rucnombre = rucnombre;
	}

	public String getNombreDia() {
		return nombreDia;
	}

	public void setNombreDia(String nombreDia) {
		this.nombreDia = nombreDia;
	}

	public String getNombreMes() {
		return nombreMes;
	}

	public void setNombreMes(String nombreMes) {
		this.nombreMes = nombreMes;
	}

	public String getNombreAno() {
		return nombreAno;
	}

	public void setNombreAno(String nombreAno) {
		this.nombreAno = nombreAno;
	}
}

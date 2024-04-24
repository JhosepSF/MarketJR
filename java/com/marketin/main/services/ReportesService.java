package com.marketin.main.services;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketin.main.DTO.ComprasDTO;
import com.marketin.main.DTO.GananciasDTO;
import com.marketin.main.DTO.VentasBoletaDTO;
import com.marketin.main.DTO.VentasFacturaDTO;
import com.marketin.main.models.Compras;
import com.marketin.main.models.Productos;
import com.marketin.main.models.ReporteDiario;
import com.marketin.main.models.VentasBoleta;
import com.marketin.main.models.VentasFactura;
import com.marketin.main.repository.ComprasRepository;
import com.marketin.main.repository.ProductosRepository;
import com.marketin.main.repository.ReporteDiarioRepository;
import com.marketin.main.repository.VentasBoletaRepository;
import com.marketin.main.repository.VentasFacturaRepository;

@Service
public class ReportesService 
{
	@Autowired
	VentasBoletaRepository boletas;
	
	@Autowired
	VentasFacturaRepository facturas;
	
	@Autowired
	ComprasRepository comprarepo;
	
	@Autowired
	ProductosRepository productorepo;
	
	@Autowired
	ReporteDiarioRepository diario;
	
	public List<VentasBoletaDTO> getVentasBoletaDTO()
	{
		List<VentasBoleta> ventas = (List<VentasBoleta>) boletas.findAll();
		
		List<VentasBoletaDTO> ventasDTOList = new ArrayList<>();
		String tipo = "";
	    
		for (VentasBoleta venta : ventas) 
	    {
	        String empleadonombre = venta.getDniempleado() != null ? venta.getDniempleado().getEmpleadoNombre() : null;
	        String dninombre = venta.getDnicliente() != null ? venta.getDnicliente().getNombre() : null;
	        String rucnombre = venta.getRuccliente() != null ? venta.getRuccliente().getRazonSocial() : null;
	        String metodo = venta.getTarjeta() + " " + venta.getYape() + " " + venta.getEfectivo();
	        String nombreDia = obtenerNombreDia(venta.getFecha());
	        String nombreMes = obtenerNombreMes(venta.getFecha());
	        String nombreAno = obtenerNombreAno(venta.getFecha());
	        
	        if (venta.getTipocomprobante().equals("factura")) 
	        {
	        	tipo = "Factura";
	        }
	        
	        else if (venta.getTipocomprobante().equals("boleta")) 
	        {
	        	tipo = "Boleta";
	        }
	        
	        VentasBoletaDTO dto = new VentasBoletaDTO
	        (
	            venta.getVentaId(),
	            venta.getFecha(),
	            venta.getHora(),
	            venta.getMonto(),
	            venta.getVuelto(),
	            metodo,
	            tipo,
	            empleadonombre,
	            dninombre,
	            rucnombre,
	            nombreDia,
	            nombreMes,
	            nombreAno
	        );
	        
	        ventasDTOList.add(dto);
	    }

	    return ventasDTOList;
	}
	
	public List<VentasFacturaDTO> getVentasFacturaDTO()
	{
		List<VentasFactura> ventas = (List<VentasFactura>) facturas.findAll();
		
		List<VentasFacturaDTO> ventasDTOList = new ArrayList<>();
		String tipo = "";
	    
		for (VentasFactura venta : ventas) 
	    {
	        String empleadonombre = venta.getDniempleado() != null ? venta.getDniempleado().getEmpleadoNombre() : null;
	        String dninombre = venta.getDnicliente() != null ? venta.getDnicliente().getNombre() : null;
	        String rucnombre = venta.getRuccliente() != null ? venta.getRuccliente().getRazonSocial() : null;
	        String metodo = venta.getTarjeta() + " " + venta.getYape() + " " + venta.getEfectivo();
	        String nombreDia = obtenerNombreDia(venta.getFecha());
	        String nombreMes = obtenerNombreMes(venta.getFecha());
	        String nombreAno = obtenerNombreAno(venta.getFecha());
	        
	        if (venta.getTipocomprobante().equals("factura")) 
	        {
	        	tipo = "Factura";
	        }
	        
	        else if (venta.getTipocomprobante().equals("boleta")) 
	        {
	        	tipo = "Boleta";
	        }
	        
	        VentasFacturaDTO dto = new VentasFacturaDTO
	        (
	            venta.getVentaId(),
	            venta.getFecha(),
	            venta.getHora(),
	            venta.getMonto(),
	            venta.getVuelto(),
	            metodo,
	            tipo,
	            empleadonombre,
	            dninombre,
	            rucnombre,
	            nombreDia,
	            nombreMes,
	            nombreAno
	        );
	        
	        ventasDTOList.add(dto);
	    }

	    return ventasDTOList;
	}
	
	public List<ComprasDTO> getComprasDTO()
	{
		List<Compras> compras = (List<Compras>) comprarepo.findAll();
	    List<ComprasDTO> comprasDTOList = new ArrayList<>();
	    
	    for (Compras compra : compras) 
	    {
	        String razonSocial = compra.getRucproveedor() != null ? compra.getRucproveedor().getRazonSocial() : null;
	        
	        String nombreDia = obtenerNombreDia(compra.getFechaCompra());
	        String nombreMes = obtenerNombreMes(compra.getFechaCompra());
	        String nombreAno = obtenerNombreAno(compra.getFechaCompra());
	        
	        ComprasDTO dto = new ComprasDTO(compra.getCodCompra(), compra.getTipoComprobante(),
	                compra.getFechaCompra(), compra.getMonto(), compra.getDeuda(),
	                compra.getEstado(), razonSocial, nombreDia, nombreMes, nombreAno);

	        comprasDTOList.add(dto);
	    }
	    
	    return comprasDTOList;
	}
	
	public List<GananciasDTO> getGananciasDTO()
	{
		List<ReporteDiario> repo = (List<ReporteDiario>)diario.findAll();
		List<GananciasDTO> gananciasdto = new ArrayList<>();
		
		for(ReporteDiario diario : repo) 
		{
			String nombreDia = obtenerNombreDia(diario.getFecha());
	        String nombreMes = obtenerNombreMes(diario.getFecha());
	        String nombreAno = obtenerNombreAno(diario.getFecha());
	        
	        GananciasDTO dto = new GananciasDTO
    		(
    			diario.getFecha(),
    			diario.getMontoapertura(),
    			diario.getMontocierre(),
    			diario.getSaldo(),
    			nombreDia,
    			nombreMes,
    			nombreAno
    		);
	        
	        gananciasdto.add(dto);
		}
		
		return gananciasdto;
	}
	
	public List<Productos> getProductos()
    {
    	return (List<Productos>) productorepo.findAll();
    }
	
	private String obtenerNombreMes(Date fecha) 
	{
	    Calendar cal = Calendar.getInstance();
	    cal.setTime(fecha);
	    int numeroMes = cal.get(Calendar.MONTH);

	    String[] nombresMeses = 
	    {
	        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
	        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
	    };

	    return nombresMeses[numeroMes];
	}
	
	private String obtenerNombreAno(Date fecha) 
	{
	    Calendar cal = Calendar.getInstance();
	    cal.setTime(fecha);
	    int ano = cal.get(Calendar.YEAR);

	    return String.valueOf(ano);
	}
	
	private String obtenerNombreDia(Date fecha) 
	{
	    Calendar cal = Calendar.getInstance();
	    cal.setTime(fecha);
	    int dia = cal.get(Calendar.DAY_OF_MONTH);

	    return String.valueOf(dia);
	}
}

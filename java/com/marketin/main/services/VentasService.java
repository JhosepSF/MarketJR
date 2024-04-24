package com.marketin.main.services;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketin.main.DTO.DetalleVentaDTO;
import com.marketin.main.DTO.VentasBoletaDTO;
import com.marketin.main.DTO.VentasFacturaDTO;
import com.marketin.main.Request.DetalleVentaRequest;
import com.marketin.main.Request.ProductoRequest;
import com.marketin.main.Request.VentaRequest;
import com.marketin.main.models.Categorias;
import com.marketin.main.models.Cliente;
import com.marketin.main.models.DetalleVenta;
import com.marketin.main.models.Empleado;
import com.marketin.main.models.Marcas;
import com.marketin.main.models.Productos;
import com.marketin.main.models.UnidadMedida;
import com.marketin.main.models.VentasBoleta;
import com.marketin.main.models.VentasFactura;
import com.marketin.main.repository.CategoriasRepository;
import com.marketin.main.repository.ClienteRepository;
import com.marketin.main.repository.DetalleVentaRepository;
import com.marketin.main.repository.EmpleadoRepository;
import com.marketin.main.repository.MarcasRepository;
import com.marketin.main.repository.ProductosRepository;
import com.marketin.main.repository.UnidadMedidaRepository;
import com.marketin.main.repository.VentasBoletaRepository;
import com.marketin.main.repository.VentasFacturaRepository;

@Service
public class VentasService 
{
	@Autowired
	VentasBoletaRepository boletas;
	
	@Autowired
	VentasFacturaRepository facturas;
	
	@Autowired
	EmpleadoRepository empleados;
	
	@Autowired
	ClienteRepository clientes;
	
	@Autowired
	ProductosRepository productos;
	
	@Autowired
	DetalleVentaRepository detalles;
	
	@Autowired
	CategoriasRepository categorias;
	
	@Autowired
	MarcasRepository marcas;
	
	@Autowired
	UnidadMedidaRepository unidades;
		
	public List<VentasBoletaDTO> getAllBoletaDTO()
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
	
	public List<VentasFacturaDTO> getAllFacturaDTO()
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
	
	public VentasBoletaDTO getVentasBoletaId(Long codCompra) 
	{
		VentasBoleta venta = boletas.findById(codCompra)
				.orElseThrow(()->new RuntimeException("No se encontro la venta"));
		String tipo = "";
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
		return dto;
	}
	
	public VentasFacturaDTO getVentasFacturaId(Long codCompra) 
	{
		VentasFactura venta = facturas.findById(codCompra)
				.orElseThrow(()->new RuntimeException("No se encontro la venta"));
		String tipo = "";
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
		return dto;
	}
	
	public List<VentasBoleta> getVentaBoletaByEmpleado(String dniempleado)
	{
		Empleado emple = empleados.findById(dniempleado)
				.orElseThrow(()->new RuntimeException("No se encontro al empleado"));
		
		return boletas.findByDniempleado(emple);
	}
	
	public List<VentasBoleta> getVentaBoletaByCliente(String codcliente)
	{
		Cliente clie = clientes.findById(codcliente)
				.orElseThrow(()->new RuntimeException("No se encontro al cliente"));
		
		return boletas.findByDnicliente(clie);
	}
	
	public List<VentasBoleta> getVentaBoletaByFecha(String fecha)
	{
		DateTimeFormatter formatear = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    LocalDate fechald = LocalDate.parse(fecha, formatear);
		Date fechaformateada = (Date.valueOf(fechald));
		
		return boletas.findByFecha(fechaformateada);
	}
	
	public String RegistrarVenta (VentaRequest request) 
	{
		if ("boleta".equals(request.getTipocomprobante()))
		{
			Empleado emple = getEmpleado(request.getNombreempleado());
			
			Cliente clie = clientes.findById(request.getIdcliente())
					.orElseThrow(()->new RuntimeException("No se encontro al cliente"));
			
			VentasBoleta nuevaVenta = new VentasBoleta();
			
			DateTimeFormatter formatear = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		    LocalDate fecha = LocalDate.parse(request.getFecha(), formatear);
			nuevaVenta.setFecha(Date.valueOf(fecha));
		    
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
	        LocalTime horaApertura = LocalTime.parse((CharSequence) request.getHora(), formatter);
			nuevaVenta.setHora(horaApertura);
			
			nuevaVenta.setDniempleado(emple);
			nuevaVenta.setMonto(request.getMonto());
			nuevaVenta.setVuelto(request.getVuelto());
			nuevaVenta.setTarjeta(request.getTarjeta());
			nuevaVenta.setYape(request.getYape());
			nuevaVenta.setEfectivo(request.getEfectivo());
			nuevaVenta.setTipocomprobante(request.getTipocomprobante());
			nuevaVenta.setDnicliente(clie);
		    boletas.save(nuevaVenta);
		    return "Registrado con dni";
		}
		else if ("factura".equals(request.getTipocomprobante()))
		{
			Empleado emple = getEmpleado(request.getNombreempleado());
			
			Cliente clie = clientes.findById(request.getIdcliente())
					.orElseThrow(()->new RuntimeException("No se encontro al cliente"));
			
			VentasFactura nuevaVenta = new VentasFactura();

			DateTimeFormatter formatear = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		    LocalDate fecha = LocalDate.parse(request.getFecha(), formatear);
			nuevaVenta.setFecha(Date.valueOf(fecha));
			
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
	        LocalTime horaApertura = LocalTime.parse((CharSequence) request.getHora(), formatter);
			nuevaVenta.setHora(horaApertura);
		    
			nuevaVenta.setDniempleado(emple);
			nuevaVenta.setMonto(request.getMonto());
			nuevaVenta.setVuelto(request.getVuelto());
			nuevaVenta.setTarjeta(request.getTarjeta());
			nuevaVenta.setYape(request.getYape());
			nuevaVenta.setEfectivo(request.getEfectivo());
			nuevaVenta.setTipocomprobante(request.getTipocomprobante());
			nuevaVenta.setRuccliente(clie);
		    facturas.save(nuevaVenta);
		    return "registrado con ruc";
		}
		return "fallo la creacion";
	}
	
	public Empleado getEmpleado(String nombre) 
	{
		Empleado opt = empleados.findByEmpleadoNombre(nombre);
		return opt;
	}
	
	public void venta(Integer codProducto, ProductoRequest request) 
	{
		Productos productoExistente = productos.findById(Long.valueOf(codProducto))
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        productoExistente.setStock(productoExistente.getStock() - request.getStock());
        	            
        productos.save(productoExistente);
	}
	
	public void guardarDetalleBoleta(DetalleVentaRequest request) 
	{
		VentasBoleta venta = boletas.findById(request.getIdventaboleta())
				.orElseThrow(()->new RuntimeException("No se encontro la venta"));
		
		Productos producto = productos.findById(request.getIdproducto())
				.orElseThrow(()->new RuntimeException("No se encontro el producto"));
		
		DetalleVenta detalle = new DetalleVenta();
		detalle.setIdventaboleta(venta);
		detalle.setIdproducto(producto);
		detalle.setPrecio(request.getPrecio());
		detalle.setCantidad(request.getCantidad());
		detalle.setSubtotal(request.getSubtotal());
		detalles.save(detalle);
	}
	
	public void guardarDetalleFactura(DetalleVentaRequest request) 
	{
		VentasFactura venta = facturas.findById(request.getIdventafactura())
				.orElseThrow(()->new RuntimeException("No se encontro la venta"));
		
		Productos producto = productos.findById(request.getIdproducto())
				.orElseThrow(()->new RuntimeException("No se encontro el producto"));
		
		DetalleVenta detalle = new DetalleVenta();
		detalle.setIdventafactura(venta);
		detalle.setIdproducto(producto);
		detalle.setPrecio(request.getPrecio());
		detalle.setCantidad(request.getCantidad());
		detalle.setSubtotal(request.getSubtotal());
		detalles.save(detalle);
	}
	
	public List<DetalleVentaDTO> getByIdventaboleta(Long idventa)
	{
		String nombrecategoria = "";
		String nombremarca = "";
		String nombreunidad = "";
		
	    List<DetalleVentaDTO> detallesDTO = new ArrayList<>();
		
	    VentasBoleta venta = boletas.findById(idventa)
	            .orElseThrow(() -> new RuntimeException("No se encontró la venta"));

	    List<DetalleVenta> detallesVenta = detalles.findByIdventaboleta(venta);
	    
	    for (DetalleVenta ventas : detallesVenta) 
	    {
	    	Productos producto = productos.findById(ventas.getIdproducto().getProductoId())
	    			.orElseThrow(()-> new RuntimeException("No se encontro el producto"));
	    	
	    	for (Categorias cate : producto.getCodCategoria()) 
	    	{
	    		nombrecategoria = cate.getDescripcion();
	    	}
	    	
	    	for (Marcas marca : producto.getCodMarca()) 
	    	{
	    		nombremarca = marca.getDescripcion();
	    	}
	    	
	    	for (UnidadMedida medida : producto.getUnidad()) 
	    	{
	    		nombreunidad = medida.getDescripcion();
	    	}
	    	
	    	String descripcion = producto.getNombre() + " " +
	    						 nombrecategoria + " " +
	    						 nombremarca + " " +
	    						 nombreunidad + " - " +	
	    						 producto.getProductoId()
	    						 ;
	    	
	        DetalleVentaDTO dto = new DetalleVentaDTO
	        (
                ventas.getCantidad(),
                descripcion,
                ventas.getPrecio(),
                ventas.getSubtotal()
	        );

	        detallesDTO.add(dto);
	    }

	    return detallesDTO;
	}
	
	public List<DetalleVentaDTO> getByIdventafactura(Long idventa)
	{
		String nombrecategoria = "";
		String nombremarca = "";
		String nombreunidad = "";
		
	    List<DetalleVentaDTO> detallesDTO = new ArrayList<>();
		
	    VentasFactura venta = facturas.findById(idventa)
	            .orElseThrow(() -> new RuntimeException("No se encontró la venta"));

	    List<DetalleVenta> detallesVenta = detalles.findByIdventafactura(venta);
	    
	    for (DetalleVenta ventas : detallesVenta) 
	    {
	    	Productos producto = productos.findById(ventas.getIdproducto().getProductoId())
	    			.orElseThrow(()-> new RuntimeException("No se encontro el producto"));
	    	
	    	for (Categorias cate : producto.getCodCategoria()) 
	    	{
	    		nombrecategoria = cate.getDescripcion();
	    	}
	    	
	    	for (Marcas marca : producto.getCodMarca()) 
	    	{
	    		nombremarca = marca.getDescripcion();
	    	}
	    	
	    	for (UnidadMedida medida : producto.getUnidad()) 
	    	{
	    		nombreunidad = medida.getDescripcion();
	    	}
	    	
	    	String descripcion = producto.getNombre() + " " +
	    						 nombrecategoria + " " +
	    						 nombremarca + " " +
	    						 nombreunidad + " - " +	
	    						 producto.getProductoId()
	    						 ;
	    	
	        DetalleVentaDTO dto = new DetalleVentaDTO
	        (
                ventas.getCantidad(),
                descripcion,
                ventas.getPrecio(),
                ventas.getSubtotal()
	        );

	        detallesDTO.add(dto);
	    }

	    return detallesDTO;
	}
}

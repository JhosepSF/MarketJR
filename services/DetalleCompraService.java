package com.marketin.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marketin.main.Request.DetalleCompraRequest;
import com.marketin.main.models.Compras;
import com.marketin.main.models.DetalleCompra;
import com.marketin.main.models.Productos;
import com.marketin.main.repository.ComprasRepository;
import com.marketin.main.repository.DetalleCompraRepository;
import com.marketin.main.repository.ProductosRepository;

@Service
public class DetalleCompraService 
{
	@Autowired
	DetalleCompraRepository repositorio;
	
	@Autowired
	ComprasRepository comprarepo;
	
	@Autowired 
	ProductosRepository productorepo;
	
	public void guardarDetalle (DetalleCompraRequest request)
	{
		Compras compra = comprarepo.findById(request.getIdcompra())
				.orElseThrow(()->new RuntimeException("No se encontro la compra"));
		
		Productos producto = productorepo.findById(request.getIdproducto())
				.orElseThrow(()->new RuntimeException("No se encontro el producto"));
		
		DetalleCompra detalle = new DetalleCompra();
		detalle.setIdcompra(compra);
		detalle.setIdproducto(producto);
		detalle.setPrecio(request.getPrecio());
		detalle.setCantidad(request.getCantidad());
		detalle.setSubtotal(request.getSubtotal());
		repositorio.save(detalle);
	}
}

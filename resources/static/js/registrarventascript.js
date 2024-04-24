//Cancelar
let cancelar = document.getElementById("btnCancelar");
	cancelar.addEventListener("click", function () {
	 	window.location.href = "/venta";
	 });

//Hora, fecha, vendedor, codventa
	var fechaActual = new Date().toLocaleDateString('en-CA');
	var horaActual = new Date().toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'});
	document.getElementById("fecha").value = fechaActual;
	document.getElementById("hora").value = horaActual;
	
	var usuarioText = localStorage.getItem("usuarioText");
    document.getElementById("encarventa").value = usuarioText;
    
    // Realizar la solicitud HTTP
    fetch('http://localhost:8081/ventas/boletas')
        .then(response => response.json())
        .then(data => 
        {
            const cantidadVentas = data.length;
            const nuevoCodVenta = cantidadVentas + 1;
            document.getElementById('codventa').value = nuevoCodVenta;
        })
        .catch(error => console.error('Error al obtener las ventas:', error));
    
//Agregar y borrar filas
function agregarFila()
{
  var table = document
    .getElementById("datatable_users")
    .getElementsByTagName("tbody")[0];

  var newRow = table.insertRow(table.rows.length);
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);

  var uniqueId = "datalistOptions" + table.rows.length;
  cell1.innerHTML = `
    <input class="form-control" list="${uniqueId}" id="input_${uniqueId}" placeholder="Escribe...">
    <datalist id="${uniqueId}">
    </datalist>
  `;
  var precioUnitarioId = "pu" + table.rows.length;
  var cantidadId = "cantidad" + table.rows.length;
  var subtotalid = "subtotal" + table.rows.length;
  
  cell2.contentEditable = true;
  cell3.contentEditable = false;
  cell4.contentEditable = false;
  cell5.contentEditable = false;

  cell2.setAttribute("id", cantidadId);
  cell2.setAttribute("oninput", "validarNumerico(this);");
  cell3.setAttribute("id", precioUnitarioId);
  cell3.setAttribute("oninput", "validarNumerico(this);");
  cell4.setAttribute("id", subtotalid);

  cell5.innerHTML =
    '<button class="btn btn-danger" onclick="eliminarFila(this)"><i class="fas fa-trash"></i> Eliminar</button>';

  var deleteButton = cell5.querySelector("button");
  deleteButton.style.padding = "2px 5px";
  deleteButton.style.display = "inline-block";
  deleteButton.style.width = "70%";
  deleteButton.style.margin = "0 auto";
  
  cargarProductos(uniqueId);
  document.getElementById(`input_${uniqueId}`).addEventListener("change", function() 
  {
	actualizarPU(table.rows.length);
  });
  document.getElementById(cantidadId).addEventListener("input", function() 
  {
	cantidadMax(table.rows.length);
  });
}

function eliminarFila(button) {
  var row = button.closest("tr");
  row.parentNode.removeChild(row);
  calcularSubtotal();
}

//Cargar productos
async function cargarProductos(uniqueId)
{
  try 
  {
    const response = await fetch("http://localhost:8081/productos/viewproducts");
    const productos = await response.json();
    
    const datalistOptions = document.getElementById(uniqueId);
	
   	productos.forEach((producto) => 
   	{
      const option = document.createElement("option");
      option.value = producto.nombre + " " + 
      				 producto.codCategoria[0].descripcion + " " +
      				 producto.codMarca[0].descripcion + " " + 
      				 producto.unidad[0].descripcion + " - " +
      				 producto.productoId;
      datalistOptions.appendChild(option);
    });
  } catch (error) {
    console.error('Error durante la carga de productos:', error);
  }
}

//Carga de la primera fila
document.addEventListener("DOMContentLoaded", cargarProductos("datalistOptions1"));
document.getElementById("cantidad1").addEventListener("input", function() 
  {
	cantidadMax(1);
  });
document.getElementById("input_datalistOptions1").addEventListener("change", function() 
  {
	actualizarPU(1);
  });

//Mandarle un alert con la cantidad maxima
async function cantidadMax(numeroFila) 
{ 
  var selectedValue = document.getElementById(`input_datalistOptions${numeroFila}`).value;
  var parts = selectedValue.split(" - ");
  var productoId = parts[parts.length - 1];
  
  var cantidadmax = await obtenerCantidadPorProducto(productoId);
  var cantidad = parseFloat(document.getElementById(`cantidad${numeroFila}`).textContent);

  if (cantidad > cantidadmax)
  {
	  Swal.fire({
				title: "Se esta sobrepasando la cantidad en stock que tiene un maximo de " + cantidadmax,
				//text: "You clicked the button!",
				icon: "info"
	})
	  document.getElementById(`cantidad${numeroFila}`).textContent = 0;
	  document.getElementById(`subtotal${numeroFila}`).textContent = 0.00;
  }
}

async function obtenerCantidadPorProducto(productoId) 
{
  	try 
	{
		const response = await fetch(`http://localhost:8081/productos/viewproducts/${productoId}`);
		if (!response.ok) 
		{
			return 0;
		}
		
		const productoDetalles = await response.json();
		let stock = productoDetalles.stock;
		return stock;
	}
	catch (error) 
	{
    	console.error('Error durante la obtención de detalles del producto', error);
  	}  	
}

//Actulizar el PU luego de seleccionar el producto
async function actualizarPU(numeroFila) 
{ 
  var selectedValue = document.getElementById(`input_datalistOptions${numeroFila}`).value;
  var parts = selectedValue.split(" - ");
  var productoId = parts[parts.length - 1];
  
  var precio = await obtenerPrecioPorProducto(productoId);  
  document.getElementById(`pu${numeroFila}`).textContent = precio;
  document.getElementById(`cantidad${numeroFila}`).textContent = 0;
  document.getElementById(`subtotal${numeroFila}`).textContent = 0.00;
}

async function obtenerPrecioPorProducto(productoId) 
{
  	try 
	{
		const response = await fetch(`http://localhost:8081/productos/viewproducts/${productoId}`);
		if (!response.ok) 
		{
			return 0;
		}
		
		const productoDetalles = await response.json();
		let precioVenta = productoDetalles.precioVenta;
		return precioVenta;
	}
	catch (error) 
	{
    	console.error('Error durante la obtención de detalles del producto', error);
  	}  	
}


//campos Cliente
document.addEventListener("DOMContentLoaded", function () {
  var tipoComprobante = document.getElementsByName("opcionVenta");
  var datosCliente = document.querySelector(".datos-clientes");

  function actualizarCamposCliente() {
    var tipoSeleccionado = "";
    for (var i = 0; i < tipoComprobante.length; i++) 
    {
      if (tipoComprobante[i].checked) 
      {
        tipoSeleccionado = tipoComprobante[i].value;
        break;
      }
    }
	
	if (tipoSeleccionado == "boleta")
	{
		fetch('http://localhost:8081/ventas/boletas')
        .then(response => response.json())
        .then(data => 
        {
            const cantidadVentas = data.length;
            const nuevoCodVenta = cantidadVentas + 1;
            document.getElementById('codventa').value = nuevoCodVenta;
        })
        .catch(error => console.error('Error al obtener las ventas:', error));
	}
	
	if (tipoSeleccionado == "factura")
	{
		fetch('http://localhost:8081/ventas/facturas')
        .then(response => response.json())
        .then(data => 
        {
            const cantidadVentas = data.length;
            const nuevoCodVenta = cantidadVentas + 1;
            document.getElementById('codventa').value = nuevoCodVenta;
        })
        .catch(error => console.error('Error al obtener las ventas:', error));
	}
	
    // Ocultar todos los conjuntos de campos
    var conjuntosCampos = datosCliente.querySelectorAll(".conjunto-campos");
    conjuntosCampos.forEach(function (conjunto) {
      conjunto.style.display = "none";
    });

    // Mostrar el conjunto de campos correspondiente al tipo seleccionado
    document.getElementById(tipoSeleccionado + "Campos").style.display =
      "block";
  }

  for (var i = 0; i < tipoComprobante.length; i++) {
    tipoComprobante[i].addEventListener("change", actualizarCamposCliente);
  }

  actualizarCamposCliente();
});


//Busqueda del cliente en ruc
async function realizarBusquedaFactura() 
{
    let ruc = document.getElementById("ruc").value;

    try 
    {
        const response = await fetch(`http://localhost:8081/registroventa/cliente/${ruc}`);

        if (!response.ok) 
        {
            await busquedaByRucAPI(ruc);
        } 
        else 
        {
            const detallesFactura = await response.json();
            document.getElementById("raso").value = detallesFactura.razonSocial || '';
        }
    } 
    catch (error) {
        console.error('Error durante la obtención de cliente en la bd', error);
        Swal.fire({
				title: "No se encontró el cliente en la base de datos!",
				//text: "You clicked the button!",
				icon: "info"
			});
    }
}

async function busquedaByRucAPI(ruc) 
{
    try 
    {
        const response = await fetch(`https://dniruc.apisperu.com/api/v1/ruc/${ruc}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRlcmxyZW5naWZvQGdtYWlsLmNvbSJ9.N4REyBveoema1OUAGWs7ZIsU9OrVUNMLM5f-7j1Bb8A`);
        if (!response.ok) 
        {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById("raso").value = data.razonSocial || '';

        await guardarClienteRuc();
    }
    catch (error) 
    {
        console.error("Error en la solicitud en el API:", error);
        Swal.fire({
				title: "No se encontró el RUC!",
				//text: "You clicked the button!",
				icon: "info"
			});
    }
}

async function guardarClienteRuc() 
{
    const cliente = 
    {
        "dniRUC": document.getElementById("ruc").value,
        "razonSocial": document.getElementById("raso").value,
    };
    
    console.log(cliente);
	
    try 
    {
        const response = await fetch(`http://localhost:8081/registroventa/cliente/registro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);

    } 
    catch (error) {
        console.error('Error al crear cliente', error);
    }
}

//Busqueda del cliente en dni
async function realizarBusquedaBoleta()
{
	let dni = document.getElementById("dni").value;

    try 
    {
        const response = await fetch(`http://localhost:8081/registroventa/cliente/${dni}`);

        if (!response.ok) 
        {
            await busquedaByDniAPI(dni);
        } 
        else 
        {
            const detallesBoleta = await response.json();
            document.getElementById("nombre").value = detallesBoleta.nombre || '';
        }
    } 
    catch (error) {
        console.error('Error durante la obtención de cliente en la bd', error);
        Swal.fire({
				title: "No se encontró al cliente en la base de datos!",
				//text: "You clicked the button!",
				icon: "info"
			});
    }
}

async function busquedaByDniAPI(dni)
{
	const response = await fetch
	(
		"https://dniruc.apisperu.com/api/v1/dni/"+ dni + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRlcmxyZW5naWZvQGdtYWlsLmNvbSJ9.N4REyBveoema1OUAGWs7ZIsU9OrVUNMLM5f-7j1Bb8A"
	)
    if (!response.ok) 
    {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    document.getElementById("nombre").value = data.nombres || '';

    await guardarClienteDNI();
}

async function guardarClienteDNI() 
{
    const cliente = 
    {
        "dniRUC": document.getElementById("dni").value,
        "nombre": document.getElementById("nombre").value,
    };	
    try 
    {
        const response = await fetch(`http://localhost:8081/registroventa/cliente/registro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } 
    catch (error) {
        console.error('Error al crear cliente', error);
    }
}

//Opciones pago
document.addEventListener("DOMContentLoaded", function ()
{
  var metodoPagoCheckboxes = document.getElementsByName("opcionPago");
  var pagosTarjetaInput = document.getElementById("pagosTarjeta");
  var pagosYapeInput = document.getElementById("pagosYape");
  var pagosEfectivoInput = document.getElementById("pagosEfectivo");
  var vuelto = document.getElementById("vuelto");
  var total = document.getElementById("total");

  // Inicialmente deshabilita los campos de texto
  pagosTarjetaInput.disabled = true;
  pagosYapeInput.disabled = true;
  pagosEfectivoInput.disabled = true;
  vuelto.disabled = true;

  function actualizarCamposMetodoPago() 
  {
    // Deshabilita todos los campos de texto al inicio
    pagosTarjetaInput.disabled = true;
    pagosYapeInput.disabled = true;
    pagosEfectivoInput.disabled = true;
    vuelto.disabled = true;

    // Habilita los campos correspondientes a los métodos de pago seleccionados
    for (var i = 0; i < metodoPagoCheckboxes.length; i++)
    {
      if (metodoPagoCheckboxes[i].checked) 
      {
        if (metodoPagoCheckboxes[i].value === "tarjeta") 
        {
          pagosTarjetaInput.disabled = false;
        }
        else if (metodoPagoCheckboxes[i].value === "yape") 
        {
          pagosYapeInput.disabled = false;
        } 
        else if (metodoPagoCheckboxes[i].value === "efectivo") 
        {
          pagosEfectivoInput.disabled = false;
        }
      }
    }
  }

  function obtenerPagos()
  {
	var cantidadchecks = 0;

    for (var i = 0; i < metodoPagoCheckboxes.length; i++) 
    {
      if(metodoPagoCheckboxes[i].checked)
      {
	    cantidadchecks++;
	  }
    }
    
    switch(cantidadchecks)
    {
		case 1:
			
			if(metodoPagoCheckboxes[0].checked)
			{
			  pagosEfectivoInput.value = 0;
			  pagosYapeInput.value = 0;
			  document.getElementById("vuelto").value = 0;
			}
			
			else if(metodoPagoCheckboxes[1].checked)
			{
			  pagosTarjetaInput.value = 0;
			  pagosEfectivoInput.value = 0;
			  document.getElementById("vuelto").value = 0;
			}
			
			else if(metodoPagoCheckboxes[2].checked)
			{
			  pagosTarjetaInput.value = 0;
			  pagosYapeInput.value = 0;
			  var valorvuelto = parseFloat(pagosEfectivoInput.value || 0) - parseFloat(total.value || 0);
			  document.getElementById("vuelto").value = valorvuelto;
			}
			
		break;
		
		case 2:
			
			if(metodoPagoCheckboxes[0].checked && metodoPagoCheckboxes[1].checked)
			{
			  pagosEfectivoInput.value = 0;
			  document.getElementById("vuelto").value = 0;
			}
			
			else if(metodoPagoCheckboxes[1].checked && metodoPagoCheckboxes[2].checked)
			{
			  pagosTarjetaInput.value = 0;
			  document.getElementById("vuelto").value = 0;
			}
			
			else if(metodoPagoCheckboxes[2].checked && metodoPagoCheckboxes[0].checked)
			{
			  pagosYapeInput.value = 0;
			  document.getElementById("vuelto").value = 0;
			}
			
		break;	
	}
  }

  // Agrega el evento a cada checkbox de método de pago
  for (var i = 0; i < metodoPagoCheckboxes.length; i++) 
  {
    metodoPagoCheckboxes[i].addEventListener("change", actualizarCamposMetodoPago);
  }

  // Agrega el evento de cambio a los campos de texto
  pagosTarjetaInput.addEventListener("change", obtenerPagos);
  pagosYapeInput.addEventListener("change", obtenerPagos);
  pagosEfectivoInput.addEventListener("change", obtenerPagos);

  // Llamada inicial para asegurar que los campos se actualicen correctamente
  actualizarCamposMetodoPago();
});

//Calculos
function actualizarSubtotalDinamico(cells) {
  var cantidad = parseFloat(cells[1].innerText) || 0;
  var precioUnitario = parseFloat(cells[2].innerText) || 0;

  if (isNaN(cantidad) || isNaN(precioUnitario)) {
    cells[3].innerText = "0.00";
  } else {
    cells[3].innerText = (cantidad * precioUnitario).toFixed(2);
  }
  calcularSubtotal();
}
function validarNumerico(input)
{
  var valor = input.innerText.replace(/[^\d.]/g, "");  
  var cursorPosition = getCaretPosition(input);

  input.innerText = valor;
  setCaretPosition(input, cursorPosition);
  
  var cells = input.parentNode.getElementsByTagName("td");
  setTimeout(function () {
    actualizarSubtotalDinamico(cells);
  }, 0);
}
document.addEventListener("input", function (event) {
  var target = event.target;
  if (
    target.tagName === "TD" &&
    (target.cellIndex === 1 || target.cellIndex === 2)
  ) {
    validarNumerico(target);
  }
});

document.addEventListener("input", function (event) {
  var target = event.target;
  if (
    target.tagName === "TD" &&
    (target.cellIndex === 1 || target.cellIndex === 2)
  ) {
    var cells = target.parentNode.getElementsByTagName("td");
    actualizarSubtotalDinamico(cells);
  }
});

function calcularSubtotal() {
  var table = document.getElementById("datatable_users");
  var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

  var subtotalTotal = 0;

  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    var cantidad = parseFloat(cells[1].innerText.replace(/[^\d.]/g, "")) || 0;
    var precioUnitario =
      parseFloat(cells[2].innerText.replace(/[^\d.]/g, "")) || 0;
    subtotalTotal += cantidad * precioUnitario;
  }

  var totalDiv = document.getElementById("total");
  if (totalDiv) {
    totalDiv.value = subtotalTotal.toFixed(2);
  }

  return subtotalTotal;
}

function actualizarSubtotal(cell, cantidad, precioUnitario) {
  if (cantidad !== 0 && precioUnitario !== 0) {
    cell.innerText = (cantidad * precioUnitario).toFixed(2);
  } else {
    // para q el subtotal se actualice a 0 cuando no hay valores en las celsad
    cell.innerText = "0.00";
  }
}

function calcularSubtotalTotal() {
  var table = document.getElementById("datatable_users");
  var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

  var subtotalTotal = 0;

  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    var cantidad = parseFloat(cells[1].innerText.replace(/[^\d.]/g, "")) || 0;
    var precioUnitario =
      parseFloat(cells[2].innerText.replace(/[^\d.]/g, "")) || 0;
    subtotalTotal += cantidad * precioUnitario;
  }

  //suma del subtotal en el div de abajo
  var totalDiv = document.getElementById("total");
  if (totalDiv) {
    totalDiv.value = subtotalTotal.toFixed(2);
  }

  return subtotalTotal;
}

function getCaretPosition(element) {
  return element.innerText.length;
}

function setCaretPosition(element, position) {
  var range = document.createRange();
  var selection = window.getSelection();
  range.setStart(element.childNodes[0], position);
  range.setEnd(element.childNodes[0], position);
  selection.removeAllRanges();
  selection.addRange(range);
}

const GrabarButton = document.getElementById("btnGrabar");
GrabarButton.addEventListener("click", async () => {
	if(validaciones())
	{
		await grabarDatos();
	}
    else
    {
		Swal.fire({
				title: "Todos los campos tienen que ser rellenados!",
				//text: "You clicked the button!",
				icon: "error"
			});
	}
});

function validaciones()
{
	var tabla = document
    .getElementById("datatable_users")
    .getElementsByTagName("tbody")[0];
	for (let i = 1; i <= tabla.rows.length; i++) 
	{
	    let fila = tabla.rows[i-1];
		let celda1 = fila.cells[0];
	    let celda2 = fila.cells[1];
	    let celda3 = fila.cells[2];
		
		let valorCelda1Elemento = celda1.querySelector("input, div");
		let valorCelda1 = valorCelda1Elemento ? valorCelda1Elemento.value : '';	 
		   
		let valorCelda2Elemento = celda2.querySelector("input");
		let valorCelda2 = valorCelda2Elemento ? valorCelda2Elemento.value : '';
		
		let valorCelda3Elemento = celda3.querySelector("input");
		let valorCelda3 = valorCelda3Elemento ? valorCelda3Elemento.value : '';
	
	    if (valorCelda1 !== null && valorCelda1 !== '' &&
	        valorCelda2 !== "0" && valorCelda2 !== null && valorCelda1 !== '' &&
	        valorCelda3 !== "0" && valorCelda3 !== null && valorCelda1 !== '' )
		{} 
	    else 
	    {
	      return false;
	    }
	}
	
	var pagosTarjetaInput = document.getElementById("pagosTarjeta");
    var pagosYapeInput = document.getElementById("pagosYape");
    var pagosEfectivoInput = document.getElementById("pagosEfectivo");
	var vuelto = document.getElementById("vuelto").value;
    var total = document.getElementById("total").value;
    var pagototal = parseFloat(pagosTarjetaInput.value || 0) + 
                	parseFloat(pagosYapeInput.value || 0) + 
               		parseFloat(pagosEfectivoInput.value || 0);
	
	if(parseFloat(total) > 0 && parseFloat(vuelto) >= 0 )
	{
		if(pagototal > 0 || pagototal == total)
		{
			if(pagototal<=total)
			{
				return true;
			}
			else if((pagototal-vuelto)==total)
			{
				return true;
			}
			
			else 
			{
				Swal.fire({
				title: "No se puede pagar mas de lo debido",
				//text: "You clicked the button!",
				icon: "error"
				});
			}
		}
		else {return false;}
	}
	else 
	{
		Swal.fire({
				title: "El vuelto no puede ser negativo!",
				//text: "You clicked the button!",
				icon: "error"
			});
		return false;
	}
}

async function grabarDatos() 
{
	var metodoPagoCheckboxes = document.getElementsByName("opcionPago");
	var codventa = document.getElementById("codventa").value;
	var fecha = document.getElementById("fecha").value;
    var pagosTarjetaInput = document.getElementById("pagosTarjeta");
    var pagosYapeInput = document.getElementById("pagosYape");
    var pagosEfectivoInput = document.getElementById("pagosEfectivo");
    var vuelto = document.getElementById("vuelto");
    var total = document.getElementById("total");
    var pagototal = parseFloat(pagosTarjetaInput.value || 0) + 
                	parseFloat(pagosYapeInput.value || 0) + 
               		parseFloat(pagosEfectivoInput.value || 0);
	
	if(parseFloat(vuelto.value || 0)  == 0)
	{
		if(pagototal>parseFloat(total.value || 0))
		{
			Swal.fire({
				title: "Esta pagando mas de lo debido!",
				//text: "You clicked the button!",
				icon: "info"
			});
		}
	}
	
	var opcionesVenta = document.getElementsByName("opcionVenta");
	var opcionSeleccionada;
	var tarjeta = "";
	var yape = "";
	var efectivo = "";
	var tipo;
	let venta;

    if(metodoPagoCheckboxes[0].checked)
    {
      var labelTarjeta = document.querySelector('label[for="pagoTarjeta"]').textContent;
	  tarjeta = labelTarjeta;
    }
    
    if(metodoPagoCheckboxes[1].checked)
    {
      var labelYape = document.querySelector('label[for="pagoYape"]').textContent;
	  yape = labelYape;
    }
  
    if(metodoPagoCheckboxes[2].checked)
    {
      var labelEfectivo = document.querySelector('label[for="pagoEfectivo"]').textContent;
	  efectivo = labelEfectivo; 
    }
	
	for (var i = 0; i < opcionesVenta.length; i++) 
	{
	    if (opcionesVenta[i].checked) 
	    {  
	        opcionSeleccionada = opcionesVenta[i];
	        break;
	    }
	}
	
	if (opcionSeleccionada)
	{
	    tipo = opcionSeleccionada.value;
	}
		
	if(tipo == "factura")
	{
		venta = 
		{
			"fecha": fecha,
			"hora": document.getElementById("hora").value,
			"monto": total.value,
			"vuelto": vuelto.value,
			"tarjeta" : tarjeta,
			"yape" : yape,
			"efectivo" : efectivo,
			"tipocomprobante": tipo,
			"nombreempleado" : document.getElementById("encarventa").value,
			"idcliente" : document.getElementById("ruc").value		
		};
	}
	
	else if (tipo == "boleta")
	{
		venta = 
		{
			"fecha": document.getElementById("fecha").value,
			"hora": document.getElementById("hora").value,
			"monto": total.value,
			"vuelto": vuelto.value,
			"tarjeta" : tarjeta,
			"yape" : yape,
			"efectivo" : efectivo,
			"tipocomprobante": tipo,
			"nombreempleado" : document.getElementById("encarventa").value,
			"idcliente" : document.getElementById("dni").value		
		};
	}
	else 
	{
		Swal.fire({
				title: "No se esta recibiendo el tipo de comprobante!",
				//text: "You clicked the button!",
				icon: "error"
			});
	}
		
	try 
	{
        const response = await fetch("http://localhost:8081/registroventa/registro", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta),
        });

        if (response.ok) 
        {
			actualizaryguardar();
       		confirmarVenta(codventa, tipo);
    	} 
    	else 
    	{
        	denegarVenta();
		} 
    } 
    catch (error) 
    {
        console.error('Error en la creacion del registro:', error);
    }
    
    let reporte =
  	{
	  	"fecha" : fecha,
	  	"montocierre" : total.value
	};

	try
	{
		const response = await fetch("http://localhost:8081/registroventa/editarcierre", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reporte),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
	}
	catch (error)
	{
		console.log(error);
	}
}

async function actualizaryguardar()
{
	var tipoComprobante = document.getElementsByName("opcionVenta");
	
    var tipoSeleccionado = "";
    for (var i = 0; i < tipoComprobante.length; i++) 
    {
      if (tipoComprobante[i].checked) 
      {
        tipoSeleccionado = tipoComprobante[i].value;
        break;
      }
    }
    
	console.log(tipoSeleccionado);
	var tabla = document
    .getElementById("datatable_users")
    .getElementsByTagName("tbody")[0];
	for (let i = 1; i <= tabla.rows.length; i++) 
	{
	    let fila = tabla.rows[i-1];

	    let celda2 = fila.cells[1];
	    let celda3 = fila.cells[2];

	    var inputElement = document.getElementById('input_datalistOptions'+i);
  		var selectedValue = inputElement.value;
	    let parts = selectedValue.split(" - ");
	    let productoId = parts[parts.length - 1];
	    
	    let cantidad = celda2.textContent.trim();
	    let preciouni = celda3.textContent.trim();
	    let subtotal = parseFloat(cantidad || 0) * parseFloat(preciouni|| 0);
	    
	    const productoRequest = 
		{
			"stock": cantidad
		}
		
		try 
	    {
		    const response = await fetch(`http://localhost:8081/registroventa/stock/${productoId}`, {
		      method: 'PUT',
		      headers: {
		        'Content-Type': 'application/json',
		      },
		      body: JSON.stringify(productoRequest),
		    });
		
		    if (!response.ok) 
		    {
		      	throw new Error(`HTTP error! Status: ${response.status}`);
		    }
		    
	  	} catch (error) {console.error('Error al actualizar el producto:', error);}
		
		let detalleRequest = "";
		
		if(tipoSeleccionado == "factura")
	  	{
			detalleRequest =
			{
				"idventafactura" : document.getElementById("codventa").value,
				"idproducto" : productoId,
				"precio": preciouni,
				"cantidad" : cantidad,
				"subtotal" : subtotal
			}
		}
		
		else if (tipoSeleccionado == "boleta")
		{
			detalleRequest =
			{
				"idventaboleta" : document.getElementById("codventa").value,
				"idproducto" : productoId,
				"precio": preciouni,
				"cantidad" : cantidad,
				"subtotal" : subtotal
			}
		}
	  	
	  	if(tipoSeleccionado == "factura")
	  	{
			try 
		    {
			    const response = await fetch(`http://localhost:8081/registroventa/register/detallefactura`, {
			      method: 'POST',
			      headers: {
			        'Content-Type': 'application/json',
			      },
			      body: JSON.stringify(detalleRequest),
			    });
			
			    if (!response.ok) 
			    {
			      	throw new Error(`HTTP error! Status: ${response.status}`);
			    }
			
			    const data = await response.json();
			    console.log(data.message);
		  	} catch (error) {console.error('Error al crear del detalle del producto:', error);}
		}
		
		else if (tipoSeleccionado == "boleta")
		{
			try 
		    {
			    const response = await fetch(`http://localhost:8081/registroventa/register/detalleboleta`, {
			      method: 'POST',
			      headers: {
			        'Content-Type': 'application/json',
			      },
			      body: JSON.stringify(detalleRequest),
			    });
			
			    if (!response.ok) 
			    {
			      	throw new Error(`HTTP error! Status: ${response.status}`);
			    }
			
		  	} catch (error) {console.error('Error al crear del detalle del producto:', error);}
		}
	}
}

function confirmarVenta(ventaId, tipoComprobante) 
{
	Swal.fire({
  		title: "Venta Registrada Correctamente!",
  		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) 
		{
       		verpdf(ventaId, tipoComprobante);
  		} 
	});  
}

function denegarVenta() {
	Swal.fire({
  		title: "No se pudo registrar la venta!",
  		icon: "error",
	});  
}

//Ver los detalles
async function verpdf(ventaId, tipoComprobante) 
{
	if (tipoComprobante === "boleta") 
	{
		redirectToPdfBoleta(ventaId);
	} 
	else if (tipoComprobante === "factura")
	{
		redirectToPdfFactura(ventaId);
	}
}

function redirectToPdfFactura(ventaId)
{
    window.location.href = `/pdffactura?ventaid=${encodeURIComponent(ventaId)}`;
}

function redirectToPdfBoleta(ventaId)
{
    window.location.href = `/pdfboleta?ventaid=${encodeURIComponent(ventaId)}`;
}

//Botones de redireccion
let cancelar = document.getElementById("btnCancelar");
	cancelar.addEventListener("click", function () {
	 	window.location.href = "/compras";
	 });

const busProvButton = document.getElementById("busPROV");
busProvButton.addEventListener("click", async () => {
    await realizarBusqueda();
});

//Busqueda de proveedores
async function realizarBusqueda() 
{
	let ruc = document.getElementById("ruc").value
	try 
	{
    	const response = await fetch(`http://localhost:8081/proveedores/viewproveedores/${ruc}`);
    	if (!response.ok) {
      	throw new Error(`HTTP error! Status: ${response.status}`);}
      	
      	const proveedorDetalles = await response.json();
      	
      	const razonSocialElement = document.getElementById("razo");
        const direccionElement = document.getElementById("direc");

        razonSocialElement.value = proveedorDetalles.razonSocial;
        direccionElement.value = proveedorDetalles.direccion;
    }
	catch (error) 
	{
    	console.error('Error durante la obtención de detalles del proveedor', error);
  	}
}

//Esto es para limitar la seleccion de fechas
document.addEventListener("DOMContentLoaded", function () 
{
    const fechaActual = new Date();
    const primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const formattedMinDate = primerDiaDelMes.toISOString().split('T')[0];
    const hoy = new Date().toISOString().split('T')[0];

    document.getElementById("fchpg").setAttribute("min", formattedMinDate);
    document.getElementById("fchpg").setAttribute("max", hoy);

});

//Esto es para agregar los productos de la bd
async function cargarProductos(uniqueId)
{
  try 
  {
    const response = await fetch("http://localhost:8081/productos/viewproducts");
    const productos = await response.json();
    
    const datalistOptions = document.getElementById(uniqueId);
	
   	productos.forEach((producto) => {
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

document.addEventListener("DOMContentLoaded", cargarProductos("datalistOptions1"));

function actualizarPrecio(selectElement) 
{
  const selectedProductId = selectElement.value;
  console.log(selectedProductId);
}

function eliminarFila(button) {
  var row = button.closest("tr");
  row.parentNode.removeChild(row);
  calcularSubtotal();
  calcularIGV();
  calcularTotal();
}

function agregarFila() 
{
  var table = document
    .getElementById("datatable_users")
    .getElementsByTagName("tbody")[0];

  // Crea una nueva fila
  var newRow = table.insertRow(table.rows.length);
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);

  // Configura las celdas
  var uniqueId = "datalistOptions" + table.rows.length;
   cell1.innerHTML = `
    <input class="form-control" list="${uniqueId}" id="input_${uniqueId}" placeholder="Escribe..." required>
    <datalist id="${uniqueId}">
    </datalist>
  `;

  cell2.innerHTML = '<div contenteditable="true" oninput="validarNumerico(this);" required></div>';
  cell3.innerHTML = '<div contenteditable="true" oninput="validarNumerico(this);" required></div>';
  cell4.contentEditable = false;
  cell5.contentEditable = false;

  cell2.setAttribute("oninput", "validarNumerico(this);");
  cell3.setAttribute("oninput", "validarNumerico(this);");

  cell5.innerHTML =
    '<button class="btn btn-danger" onclick="eliminarFila(this)"><i class="fas fa-trash"></i> Eliminar</button>';
  
  var deleteButton = cell5.querySelector("button");
  deleteButton.style.padding = "2px 5px";
  deleteButton.style.display = "inline-block";
  deleteButton.style.width = "70%";
  deleteButton.style.margin = "0 auto";

  cargarProductos(uniqueId);
}

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

  var subtotalDiv = document.getElementById("subtotal");
  if (subtotalDiv) {
    subtotalDiv.value = subtotalTotal.toFixed(2);
  }
  
  calcularIGV();
  calcularTotal();
  return subtotalTotal;
}

function actualizarSubtotal(cell, cantidad, precioUnitario) {
  if (cantidad !== 0 && precioUnitario !== 0) {
    cell.innerText = (cantidad * precioUnitario).toFixed(2);
  } else {
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
  var subtotalDiv = document.getElementById("subtotal");
  if (subtotalDiv) {
    subtotalDiv.value = subtotalTotal.toFixed(2);
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


function calcularIGV() {
	var subtotalInput = document.getElementById("subtotal").value;
    var resultadoIGVInput = document.getElementById("igv");

    if (subtotalInput !== "") {
        let subtotal = parseFloat(subtotalInput);
        let igv = (subtotal * 0.18).toFixed(2);
        resultadoIGVInput.value = igv;
    } else {
        let subtotal = parseFloat(subtotalInput);
        let igv = subtotal.toFixed(2);
        resultadoIGVInput.value = igv;
    }
}

function calcularTotal() {
	var subtotalInput = document.getElementById("subtotal").value;
    var resultadoIGVInput = document.getElementById("igv").value;
	var totalInput = document.getElementById("total")
    if (resultadoIGVInput !== "") {
        let subtotal = parseFloat(subtotalInput);
        let igv = parseFloat(resultadoIGVInput);
        let total = (subtotal+igv).toFixed(2);
        totalInput.value = total;
    } else {
        let subtotal = parseFloat(subtotalInput);
        let igv = parseFloat(resultadoIGVInput);
        let total = subtotal.toFixed(2);
        totalInput.value = total;
    }
}

var igv = document.getElementById("igv");
	igv.addEventListener("input", function () {
	 	calcularTotal();
	 });

const GrabarButton = document.getElementById("btnGrabar");
GrabarButton.addEventListener("click", async () => {
	if(validaciones())
	{
		await Guardar();
	}
    else
    {
		Swal.fire({
				title: "Todos los campos deben de ser rellenados!",
				//text: "You clicked the button!",
				icon: "error"
			});
	}
});

async function Guardar() 
{
	let Monto, Deuda;
	const opcionesEstado = document.getElementsByName("opcionCompra");
	let estadoSeleccionado;
	for (const opcion of opcionesEstado) 
	{
	  if (opcion.checked) 
	  {
	    estadoSeleccionado = opcion.value;
	    break; 
	  }
	}
	
	if (estadoSeleccionado === "Pagado") 
	{
	  Monto = document.getElementById("total").value;
	  Deuda = 0;
	} 
	else if (estadoSeleccionado === "Adeuda") 
	{
	  Monto = document.getElementById("total").value;
	  Deuda = Monto;
	} 
	else 
	{
	  console.log("Estado no reconocido");
	}
	
	let compra = 
	{
		"serie": document.getElementById("nrserie").value,
		"comprobante": document.getElementById("nrcompro").value,
		"tipoComprobante": document.getElementById("tipcom").value,
		"fechaCompra": document.getElementById("fchpg").value,
		"monto": Monto,
		"deuda": Deuda,
		"estado": estadoSeleccionado,
		"proveedor": document.getElementById("ruc").value
	};
		
	try 
	{
        const response = await fetch("http://localhost:8081/compras/register", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(compra),
        });

        if (response.ok) 
        {
			actualizaryguardar();
   			confirmarCompra();
    	} 
    	else 
    	{
        	denegarCompra();
		} 
    } 
    catch (error) 
    {
        console.error('Error en la creacion del registro:', error);
    }
}

function validaciones()
{
	var tipocompro = document.getElementById("tipcom").value;
	var nrserie = document.getElementById("nrserie").value;;
	var nrcompro = document.getElementById("nrcompro").value;;
	let total = document.getElementById("total").value;
		
	if (nrserie.trim() === "" || nrcompro.trim() === "")
	{
        Swal.fire({
				title: "Complete los campos de N° de Serie y N° de Comprobante.",
				//text: "You clicked the button!",
				icon: "error"
			});
        return false;
    }

	
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
	
	    if (valorCelda1 !== "0" && valorCelda1 !== null && valorCelda1 !== '' &&
	        valorCelda2 !== "0" && valorCelda2 !== null && valorCelda1 !== '' &&
	        valorCelda3 !== "0" && valorCelda3 !== null && valorCelda1 !== '' )
		{} 
	    else 
	    {
	      return false;
	    }
	}
	
	if(total > 0)
	{}
	else {return false;}
	
	if (tipocompro == "Factura" || tipocompro == "Boleta") 
	{}
    else {return false;}
    
    return true;
}

async function actualizaryguardar()
{
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
	    
	    let StockComprado = celda2.textContent.trim();
	    let PrecioCompra = celda3.textContent.trim();
	    let subtotal = parseFloat(StockComprado || 0) * parseFloat(PrecioCompra || 0);
	    const productoRequest = 
		{
			"precioCompra": PrecioCompra,
			"stock": StockComprado
		}
		
		const detalleRequest =
		{
			"idcompra" : document.getElementById("nrserie").value + document.getElementById("nrcompro").value,
			"idproducto" : productoId,
			"precio": PrecioCompra,
			"cantidad": StockComprado,
			"subtotal": subtotal
		}
		
	    try 
	    {
		    const response = await fetch(`http://localhost:8081/productos/stock/${productoId}`, {
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
		
		    const data = await response.json();
		    console.log(data.message);
	  	} catch (error) {console.error('Error al actualizar el producto:', error);}
	  	
	  	try 
	    {
		    const response = await fetch(`http://localhost:8081/compras/register/detalle`, {
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
}

function confirmarCompra() {
	Swal.fire({
  		title: "Compra Registrada Correctamente!",
  		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/compras";
  		} 
	});  
}

function denegarCompra() {
	Swal.fire({
  		title: "No se pudo registrar la compra!",
  		icon: "error",
	});  
}  

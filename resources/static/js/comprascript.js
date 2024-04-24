//Barra de navegacion
	let sidebarToggle = document.querySelector("#sidebar-toggle");
	
	sidebarToggle.addEventListener("click", function () {
	  document.querySelector("#sidebar").classList.toggle("collapsed");
	});
	
	let usuariosLink = document.getElementById("usuarios");
	usuariosLink.addEventListener("click", function () {
	 	window.location.href = "/verusuario";
	 });
	
	let categoriaLink = document.getElementById("categorias");
	categoriaLink.addEventListener("click", function () {
	 	window.location.href = "/categoria";
	 });
	 
	let productosLink = document.getElementById("productos");
	productosLink.addEventListener("click", function () {
	 	window.location.href = "/producto";
	 });
	 
	let marcasLink = document.getElementById("marcas");
	marcasLink.addEventListener("click", function () {
	 	window.location.href = "/marca";
	 });
	
	let unidadLink = document.getElementById("unidad");
	unidadLink.addEventListener("click", function () {
	 	window.location.href = "/unidad";
	 });
	
	let proveedorLink = document.getElementById("proveedor");
	proveedorLink.addEventListener("click", function () {
	 	window.location.href = "/proveedor";
	 });
	
	let comprasLink = document.getElementById("compras");
	comprasLink.addEventListener("click", function () {
	 	window.location.href = "/compras";
	 });
	
	let registroLink = document.getElementById("btnCompras");
	registroLink.addEventListener("click", function () {
	 	window.location.href = "/registrarcompras";
	 });

	let aperturaLink = document.getElementById("apertura");
	aperturaLink.addEventListener("click", function () {
		window.location.href = "/apertura";
	});

	let ventaLink = document.getElementById("pedido");
	ventaLink.addEventListener("click", function () {
        window.location.href = "/venta";
    });

	let cerrarLink = document.getElementById("cerrar");
    cerrarLink.addEventListener("click", function () {
        window.location.href = "/cerrar";
    });
    
    let reporteLink = document.getElementById("reporte");
	reporteLink.addEventListener("click" , function () 
	{
		window.location.href = "/reportes";
	});

//Recuperar el user de la pagina anterior
	var usuarioText = localStorage.getItem("usuarioText");
    document.getElementById("user").innerText = usuarioText;	
	 
//Cerrar Sesion
	let sesionElement = document.getElementById("sesion");
	    sesionElement.addEventListener("click", async () => 
	    {
	        let logoutData = {};
	        try 
	        {
	            const response = await fetch("http://localhost:8081/auth/logout", 
	            {
	                method: "POST",
	                headers: 
	                {
						'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify(logoutData)
	            });
	
	            // Verificar si la solicitud fue exitosa (código de estado 2xx)
	            if (response.ok) 
	            {
	                console.log("Logout exitoso");
	                alert("Se cerro la sesion");
	                window.location.href = "/logout";
	            } 
	            else 
	            {
					alert("No se pudo cerrar la sesion");
	                console.error(`Error durante el logout. Código de estado: ${response.status}`);
	            }
	        } 
	        catch (error) 
	        {
	            console.error('Error durante el logout:', error);
	        }
	    });

//Obtener tabla
	let dataTable;
	let dataTableIsInitialized = false;
	
	const dataTableOptions = {
	  //scrollX: "2000px",
	  lengthMenu: [5, 10, 15, 20],
	  columnDefs: [
	    { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
	    { orderable: true, targets: [1] },
	    { searchable: true, targets: [1,2,3,4] },
	    //{ width: "50%", targets: [0] }
	  ],
	  pageLength: 4,
	  destroy: true,
	  language: {
	    lengthMenu: "Mostrar _MENU_ registros por página",
	    zeroRecords: "Ninguna compra encontrada",
	    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
	    infoEmpty: "Ninguna compra encontrada",
	    infoFiltered: "(filtrados desde _MAX_ registros totales)",
	    search: "Buscar:",
	    loadingRecords: "Cargando...",
	    paginate: {
	      first: "Primero",
	      last: "Último",
	      next: "Siguiente",
	      previous: "Anterior",
	    },
	  },
	};
	
	const initDataTable = async () => {
	  if (dataTableIsInitialized) {
	    dataTable.destroy();
	  }
	
	  await listCompras();
	  dataTable = $("#datatable_compras").DataTable(dataTableOptions);
	
	  dataTableIsInitialized = true;
	};
	
	const listCompras = async () => {
  	try {
	    const response = await fetch("http://localhost:8081/compras/vercompras");
	    const compras = await response.json();

	    let content = ``;
	    compras.forEach((compra) =>
	    {
	      let estadoContent;
	      if (compra.estado === "Adeuda") 
	      {
	        estadoContent = `
	        <button id="edit" class="btn btn-sm btn-primary" onclick="openEditModal('${compra.codCompra}')">Pagar</button>`;
	      } 
	      else {estadoContent = compra.estado;}
	
	      content += `
	        <tr>
	          <td class="centered">${compra.codCompra}</td>
	          <td class="centered">${compra.razonSocial}</td>
	          <td class="centered">${compra.fechaCompra}</td>
	          <td class="centered">${compra.monto}</td>
	          <td class="centered">${compra.deuda}</td>
	          <td class="centered">${estadoContent}</td>
	        </tr>`;
	    });
	    tableBody_compras.innerHTML = content;
	  } catch (ex) {
	    alert(ex);
	  }
	}; 

//Editar (recoger datos)
async function openEditModal(CodCompra) 
{
	try 
	{
    	const response = await fetch(`http://localhost:8081/compras/vercompras/${CodCompra}`);
    	if (!response.ok) {
      	throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const compraDetalles = await response.json();

  	const modalBody = document.getElementById("editModalBody");
  	modalBody.innerHTML = `
  		<div class="container">	
		  <p>Código de Compra:</p>
    	  <input type="text" id="codCompra" value="${compraDetalles.codCompra}" readonly />
		  
	      <p>Monto total de la deuda:</p>
	      <input type="text" id="montoPagar" value="${compraDetalles.deuda}" readonly />
	
	      <p>Cantidad a pagar:</p>
	      <input type="number" id="cantidadPagar" placeholder="Ingrese un monto" min="0" step="0.01"/>
	      
	    </div>
     	`;
	} 
	catch (error) 
	{
    	console.error('Error durante la obtención de detalles de la compra', error);
  	}
  		
	const editModal = new bootstrap.Modal(document.getElementById("editModal"));
	editModal.show();
}

//Editar (Guardar datos)
let save = document.getElementById("BtnPagar");
	save.addEventListener("click", evento =>
	{
	    Swal.fire({
	  		title: "¿Desea guardar el pago realizado?",
	  		showDenyButton: true,
	  		showCancelButton: true,
	  		confirmButtonText: "Guardar",
  			denyButtonText: `No Guardar`
		}).then((result) => {
  		/*Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
    			saveChanges();
  			} 
  			else if (result.isDenied) {
    			cancelarCambios();
  			}
		}); 
	});

function cancelarCambios() {
	Swal.fire({
  		title: "Cambios no guardados!",
  		//text: "You clicked the button!",
  		icon: "info"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/compras";
  		} 
	});  
}

function confirmarCambios() {
	Swal.fire({
  		title: "Cambios guardados!",
  		//text: "You clicked the button!",
  		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/compras";
  		} 
	});  
}

function denegarPago() {
	Swal.fire({
  		title: "No se pudo realizar el pago!",
  		//text: "You clicked the button!",
  		icon: "error"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/compras";
  		} 
	});  
}

let cancel = document.getElementById("Cancelar");
	cancel.addEventListener("click", evento =>
	{
		var Monto = document.getElementById("montoPagar");
	   	var Deuda = document.getElementById("cantidadPagar");
	   	Monto.value = "";
	   	Deuda.value = "";
	   	window.location.href = "/compras"; 
	});
	
function saveChanges()
{
	const compraId = document.getElementById("codCompra").value;
	const deuda = document.getElementById("montoPagar").value;
	const pagando = document.getElementById("cantidadPagar").value;
	let compraRequest;
	
	if (pagando == deuda)
	{
		compraRequest = 
		{
			"deuda": pagando
		}
		pagarDeuda(compraId, compraRequest);
		
		const editModal = bootstrap.Modal.getInstance(
			document.getElementById("editModal")
		);
		editModal.hide();
		confirmarCambios();
	}
	else if(pagando<deuda && pagando >= 0)
	{
		compraRequest = 
		{
			"deuda": pagando
		}
		actualizarDeuda(compraId, compraRequest);
		
		const editModal = bootstrap.Modal.getInstance(
			document.getElementById("editModal")
		);
		editModal.hide();
		confirmarCambios();
	}
	else 
	{
		denegarPago();
	}
}	
	
	window.addEventListener("load", async () => {
	  await initDataTable();
	});
	
async function actualizarDeuda(compraId, compraRequest) 
{
  try {
    const response = await fetch(`http://localhost:8081/compras/update/${compraId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(compraRequest),
    });

    if (!response.ok) 
    {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message);
  } catch (error) {console.error('Error al actualizar la compra:', error);}
}

async function pagarDeuda(compraId, compraRequest) 
{
  try {
    const response = await fetch(`http://localhost:8081/compras/pay/${compraId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(compraRequest),
    });

    if (!response.ok) 
    {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message);
  } catch (error) {console.error('Error al actualizar la compra:', error);}
}
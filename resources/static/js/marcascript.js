//Barra de navegacion
	let sidebarToggle = document.querySelector("#sidebar-toggle");
	
	sidebarToggle.addEventListener("click", function () {
	  document.querySelector("#sidebar").classList.toggle("collapsed");
	});
	
	let usuariosLink = document.getElementById("usuarios");
	usuariosLink.addEventListener("click", function () {
	    // Redirige a la página deseada
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
	    
//Obtener marcas
	
	let dataTable;
	let dataTableIsInitialized = false;
	
	const dataTableOptions = {
	  //scrollX: "2000px",
	  lengthMenu: [5, 10, 15, 20],
	  columnDefs: [
	    { className: "centered", targets: [0, 1, 2] },
	    { orderable: true, targets: [1] },
	    { searchable: true, targets: [1] },
	    //{ width: "50%", targets: [0] }
	  ],
	  pageLength: 4,
	  destroy: true,
	  language: {
	    lengthMenu: "Mostrar _MENU_ registros por página",
	    zeroRecords: "Ninguna marca encontrada",
	    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
	    infoEmpty: "Ninguna marca encontrada",
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
	
	  await listMarcas();
	  dataTable = $("#datatable_marcas").DataTable(dataTableOptions);
	
	  dataTableIsInitialized = true;
	  console.log("Después de la inicialización");
	};
	
	const listMarcas = async () => 
	{
	  try 
	  {
	    const response = await fetch("http://localhost:8081/marcas/viewmarcas");
	    const marca = await response.json();
	    let content = ``;
	    marca.forEach((marcas) => {
	      content += `
	                <tr>
	                    <td class="centered">${marcas.codMarca}</td>
	                    <td class="centered">${marcas.descripcion}</td>
	                    <td class="centered">
	                    	<button id="edit" class="btn btn-sm btn-primary" onclick="openEditModal('${marcas.codMarca}')"> <i class="fa-solid fa-pencil"></i></button>
	        				<button id="delete" class="btn btn-sm btn-danger" onclick="eliminarMarca(${marcas.codMarca})"><i class="fa-solid fa-trash-can"></i></button>
	                    </td>
	                </tr>`;
	    });
	    tableBody_marcas.innerHTML = content;
	  } catch (ex) {
	    alert(ex);
	  }
	};

//Editar marcas (recoger datos)
async function openEditModal(codMarca) 
{
	try 
	{
    	const response = await fetch(`http://localhost:8081/marcas/viewmarcas/${codMarca}`);
    	if (!response.ok) {
      	throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const marcaDetalles = await response.json();

  	const modalBody = document.getElementById("editModalBody");
  	modalBody.innerHTML = `
  		<div class="mb-3">
		    <label for="recipient-name" class="col-form-label">CodMarca:</label>
			<input type="text" class="form-control" id="editCodMarca" value="${marcaDetalles.codMarca.toString()}" readonly/>
	    </div>
	    
	    <div class="mb-3">
        	<label for="editNombre" class="col-form-label">Nombre:</label>
        	<input type="text" class="form-control" id="editDescripcion" value="${marcaDetalles.descripcion}" maxlength="20"/>
     	</div>`;
	} 
	catch (error) 
	{
    	console.error('Error durante la obtención de detalles de la marca:', error);
  	}
  		
	const editModal = new bootstrap.Modal(document.getElementById("editModal"));
	editModal.show();
}

//Editar marca (Guardar datos)
let save = document.getElementById("saveChangesBtn");
	save.addEventListener("click", evento =>
	{
	    Swal.fire({
	  		title: "¿Desea guardar los cambios realizados?",
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
    		window.location.href = "/marca";
  		} 
	});  
}


function saveChanges()
{
	const codMarca = document.getElementById("editCodMarca").value;
	const marcaRequest = 
	{
		"descripcion": document.getElementById("editDescripcion").value
	}
	
	actualizarMarca(codMarca, marcaRequest);
	
	const editModal = bootstrap.Modal.getInstance(
		document.getElementById("editModal")
	);
	editModal.hide();
}	
	
	window.addEventListener("load", async () => {
	  await initDataTable();
	});
	
async function actualizarMarca(codMarca, marcaRequest) 
{
  try {
    const response = await fetch(`http://localhost:8081/marcas/update/${codMarca}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(marcaRequest),
    });

    if (!response.ok) 
    {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message);
    Swal.fire({
  		title: "Cambios guardados!",
  		//text: "You clicked the button!",
  		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/marca";
  		} 
	}); 
  } catch (error) {
	  Swal.fire({
  		title: "Cambios no guardados por duplicidad!",
  		//text: "You clicked the button!",
  		icon: "error"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/marca";
  		} 
	}); 
	  console.error('Error al actualizar la marca:', error);}
}

//Para que los datos se borren de los campos.
	let btncancelar = document.getElementById("btnCancelar");
	btncancelar.addEventListener("click", evento =>
	{
	   	var Descripcion = document.getElementById("nombre");
	   	Descripcion.value = "";
	});

//Registrar la nueva Marca
	let boton = document.getElementById("btnAceptar");
	boton.addEventListener("click", evento =>
	{
	    newMarca();
	});
	
	let newMarca = async () =>
	{	
	    let nuevaDescripcion = document.getElementById("nombre").value;

	    try 
	    {
	        const response = await fetch("http://localhost:8081/marcas/viewmarcas");
	        if (!response.ok) {
	            throw new Error(`HTTP error! Status: ${response.status}`);
	        }
	
	        const marcasExist = await response.json();
	        const marcaExistente = marcasExist.find(marca => marca.descripcion === nuevaDescripcion);
	
	        if (marcaExistente) 
	        {
	            Swal.fire({
	  				title: "No se pudo registrar la Marca!",
	  				icon: "error",
	  				text: "La Marca ya existe"
				}).then((result) => {
				if (result.isConfirmed) {
    				window.location.href = "/marca";
  				} 
				}); 
	        }
	        else
	        {
	            let marca = 
	            {
	                "descripcion": nuevaDescripcion
	            };
	
	            const responseRegistro = await fetch("http://localhost:8081/marcas/register", {
	                method: "POST",
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify(marca),
	            });
	
	            if (!responseRegistro.ok) {
	                throw new Error(`HTTP error! Status: ${responseRegistro.status}`);
	            }
	
	            const data = await responseRegistro.json();
	            console.log(data.message);
	            Swal.fire({
	                title: "Marca registrada correctamente!",
	                icon: "success"
	            }).then((result) => {
	                if (result.isConfirmed) {
	                    window.location.href = "/marca";
	                }
	            });
	        }
	    } catch (error) {
	        alert("No se pudo registrar nueva marca");
	        console.error('Error durante el registro de nueva marca:', error);
	    }
	};

//Borrar Marca
	let eliminarMarca = async(codMarca) =>
	{
		Swal.fire({
	  		title: "¿Desea eliminar la Marca?",
	  		showCancelButton: true,
	  		confirmButtonText: "Eliminar",
		}).then(async (result) => {
			if (result.isConfirmed) {
    			try
			{
				const borrar = await fetch("http://localhost:8081/marcas/delete/"+codMarca,
		    {
				method: "DELETE",
		        headers: 
		        {
		            'Accept': 'application/json',
		            'Content-Type': 'application/json'
		        }
		    });
		    if (borrar.ok) {
       			confirmarEliminarMarca();
    		} 
   			else {
       			denegarEliminarMarca();
		   }
		}
		catch(error)
		{
			alert("No se pudo eliminar la marca");
	        console.error('Error during delete:', error);
		}
  			} 
		}); 
		
	};    
	    
function confirmarEliminarMarca() {
	Swal.fire({
  		title: "Marca Eliminado Correctamente!",
  		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/marca";
  		} 
	});  
}

function denegarEliminarMarca() {
	Swal.fire({
  		title: "No se pudo eliminar la Marca!",
  		icon: "error",
  		text: "Marca esta siendo usada"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/marca";
  		} 
	});  
}  

//Recuperar el user de la pagina anterior
	var usuarioText = localStorage.getItem("usuarioText");
    document.getElementById("user").innerText = usuarioText;	  
    
      
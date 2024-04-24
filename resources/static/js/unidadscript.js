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
	    
//Obtener unidad
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
	    zeroRecords: "Ninguna unidad encontrada",
	    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
	    infoEmpty: "Ninguna unidad encontrada",
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
	
	  await listUnidad();
	  dataTable = $("#datatable_unidad").DataTable(dataTableOptions);
	
	  dataTableIsInitialized = true;
	};
	
	const listUnidad= async () => 
	{
	  try 
	  {
	    const response = await fetch("http://localhost:8081/unidad/viewunidades");
	    const unidades = await response.json();
	    let content = ``;
	    unidades.forEach((unidad) => {
	      content += `
	                <tr>
	                    <td class="centered">${unidad.codMedida}</td>
	                    <td class="centered">${unidad.descripcion}</td>
	                    <td class="centered">
	                    	<button id="edit" class="btn btn-sm btn-primary" onclick="openEditModal('${unidad.codMedida}')"> <i class="fa-solid fa-pencil"></i></button>
	        				<button id="delete" class="btn btn-sm btn-danger" onclick="eliminar(${unidad.codMedida})"><i class="fa-solid fa-trash-can"></i></button>
	                    </td>
	                </tr>`;
	    });
	    tableBody_unidad.innerHTML = content;
	  } catch (ex) {
	    alert(ex);
	  }
	};

//Editar unidad (recoger datos)
async function openEditModal(codMedida) 
{
	try 
	{
    	const response = await fetch(`http://localhost:8081/unidad/viewunidades/${codMedida}`);
    	if (!response.ok) {
      	throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const unidadDetalles = await response.json();

  	const modalBody = document.getElementById("editModalBody");
  	modalBody.innerHTML = `
  		<div class="mb-3">
		    <label for="recipient-name" class="col-form-label">CodUnidad:</label>
			<input type="text" class="form-control" id="editCodUnidad" value="${unidadDetalles.codMedida.toString()}" readonly/>
	    </div>
	    
	    <div class="mb-3">
        	<label for="editNombre" class="col-form-label">Nombre:</label>
        	<input type="text" class="form-control" id="editDescripcion" value="${unidadDetalles.descripcion}" maxlength="30"/>
     	</div>`;
	} 
	catch (error) 
	{
    	console.error('Error durante la obtención de detalles de la unidad:', error);
  	}
  		
	const editModal = new bootstrap.Modal(document.getElementById("editModal"));
	editModal.show();
}

//Editar unidad (Guardar datos)
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
    		window.location.href = "/unidad";
  		} 
	});  
}


function saveChanges()
{
	const codMedida = document.getElementById("editCodUnidad").value;
	const unidadRequest = 
	{
		"descripcion": document.getElementById("editDescripcion").value
	}
	
	actualizarUnidad(codMedida, unidadRequest);
	
	const editModal = bootstrap.Modal.getInstance(
		document.getElementById("editModal")
	);
	editModal.hide();
}	
	
	window.addEventListener("load", async () => {
	  await initDataTable();
	});
	
async function actualizarUnidad(codMedida, unidadRequest) 
{
  try {
    const response = await fetch(`http://localhost:8081/unidad/update/${codMedida}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(unidadRequest),
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
    		window.location.href = "/unidad";
  		} 
	}); 
  } catch (error) {
	  Swal.fire({
  		title: "Cambios no guardados por duplicidad!",
  		//text: "You clicked the button!",
  		icon: "error"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/unidad";
  		} 
	});  
	  console.error('Error al actualizar la unidad:', error);}
}

//Para que los datos se borren de los campos.
	let btncancelar = document.getElementById("btnCancelar");
	btncancelar.addEventListener("click", evento =>
	{
	   	var Descripcion = document.getElementById("nombre");
	   	Descripcion.value = "";
	});

//Registrar la nueva unidad
	let boton = document.getElementById("btnAceptar");
	boton.addEventListener("click", evento =>
	{
	    newUnidad();
	});
	
	let newUnidad = async () => 
	{	
	    let nuevaDescripcion = document.getElementById("nombre").value;

	    try
	    {
	        const response = await fetch("http://localhost:8081/unidad/viewunidades");
	        if (!response.ok) {
	            throw new Error(`HTTP error! Status: ${response.status}`);
	        }
	
	        const unidadesExist = await response.json();
	
	        const unidadExistente = unidadesExist.find(unidad => unidad.descripcion === nuevaDescripcion);
	
	        if (unidadExistente) 
	        {
	            Swal.fire({
	  				title: "No se pudo registrar la Unidad de Medida!",
	  				icon: "error",
	  				text: "La Unidad de Medida ya existe"
				}).then((result) => {
				if (result.isConfirmed) {
    				window.location.href = "/unidad";
  				} 
				}); 
	        }
	        else 
	        {
	            let unidad = {
	                "descripcion": nuevaDescripcion
	            };
	
	            const responseRegistro = await fetch("http://localhost:8081/unidad/register", {
	                method: "POST",
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify(unidad),
	            });
	
	            if (!responseRegistro.ok) {
	                throw new Error(`HTTP error! Status: ${responseRegistro.status}`);
	            }
	
	            const data = await responseRegistro.json();
	            console.log(data.message);
	            Swal.fire({
	                title: "Unidad registrada correctamente!",
	                icon: "success"
	            }).then((result) => {
	                if (result.isConfirmed) {
	                    window.location.href = "/unidad";
	                }
	            });
	        }
	    } catch (error) {
	        alert("No se pudo registrar nueva unidad");
	        console.error('Error durante el registro de nueva unidad:', error);
	    }
	};

//Borrar Marca
	let eliminar = async(codUnidad) =>
	{
		Swal.fire({
	  		title: "¿Desea eliminar la Unidad de Medida?",
	  		showCancelButton: true,
	  		confirmButtonText: "Eliminar",
		}).then(async (result) => {
			if (result.isConfirmed) {
    			try{
					const borrar = await fetch("http://localhost:8081/unidad/delete/"+codUnidad,
				    {
						method: "DELETE",
				        headers: 
				        {
				            'Accept': 'application/json',
				            'Content-Type': 'application/json'
				        }
				    });
				    if (borrar.ok) {
        				confirmarEliminarUnidad();
    				} 
    				else {
        				denegarEliminarUnidad();
				    }
				}
				catch(error)
				{
					alert("No se pudo eliminar a la categoria");
			        console.error('Error during delete:', error);
				}
  			} 
		}); 
	};

function confirmarEliminarUnidad() {
	Swal.fire({
  		title: "Unidad Eliminado Correctamente!",
  		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/unidad";
  		} 
	});  
} 

function denegarEliminarUnidad() {
	Swal.fire({
  		title: "No se pudo eliminar la Unidad de Medida!",
  		icon: "error",
  		text: "Unidad de Medida esta siendo usada"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/unidad";
  		} 
	});  
}  

//Recuperar el user de la pagina anterior
	var usuarioText = localStorage.getItem("usuarioText");
    document.getElementById("user").innerText = usuarioText;
      
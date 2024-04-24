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
	    
//Obtener categorias
	
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
	    zeroRecords: "Ninguna categoria encontrado",
	    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
	    infoEmpty: "Ninguna categoria encontrado",
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
	
	  await listCategoria();
	  dataTable = $("#datatable_categoria").DataTable(dataTableOptions);
	
	  dataTableIsInitialized = true;
	  console.log("Después de la inicialización");
	};
	
	const listCategoria = async () => 
	{
	  try 
	  {
	    const response = await fetch("http://localhost:8081/categoria/viewcategory");
	    const categorias = await response.json();
	    let content = ``;
	    categorias.forEach((categoria) => {
	      content += `
	                <tr>
	                    <td class="centered">${categoria.codCategoria}</td>
	                    <td class="centered">${categoria.descripcion}</td>
	                    <td class="centered">
	                    	<button id="edit" class="btn btn-sm btn-primary" onclick="openEditModal('${categoria.codCategoria}')"> <i class="fa-solid fa-pencil"></i></button>
	        				<button id="delete" class="btn btn-sm btn-danger" onclick="eliminar(${categoria.codCategoria})"><i class="fa-solid fa-trash-can"></i></button>
	                    </td>
	                </tr>`;
	    });
	    tableBody_categorias.innerHTML = content;
	  } catch (ex) {
	    alert(ex);
	  }
	};

//Editar categorias (recoger datos)
async function openEditModal(codCategoria) 
{
	try 
	{
    	const response = await fetch(`http://localhost:8081/categoria/viewcategory/${codCategoria}`);
    	if (!response.ok) {
      	throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const categoriaDetalles = await response.json();

  	const modalBody = document.getElementById("editModalBody");
  	modalBody.innerHTML = `
  		<div class="mb-3">
		    <label for="recipient-name" class="col-form-label">CodCategoria:</label>
			<input type="text" class="form-control" id="editCodCategoria" value="${categoriaDetalles.codCategoria.toString()}" readonly/>
	    </div>
	    
	    <div class="mb-3">
        	<label for="editNombre" class="col-form-label">Nombre:</label>
        	<input type="text" class="form-control" id="editDescripcion" value="${categoriaDetalles.descripcion}" maxlength="20"/>
     	</div>`;
	} 
	catch (error) 
	{
    	console.error('Error durante la obtención de detalles de la categoria:', error);
  	}
  		
	const editModal = new bootstrap.Modal(document.getElementById("editModal"));
	editModal.show();
}

//Editar categorias (Guardar datos)
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
    		window.location.href = "/categoria";
  		} 
	});  
}


function saveChanges()
{
	const codCategoria = document.getElementById("editCodCategoria").value;
	const categoriaRequest = 
	{
		"descripcion": document.getElementById("editDescripcion").value
	}
	
	actualizarCategoria(codCategoria, categoriaRequest);
	
	const editModal = bootstrap.Modal.getInstance(
		document.getElementById("editModal")
	);
	editModal.hide();
}	
	
	window.addEventListener("load", async () => {
	  await initDataTable();
	});
	
async function actualizarCategoria(codCategoria, categoriaRequest) 
{
  try {
    const response = await fetch(`http://localhost:8081/categoria/update/${codCategoria}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoriaRequest),
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
    		window.location.href = "/categoria";
  		} 
	});  
  } catch (error) {
	  Swal.fire({
  		title: "Cambios no guardados por duplicidad!",
  		//text: "You clicked the button!",
  		icon: "error"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/categoria";
  		} 
	});  
	  console.error('Error al actualizar la categoria:', error);}
}

//Para que los datos se borren de los campos.
	let btncancelar = document.getElementById("btnCancelar");
	btncancelar.addEventListener("click", evento =>
	{
	   	var Descripcion = document.getElementById("nombre");
	   	Descripcion.value = "";
	});

//Registrar la nueva categoria
	let boton = document.getElementById("btnAceptar");
	boton.addEventListener("click", evento =>
	{
	    newCategoria();
	});
	
	let newCategoria = async () =>
	{	
	    let nuevaDescripcion = document.getElementById("nombre").value;

	    try 
	    {
	        const response = await fetch("http://localhost:8081/categoria/viewcategory");
	        if (!response.ok) {
	            throw new Error(`HTTP error! Status: ${response.status}`);
	        }
	
	        const categoriasExist = await response.json();
	        const categoriaExistente = categoriasExist.find(categoria => categoria.descripcion === nuevaDescripcion);
	
	        if (categoriaExistente) 
	        {
	            Swal.fire({
	  				title: "No se pudo registrar la  categoria!",
	  				icon: "error",
	  				text: "La categoría ya existe"
				}).then((result) => {
				if (result.isConfirmed) {
    				window.location.href = "/categoria";
  				} 
				}); 
	        }
	        else 
	        {
	            let categoria = 
	            {
	                "descripcion": nuevaDescripcion
	            };
	
	            const responseRegistro = await fetch("http://localhost:8081/categoria/register", 
	            {
	                method: "POST",
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify(categoria),
	            });
	
	            if (!responseRegistro.ok) {
	                throw new Error(`HTTP error! Status: ${responseRegistro.status}`);
	            }
	
	            const data = await responseRegistro.json();
	            console.log(data.message);
	            Swal.fire({
	                title: "Categoría registrada correctamente!",
	                icon: "success"
	            }).then((result) => {
	                if (result.isConfirmed) {
	                    window.location.href = "/categoria";
	                }
	            });
	        }
	    } catch (error) {
	        alert("No se pudo registrar nueva categoría");
	        console.error('Error durante el registro de nueva categoría:', error);
	    }
	};

//Borrar Marca
	let eliminar = async(codCategoria) =>
	{
		Swal.fire({
	  		title: "¿Desea eliminar la Categoria?",
	  		showCancelButton: true,
	  		confirmButtonText: "Eliminar",
		}).then(async (result) => {
			if (result.isConfirmed) {
    			try
				{
					const borrar = await fetch("http://localhost:8081/categoria/delete/"+codCategoria,
				    {
						method: "DELETE",
				        headers: 
				        {
				            'Accept': 'application/json',
				            'Content-Type': 'application/json'
				        }
				    });
					if (borrar.ok) {
        				confirmarEliminarCategoria();
    				} 
    				else {
        				denegarEliminarCategoria();
				    }
				}
				catch(error)
				{
					alert("No se pudo eliminar la categoria");
			        console.error('Error during delete:', error);
				}
  			} 
		}); 	
	};    
	
function confirmarEliminarCategoria() {
	Swal.fire({
  		title: "Categoria Eliminado Correctamente!",
  		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/categoria";
  		} 
	});  
}

function denegarEliminarCategoria() {
	Swal.fire({
  		title: "No se pudo eliminar la  categoria!",
  		icon: "error",
  		text: "Categoría esta siendo usada"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/categoria";
  		} 
	});  
}  
    
//Recuperar el user de la pagina anterior
	var usuarioText = localStorage.getItem("usuarioText");
    document.getElementById("user").innerText = usuarioText;	  
    
      
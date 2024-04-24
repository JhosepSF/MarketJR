let atras = document.getElementById("btnAtras");
atras.addEventListener("click", function () {
   window.location.href = "/producto";
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
	    { searchable: true, targets: [1] },
	    //{ width: "50%", targets: [0] }
	  ],
	  pageLength: 4,
	  destroy: true,
	  language: {
	    lengthMenu: "Mostrar _MENU_ registros por página",
	    zeroRecords: "Ningún producto encontrado",
	    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
	    infoEmpty: "Ningún producto encontrado",
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
	
	  await listProductos();
	  dataTable = $("#datatable_productos").DataTable(dataTableOptions);
	
	  dataTableIsInitialized = true;
	};
	
	const listProductos = async () => 
	{
	  try 
	  {
	    const response = await fetch("http://localhost:8081/productos/viewproducts");
	    const productos = await response.json();
	    console.log(productos);
	    let content = ``;
	    productos.forEach((producto) => {
	      if (producto.observacion === "Inactivo") {
	        content += `
	          <tr>
	            <td class="centered">${producto.productoId}</td>
	            <td class="centered">${producto.nombre}</td>
	            <td class="centered">${producto.precio}</td>
	            <td class="centered">${producto.stock}</td>
	            <td class="centered">${producto.codCategoria[0].descripcion}</td>
	            <td class="centered">${producto.codMarca[0].descripcion}</td>
	            <td class="centered">${producto.unidad[0].descripcion}</td>
	            <td class="centered">${producto.observacion}</td>
	            <td class="centered">
	              <button id="delete" class="btn btn-sm btn-success" onclick="activar(${producto.productoId})">
	                <i class="fas fa-check"></i>
	              </button>
	            </td>
	          </tr>`;
	      }
	    });
	    tableBody_productos.innerHTML = content;
	  } catch (ex) {
	    alert(ex);
	  }
	};

//Editar (recoger datos)
async function openEditModal(ProductoId) 
{
	try 
	{
    	const response = await fetch(`http://localhost:8081/productos/viewproducts/${ProductoId}`);
    	if (!response.ok) {
      	throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const productoDetalles = await response.json();

  	const modalBody = document.getElementById("editModalBody");
  	modalBody.innerHTML = `
  		<div class="mb-3">
		    <label for="recipient-name" class="col-form-label">Id:</label>
			<input type="text" class="form-control" id="editProductoId" value="${productoDetalles.productoId}" readonly/>
	    </div>
	    
	    <div class="mb-3">
        	<label for="editNombre" class="col-form-label">Nombre:</label>
        	<input type="text" class="form-control" id="editNombre" value="${productoDetalles.nombre}" />
     	</div>
     	    	
     	<div class="mb-3">
        	<label for="editNombre" class="col-form-label">Precio:</label>
        	<input type="text" class="form-control" id="editPrecio" value="${productoDetalles.precio}" />
     	</div>
     	
     	<div class="mb-3">
        	<label for="editNombre" class="col-form-label">Stock:</label>
        	<input type="text" class="form-control" id="editStock" value="${productoDetalles.stock}" />
     	</div>
     	
     	<div class="mb-3">
        	<label for="editNombre" class="col-form-label">Observacion:</label>
        	<input type="text" class="form-control" id="editObservacion" value="${productoDetalles.observacion}" />
     	</div>
     	`;
     	
     	const editModal = new bootstrap.Modal(document.getElementById("editModal"));
		editModal.show();
	} 
	catch (error) 
	{
    	console.error('Error durante la obtención de detalles del producto', error);
  	}
}

//Editar (Guardar datos)
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
    			confirmarCambios();
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
    		window.location.href = "/producto";
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
    		window.location.href = "/producto";
  		} 
	});  
}
	
function saveChanges()
{
	const productoId = document.getElementById("editProductoId").value;
	const productoRequest = 
	{
		"nombre": document.getElementById("editNombre").value,
		"precio": document.getElementById("editPrecio").value,
		"stock": document.getElementById("editStock").value,
		"observacion": document.getElementById("editObservacion").value
	}
	
	actualizarProducto(productoId, productoRequest);
	
	const editModal = bootstrap.Modal.getInstance(
		document.getElementById("editModal")
	);
	editModal.hide();
}	
	
	window.addEventListener("load", async () => {
	  await initDataTable();
	});
	
async function actualizarProducto(productoId, productoRequest) 
{
  try {
    const response = await fetch(`http://localhost:8081/productos/update/${productoId}`, {
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
}

//Para que los datos se borren de los campos.
	let btncancelar = document.getElementById("btnCancelar");
	btncancelar.addEventListener("click", evento =>
	{
	   	var Nombre = document.getElementById("nombre");
	   	var Observacion = document.getElementById("observacion");
	   	var Precio = document.getElementById("precio");
	   	var Stock = document.getElementById("stock");
	   	var Categoria = document.getElementById("Selectcategoria");
	   	var Marca = document.getElementById("Selectmarca");
	   	var Unidad = document.getElementById("selectunidad");
	   	Nombre.value = "";
	   	Observacion.value = "";
	   	Precio.value = "";
	   	Stock.value = "";
	   	Categoria.value = "";
	   	Marca.value = "";
	   	Unidad.value = "";
	});


//Activar Producto
async function activar(productoId)
	{
		Swal.fire({
	  		title: "¿Desea activar al Producto?",
	  		showCancelButton: true,
	  		confirmButtonText: "Activar",
		}).then(async (result) => {
			if (result.isConfirmed) {
    			try{
					const borrar = await fetch("http://localhost:8081/productos/activate/"+ productoId,
		    	{
					method: "DELETE",
		        	headers: 
		        {
		            'Accept': 'application/json',
		            'Content-Type': 'application/json'
		        }
		    });
		    confirmarEliminarProducto();
		}
		catch(error)
		{
			alert("No se pudo activar al producto");
	        console.error('Error during activate:', error);
		}
  			} 
		});    
	}    

function confirmarEliminarProducto() {
	Swal.fire({
  		title: "Producto Activado Correctamente!",
  		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/productoinactivo";
  		} 
	}); 
}     
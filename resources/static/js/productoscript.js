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
	 
	let productosInactivosLink = document.getElementById("btninactivos");
	productosInactivosLink.addEventListener("click", function () {
		window.location.href = "/productoinactivo";
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
	    { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
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
	    productos.forEach((producto) => 
	    {
	      if (producto.observacion === "Activo")
	      {
		    const diferenciaStock = producto.stock - producto.stockmin;

            content += `
                <tr style="background-color: ${diferenciaStock <= 5 ? 'red' : 'inherit'};">
                    <td class="centered">${producto.productoId}</td>
                    <td class="centered">${producto.nombre}</td>
                    <td class="centered">${producto.precioCompra}</td>
                    <td class="centered">${producto.precioVenta}</td>
                    <td class="centered">${producto.stock}</td>
                    <td class="centered">${producto.codCategoria[0].descripcion}</td>
                    <td class="centered">${producto.codMarca[0].descripcion}</td>
                    <td class="centered">${producto.unidad[0].descripcion}</td>
                    <td class="centered">${producto.observacion}</td>
                    <td class="centered">
                        <button id="edit" class="btn btn-sm btn-primary" onclick="openEditModal('${producto.productoId}')">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button id="delete" class="btn btn-sm btn-danger" onclick="eliminar(${producto.productoId})">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>`;
            }
        });
        tableBody_productos.innerHTML = content;
    } 
    catch (ex){alert(ex);}
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
        	<input type="text" class="form-control" id="editNombre" value="${productoDetalles.nombre}" maxlength="30"/>
     	</div>
     	    	
     	<div class="mb-3">
        	<label for="editNombre" class="col-form-label">Precio Compra:</label>
        	<input type="number" class="form-control" id="editPrecio" value="${productoDetalles.precioCompra}" />
     	</div>
     	
     	<div class="mb-3">
        	<label for="editNombre" class="col-form-label">Precio Venta:</label>
        	<input type="number" class="form-control" id="editPrecioVenta" value="${productoDetalles.precioVenta}" />
     	</div>
     	
     	<div class="mb-3">
        	<label for="editNombre" class="col-form-label">Stock:</label>
        	<input type="number" class="form-control" id="editStock" value="${productoDetalles.stock}" />
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


function saveChanges()
{
	const productoId = document.getElementById("editProductoId").value;
	const productoRequest = 
	{
		"nombre": document.getElementById("editNombre").value,
		"precioCompra": document.getElementById("editPrecio").value,
		"precioVenta": document.getElementById("editPrecioVenta").value,
		"stock": document.getElementById("editStock").value,
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
    Swal.fire({
  		title: "Cambios guardados!",
  		//text: "You clicked the button!",
  		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/producto";
  		} 
	});  
  } catch (error) {
	  Swal.fire({
  		title: "Cambios no guardados por duplicidad!",
  		//text: "You clicked the button!",
  		icon: "error"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/producto";
  		} 
	});  
	  console.error('Error al actualizar el producto:', error);}
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

// Obtener categorias
const selectCategoria = document.getElementById("Selectcategoria");
fetch("http://localhost:8081/categoria/viewcategory")
    .then(response => response.json())
    .then(categorias => 
    {
        categorias.forEach(categoria => 
        {
            const option = document.createElement("option");
            option.value = categoria.codCategoria;
            option.textContent = categoria.descripcion;
            selectCategoria.appendChild(option);
        });
    })
    .catch(error => console.error("Error al obtener la lista de categorías:", error));
    
// Obtener Marcas
const selectMarca = document.getElementById("Selectmarca");
fetch("http://localhost:8081/marcas/viewmarcas")
    .then(response => response.json())
    .then(marca => 
    {
        marca.forEach(marcas => 
        {
            const option = document.createElement("option");
            option.value = marcas.codMarca;
            option.textContent = marcas.descripcion;
            selectMarca.appendChild(option);
        });
    })
    .catch(error => console.error("Error al obtener la lista de marcas:", error));
 
// Obtener unidades
const selectUnidad= document.getElementById("Selectunidad");
fetch("http://localhost:8081/unidad/viewunidades")
    .then(response => response.json())
    .then(unidades => 
    {
        unidades.forEach(unidad => 
        {
            const option = document.createElement("option");
            option.value = unidad.codMedida;
            option.textContent = unidad.descripcion;
            selectUnidad.appendChild(option);
        });
    })
    .catch(error => console.error("Error al obtener la lista de unidades de medida:", error));

//Registrar el nuevo
	let boton = document.getElementById("btnAceptar");
	boton.addEventListener("click", evento =>
	{
	    newProducto();
	});
	
	let newProducto = async () => {	
	    // Captura los valores del formulario
	    let CategoriaValue = document.getElementById("Selectcategoria").value;
	    let MarcaValue = document.getElementById("Selectmarca").value;
	    let UnidadValue = document.getElementById("Selectunidad").value;
		
		let producto = 
		{
			"nombre": document.getElementById("nombre").value,
			"precioCompra": document.getElementById("preciocompra").value,
			"precioVenta": document.getElementById("precioventa").value,
			"stock": document.getElementById("stock").value,
			"codCategoria": [CategoriaValue],
			"codMarca": [MarcaValue],
			"unidad": [UnidadValue],
			"observacion": "Activo"
		};
	    try {
	        const response = await fetch("http://localhost:8081/productos/register", {
	            method: "POST",
	            headers: {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify(producto),
	        });
	
	        if (!response.ok) {
	            throw new Error(`HTTP error! Status: ${response.status}`);
	        }
	        
	        const data = await response.json();
			console.log(data.message);	
			Swal.fire({
  				title: "Producto registrado correctamente!",
  				icon: "success"
			}).then((result) => {
				if (result.isConfirmed) {
    				window.location.href = "/producto";
  				} 
			}); 
	    } 
	    catch (error) 
	    {
			Swal.fire({
	  			title: "No se pudo registrar nuevo producto!",
	  			//text: "You clicked the button!",
	  			icon: "error"
			});  
	    }
	};

//Borrar 
	let eliminar = async(ProductoId) =>
	{
		Swal.fire({
	  		title: "¿Desea guardar los cambios realizados?",
	  		showCancelButton: true,
	  		confirmButtonText: "Eliminar",
		}).then(async (result) => {
			if (result.isConfirmed) {
    			try
		{
			const borrar = await fetch("http://localhost:8081/productos/delete/"+ProductoId,
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
			alert("No se pudo eliminar el producto");
	        console.error('Error during delete:', error);
		}
  			} 
		}); 
		
	}; 
	
function confirmarEliminarProducto() {
	Swal.fire({
  		title: "Producto Eliminado Correctamente!",
  		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/producto";
  		} 
	});  
}      
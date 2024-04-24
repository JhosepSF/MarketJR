let atras = document.getElementById("btnAtras");
atras.addEventListener("click", function () {
   window.location.href = "/proveedor";
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
	    zeroRecords: "Ningún proveedor encontrado",
	    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
	    infoEmpty: "Ningún proveedor encontrado",
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
	
	  await listProveedores();
	  dataTable = $("#datatable_proveedores").DataTable(dataTableOptions);
	
	  dataTableIsInitialized = true;
	};
	
	const listProveedores= async () => 
	{
	  try 
	  {
	    const response = await fetch("http://localhost:8081/proveedores/viewproveedores");
	    const proveedor = await response.json();
	    let content = ``;
	    proveedor.forEach((proveedores) => {
		   if (proveedores.observacion === "Inactivo") {
	        content += `
	          <tr>
	            <td class="centered">${proveedores.ruc}</td>
	            <td class="centered">${proveedores.razonSocial}</td>
	            <td class="centered">${proveedores.representante}</td>
	            <td class="centered">${proveedores.direccion}</td>
	            <td class="centered">${proveedores.telefono}</td>
	            <td class="centered">${proveedores.observacion}</td>
	            <td class="centered">
	              <button id="delete" class="btn btn-sm btn-success" onclick="activar(${proveedores.ruc})">
	                <i class="fas fa-check"></i>
	              </button>
	            </td>
	          </tr>`;
	      }
	    });
	    tableBody_proveedores.innerHTML = content;
	  } catch (ex) {
	    alert(ex);
	  }
	};

//Editar (recoger datos)
async function openEditModal(ruc) 
{
	try 
	{
    	const response = await fetch(`http://localhost:8081/proveedores/viewproveedores/${ruc}`);
    	if (!response.ok) {
      	throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const proveedorDetalles = await response.json();

  	const modalBody = document.getElementById("editModalBody");
  	modalBody.innerHTML = `
  		<div class="mb-3">
		    <label for="recipient-name" class="col-form-label">RUC:</label>
			<input type="text" class="form-control" id="editRuc" value="${proveedorDetalles.ruc}" readonly/>
	    </div>
	    
	    <div class="mb-3">
        	<label for="editNombre" class="col-form-label">Telefono:</label>
        	<input type="text" class="form-control" id="editTelefono" value="${proveedorDetalles.telefono}" />
     	</div>
     	
     	<div class="mb-3">
        	<label for="editNombre" class="col-form-label">Observacion:</label>
        	<input type="text" class="form-control" id="editObservacion" value="${proveedorDetalles.observacion}" />
     	</div>
     	`;
	} 
	catch (error) 
	{
    	console.error('Error durante la obtención de detalles del proveedor', error);
  	}
  		
	const editModal = new bootstrap.Modal(document.getElementById("editModal"));
	editModal.show();
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
    		window.location.href = "/proveedor";
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
    		window.location.href = "/proveedor";
  		} 
	});  
}

function saveChanges()
{
	const ruc = document.getElementById("editRuc").value;
	const proveedorRequest = 
	{
		"telefono": document.getElementById("editTelefono").value,
		"observacion": document.getElementById("editObservacion").value
	}
	
	actualizarProveedor(ruc, proveedorRequest);
	
	const editModal = bootstrap.Modal.getInstance(
		document.getElementById("editModal")
	);
	editModal.hide();
}	
	
	window.addEventListener("load", async () => {
	  await initDataTable();
	});
	
async function actualizarProveedor(ruc, proveedorRequest) 
{
  try {
    const response = await fetch(`http://localhost:8081/proveedores/update/${ruc}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proveedorRequest),
    });

    if (!response.ok) 
    {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message);
  } catch (error) {console.error('Error al actualizar el proveedor:', error);}
}

//Para que los datos se borren de los campos.
	let btncancelar = document.getElementById("btnCancelar");
	btncancelar.addEventListener("click", evento =>
	{
	   	var Telefono = document.getElementById("telefono");
	   	Telefono.value = "";
	});

//Activar Proveedor
async function activar(ruc)
	{
		Swal.fire({
	  		title: "¿Desea activar al Proveedor?",
	  		showCancelButton: true,
	  		confirmButtonText: "Activar",
		}).then(async (result) => {
			if (result.isConfirmed) {
    			try{
					const borrar = await fetch("http://localhost:8081/proveedores/activate/"+ ruc,
		    	{
					method: "DELETE",
		        	headers: 
		        {
		            'Accept': 'application/json',
		            'Content-Type': 'application/json'
		        }
		    });
		    confirmarEliminarProveedor();
		}
		catch(error)
		{
			alert("No se pudo activar al proveedor");
	        console.error('Error during activate:', error);
		}
  			} 
		});    
	}    

function confirmarEliminarProveedor() {
	Swal.fire({
  		title: "Proveedor Activado Correctamente!",
  		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/proveedorInactivos";
  		} 
	});  
}     
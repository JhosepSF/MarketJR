let atras = document.getElementById("btnAtras");
atras.addEventListener("click", function () {
   window.location.href = "/verusuario";
 });
	    
//Obtener empleados
	let dataTable;
	let dataTableIsInitialized = false;
	
	const dataTableOptions = {
	  //scrollX: "2000px",
	  lengthMenu: [5, 10, 15, 20],
	  columnDefs: [
	    { className: "centered", targets: [0, 1, 2, 3, 4, 5,6,7] },
	    { orderable: true, targets: [1] },
	    { searchable: true, targets: [1, 2, 3] },
	    //{ width: "50%", targets: [0] }
	  ],
	  pageLength: 4,
	  destroy: true,
	  language: {
	    lengthMenu: "Mostrar _MENU_ registros por página",
	    zeroRecords: "Ningún usuario encontrado",
	    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
	    infoEmpty: "Ningún usuario encontrado",
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
	
	  await listUsers();
	
	  dataTable = $("#datatable_empleado").DataTable(dataTableOptions);
	
	  dataTableIsInitialized = true;
	};
	
	const listUsers = async () => {
	  try {
	    const response = await fetch("http://localhost:8081/empleado/viewuser");
	    const empleados = await response.json();
		
	    let content = ``;
	    empleados.forEach((empleado) => {
	      if (empleado.observacion === "Inactivo") {
	        content += `
	          <tr>
	            <td class="centered">${empleado.empleadoDni}</td>
	            <td class="centered">${empleado.empleadoNombre}</td>
	            <td class="centered">${empleado.empleadoApellidos}</td>
	            <td class="centered">${empleado.empleadoMail}</td>
	            <td class="centered">${empleado.empleadoDirection}</td>
	            <td class="centered">${empleado.empleadoTelefono}</td>
	            <td class="centered">${empleado.observacion}</td>
	            <td>
	              <button id="delete" class="btn btn-sm btn-success" onclick="activar(${empleado.empleadoDni})">
	                <i class="fas fa-check"></i>
	              </button>
	            </td>
	          </tr>`;
	      }
	    });
	
	    tableBody_empleado.innerHTML = content;
	  } catch (ex) {
	    alert(ex);
	  }
	};

//Editar empleados (recoger datos)
async function openEditModal(Dni) 
{
	try 
	{
    	const response = await fetch(`http://localhost:8081/empleado/viewuser/${Dni}`);
    	if (!response.ok) {
      	throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const empleadoDetalles = await response.json();

  	const modalBody = document.getElementById("editModalBody");
  	modalBody.innerHTML = `
  		<div class="mb-3">
		    <label for="recipient-name" class="col-form-label">DNI:</label>
			<input type="text" class="form-control" id="editDNI" value="${empleadoDetalles.empleadoDni}" readonly/>
	    </div>
	    
    	<div class="mb-3">
        	<label for="editNombre" class="col-form-label">Nombre:</label>
        	<input type="text" class="form-control" id="editNombre" value="${empleadoDetalles.empleadoNombre}" />
     	</div>
     	
     	<div class="mb-3">
        	<label for="editApellido" class="col-form-label">Apellido:</label>
        	<input type="text" class="form-control" id="editApellido" value="${empleadoDetalles.empleadoApellidos}" />
     	</div>
     	
     	<div class="mb-3">
        	<label for="editCorreo" class="col-form-label">Correo Electrónico:</label>
        	<input type="text" class="form-control" id="editCorreo" value="${empleadoDetalles.empleadoMail}" />
     	</div>
     
     	<div class="mb-3">
        	<label for="editDireccion" class="col-form-label">Dirección actual:</label>
        	<input type="text" class="form-control" id="editDireccion" value="${empleadoDetalles.empleadoDirection}" />
     	</div>
     	
     	<div class="mb-3">
        	<label for="editTelefono" class="col-form-label">Teléfono:</label>
        	<input type="text" class="form-control" id="editTelefono" value="${empleadoDetalles.empleadoTelefono}" />
     	</div>
     	`;
	} 
	catch (error) 
	{
    	console.error('Error durante la obtención de detalles del empleado:', error);
  	}
  		
	const editModal = new bootstrap.Modal(document.getElementById("editModal"));
	editModal.show();
}

//Editar empleado (Guardar datos)
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
    			confirmarCambios();
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
    		window.location.href = "/verusuario";
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
    		window.location.href = "/verusuario";
  		} 
	});  
}

function saveChanges()
{
	const dni = document.getElementById("editDNI").value;
	const empleadoRequest = 
	{
		"empleadonombre": document.getElementById("editNombre").value,
	    "empleadoapellidos": document.getElementById("editApellido").value,
	    "empleadomail": document.getElementById("editCorreo").value,
	    "empleadodireccion": document.getElementById("editDireccion").value,
	    "empleadoTelefono": document.getElementById("editTelefono").value,
	    "observacion": "Activo"
	}
	
	actualizarEmpleado(dni, empleadoRequest);
	
	const editModal = bootstrap.Modal.getInstance(
		document.getElementById("editModal")
	);
	editModal.hide();
}	
	
	window.addEventListener("load", async () => {
	  await initDataTable();
	});
	
async function actualizarEmpleado(dni, empleadoRequest) 
{
  try {
    const response = await fetch(`http://localhost:8081/empleado/update/${dni}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleadoRequest),
    });

    if (!response.ok) 
    {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message);
  } catch (error) {console.error('Error al actualizar el usuario:', error);}
}


//Para que los datos se borren de los campos.
	let btncancelar = document.getElementById("btnCancelar");
	btncancelar.addEventListener("click", evento =>
	{
	   	var dni = document.getElementById("ndni");
	   	var nombre = document.getElementById("nombre");
	   	var apellido = document.getElementById("apellido");
	   	var correo = document.getElementById("correo");
	   	var direccion = document.getElementById("direccion");
	   	var telefono = document.getElementById("telefono");
	   	var password = document.getElementById("password");
	   	var perfil = document.getElementById("perfilSelec");
	   	var observacion = document.getElementById("observacion");
	   	dni.value = "";
	   	nombre.value = "";
	   	apellido.value = "";
	   	correo.value = "";
	   	direccion.value = "";
	   	telefono.value = "";
	   	password.value = "";
	   	perfil.value = "";
	   	observacion.value = "";
	});
	
//API RENIEC OBTENER NOMBRES Y APELLIDOS
	let btnDNI = document.getElementById("buscar");
	btnDNI.addEventListener("click", traer);
		
	function traer() {
    let dniReniec = document.getElementById("ndni").value;
    	fetch(
			"https://dniruc.apisperu.com/api/v1/dni/"+ dniReniec+ "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRlcmxyZW5naWZvQGdtYWlsLmNvbSJ9.N4REyBveoema1OUAGWs7ZIsU9OrVUNMLM5f-7j1Bb8A"
    	)
    .then((res) => res.json())
    .then((data) => {
            document.getElementById("nombre").value = data.nombres || ''; // Asigna nombres o un string vacío si no existe
            const apellidopaterno = data.apellidoPaterno || '';
            const apellidomaterno = data.apellidoMaterno || '';
            document.getElementById("apellido").value = apellidopaterno + " " + apellidomaterno;
    })
    .catch((error) => {
        console.error("Error en la solicitud fetch:", error);
    });
}

//Activar Usuarios
async function activar(empleadoDni)
	{
		Swal.fire({
	  		title: "¿Desea activar al Empleado?",
	  		showCancelButton: true,
	  		confirmButtonText: "Activar",
		}).then(async (result) => {
			if (result.isConfirmed) {
    			try{
					const borrar = await fetch("http://localhost:8081/empleado/activate/"+ empleadoDni,
		    	{
					method: "DELETE",
		        	headers: 
		        {
		            'Accept': 'application/json',
		            'Content-Type': 'application/json'
		        }
		    });
		    confirmarEliminarEmpleado();
		}
		catch(error)
		{
			alert("No se pudo activar al empleado");
	        console.error('Error during activate:', error);
		}
  			} 
		});    
	}    

function confirmarEliminarEmpleado() {
	Swal.fire({
  		title: "Empleado Activado Correctamente!",
  		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/usuarioinactivo";
  		} 
	});  
}     
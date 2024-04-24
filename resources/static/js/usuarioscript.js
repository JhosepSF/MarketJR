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
	 
	let usuariosInactivosLink = document.getElementById("btninactivos");
	usuariosInactivosLink.addEventListener("click", function () {
	    // Redirige a la página deseada
	 	window.location.href = "/usuarioinactivo";
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
	    
//Obtener empleados
	
	let dataTable;
	let dataTableIsInitialized = false;
	
	const dataTableOptions = {
	  //scrollX: "2000px",
	  lengthMenu: [5, 10, 15, 20],
	  columnDefs: [
	    { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
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
	      if (empleado.observacion === "Activo") {
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
	              <button id="edit" class="btn btn-sm btn-primary" onclick="openEditModal('${empleado.empleadoDni}')">
	                <i class="fa-solid fa-pencil"></i>
	              </button>
	              <button id="delete" class="btn btn-sm btn-danger" onclick="eliminarEmpleado(${empleado.empleadoDni})">
	                <i class="fa-solid fa-trash-can"></i>
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
        	<input type="text" class="form-control" id="editNombre" value="${empleadoDetalles.empleadoNombre}" readonly/>
     	</div>
     	
     	<div class="mb-3">
        	<label for="editApellido" class="col-form-label">Apellido:</label>
        	<input type="text" class="form-control" id="editApellido" value="${empleadoDetalles.empleadoApellidos}" readonly/>
     	</div>
     	
     	<div class="mb-3">
        	<label for="editCorreo" class="col-form-label">Correo Electrónico:</label>
        	<input type="text" class="form-control" id="editCorreo" value="${empleadoDetalles.empleadoMail}" maxlength="50"/>
     	</div>
     
     	<div class="mb-3">
        	<label for="editDireccion" class="col-form-label">Dirección actual:</label>
        	<input type="text" class="form-control" id="editDireccion" value="${empleadoDetalles.empleadoDirection}" maxlength="50"/>
     	</div>
     	
     	<div class="mb-3">
        	<label for="editTelefono" class="col-form-label">Teléfono:</label>
        	<input type="number" class="form-control" id="editTelefono" value="${empleadoDetalles.empleadoTelefono}" />
     	</div>
     	
     	<div class="mb-3">
        	<label for="editTelefono" class="col-form-label">Nueva Contraseña:</label>
        	<input type="text" class="form-control" id="editPassword"/>
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
	let nombre = document.getElementById("editNombre").value;
	let apellido = document.getElementById("editApellido").value;
	let mail = document.getElementById("editCorreo").value;
	let direccion = document.getElementById("editDireccion").value;
	let telefono = document.getElementById("editTelefono").value;
	let password = document.getElementById("editPassword").value;
	
	if (!dni || !nombre || !apellido || !mail || !direccion || !telefono || !password) {
			Swal.fire({
			  title: "Todos los campos deben ser rellenados",
			  icon: "error"
			});
		} 
		else if (dni.length !== 8) { 
			Swal.fire({
			  title: "El DNI debe tener 8 dígitos",
			  icon: "error"
			});
		} 
		else if (telefono.length !== 9) {
			Swal.fire({
			  title: "El teléfono debe tener 9 dígitos",
			  icon: "error"
			});
		}
		else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
			Swal.fire({
			  title: "La contraseña debe tener al menos 8 caracteres e incluir al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial",
			  icon: "error"
			});
		}
		else
		{
			const empleadoRequest = 
			{
				"empleadonombre": nombre,
			    "empleadoapellidos": apellido,
			    "empleadomail": mail,
			    "empleadodireccion": direccion,
			    "empleadoTelefono": telefono,
			    "empleadoPassword": password
			}
			actualizarEmpleado(dni, empleadoRequest);
			
			const editModal = bootstrap.Modal.getInstance(
				document.getElementById("editModal")
			);
			editModal.hide();
		}
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

//Busqueda de perfiles
	const listaPerfiles = document.getElementById("listaPerfiles");
	// Realiza la solicitud AJAX
	fetch("http://localhost:8081/perfiles/listar")
	.then(response => response.json())
	.then(perfiles => 
	{
		// Itera sobre los perfiles y crea elementos de lista dinámicamente
		perfiles.forEach(perfil => 
		{
		    const listItem = document.createElement("li");
		    const link = document.createElement("a");
		    link.classList.add("dropdown-item");
		    link.href = "#";
		    link.textContent = perfil.nombre;
		    listItem.appendChild(link);
		    listaPerfiles.appendChild(listItem);
	  	});
	})
	.catch(error => console.error("Error al obtener la lista de perfiles:", error));
  
  
  	document.addEventListener("DOMContentLoaded", function () {
  	// Utilizamos el documento como el contenedor principal
  	document.addEventListener("click", function (event) {
    const listaPerfiles = document.getElementById("listaPerfiles");
    const perfilSelec = document.getElementById("perfilSelec");

    // Verificamos si el clic ocurrió dentro de la lista de perfiles
    const isClickInsideDropdown = listaPerfiles.contains(event.target);

    if (isClickInsideDropdown) 
    {
      // Si se hizo clic en un elemento dentro de la lista
      event.preventDefault();
      
      const clickedItem = event.target.closest(".dropdown-item");
      
      if (clickedItem) 
      {
        const perfilSeleccionado = clickedItem.textContent.trim();
        perfilSelec.value = perfilSeleccionado;

      }
    } 
    else 
    {}
  });
});

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
        Swal.fire({
				title: "No se encontró el DNI!",
				//text: "You clicked the button!",
				icon: "info"
			})
        console.error("Error en la solicitud fetch:", error);
    });
}

//Registrar el nuevo empleado
	let boton = document.getElementById("btnAceptar");
	boton.addEventListener("click", evento =>
	{
	    newuser();
	});
	
	let newuser = async () => {	
	    // Captura los valores del formulario
	    let perfilSelecValue = document.getElementById("perfilSelec").value;
		let perfilValue = (perfilSelecValue === "GERENTE") ? "1" : (perfilSelecValue === "CAJERO") ? "2" : (perfilSelecValue === "ALMACENERO") ? "3" : "";
		let dni = document.getElementById("ndni").value
		let nombre = document.getElementById("nombre").value;
		let apellido = document.getElementById("apellido").value;
		let mail = document.getElementById("correo").value;
		let direccion =  document.getElementById("direccion").value;
		let telefono = document.getElementById("telefono").value;
		let password = document.getElementById("password").value;
		
		if (!dni || !nombre || !apellido || !mail || !direccion || !telefono || !password) {
			Swal.fire({
			  title: "Todos los campos deben ser rellenados",
			  icon: "error"
			});
		} 
		else if (dni.length !== 8) { 
			Swal.fire({
			  title: "El DNI debe tener 8 dígitos",
			  icon: "error"
			});
		} 
		else if (telefono.length !== 9) {
			Swal.fire({
			  title: "El teléfono debe tener 9 dígitos",
			  icon: "error"
			});
		}
		else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
			Swal.fire({
			  title: "La contraseña debe tener al menos 8 caracteres e incluir al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial",
			  icon: "error"
			});
		}
		else
		{
		    let empleado = 
			{
			    "empleadodni": dni,
			    "empleadonombre": nombre,
			    "empleadoapellidos": apellido,
			    "empleadomail": mail,
			    "empleadodireccion": direccion,
			    "empleadoTelefono": telefono,
			    "empleadoPassword": password,
			    "perfiles": [perfilValue],
			    "observacion": "Activo"
			};
			try {
		        const response = await fetch("http://localhost:8081/empleado/register", {
		            method: "POST",
		            headers: {
		                'Accept': 'application/json',
		                'Content-Type': 'application/json'
		            },
		            body: JSON.stringify(empleado),
		        });
		
		        if (!response.ok) {
		            throw new Error(`HTTP error! Status: ${response.status}`);
		        }
		
		        const data = await response.json();
				console.log(data.message);	
				Swal.fire({
  				title: "Empleado registrado correctamente!",
  				icon: "success"
				}).then((result) => {
					if (result.isConfirmed) {
    					window.location.href = "/verusuario";
  					} 
				});  
		    } 
		    catch (error) 
		    {
				Swal.fire({
				title: "Usuario ya existe!",
				//text: "You clicked the button!",
				icon: "error"
				});
				console.error('Error during new user:', error);
		    }
		}
	};

//Borrar Usuarios
	let eliminarEmpleado = async(empleadoDni) =>
	{
		Swal.fire({
	  		title: "¿Desea Eliminar al Empleado?",
	  		showCancelButton: true,
	  		confirmButtonText: "Eliminar",
		}).then(async (result) => {
			if (result.isConfirmed) {
    			try{
					const borrar = await fetch("http://localhost:8081/empleado/delete/"+ empleadoDni,
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
			alert("No se pudo eliminar al empleado");
	        console.error('Error during delete:', error);
		}
  			} 
		});    
	}    

function confirmarEliminarEmpleado() {
	Swal.fire({
  		title: "Empleado Eliminado Correctamente!",
  		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/verusuario";
  		} 
	});  
}    
	    
//Recuperar el user de la pagina anterior
	var usuarioText = localStorage.getItem("usuarioText");
    document.getElementById("user").innerText = usuarioText;	  
    
      
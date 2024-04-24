//Barra de navegacion
let sidebarToggle = document.querySelector("#sidebar-toggle");

sidebarToggle.addEventListener("click", function() {
	document.querySelector("#sidebar").classList.toggle("collapsed");
});

let usuariosLink = document.getElementById("usuarios");
usuariosLink.addEventListener("click", function() {
	window.location.href = "/verusuario";
});

let categoriaLink = document.getElementById("categorias");
categoriaLink.addEventListener("click", function() {
	window.location.href = "/categoria";
});

let productosLink = document.getElementById("productos");
productosLink.addEventListener("click", function() {
	window.location.href = "/producto";
});

let marcasLink = document.getElementById("marcas");
marcasLink.addEventListener("click", function() {
	window.location.href = "/marca";
});

let unidadLink = document.getElementById("unidad");
unidadLink.addEventListener("click", function() {
	window.location.href = "/unidad";
});

let proveedorLink = document.getElementById("proveedor");
proveedorLink.addEventListener("click", function() {
	window.location.href = "/proveedor";
});

let comprasLink = document.getElementById("compras");
comprasLink.addEventListener("click", function() {
	window.location.href = "/compras";
});

let proveedorInactivo = document.getElementById("btninactivos");
proveedorInactivo.addEventListener("click", function() {
	window.location.href = "/proveedorInactivos";
});

let aperturaLink = document.getElementById("apertura");
aperturaLink.addEventListener("click", function() {
	window.location.href = "/apertura";
});

let ventaLink = document.getElementById("pedido");
ventaLink.addEventListener("click", function() {
	window.location.href = "/venta";
});

let cerrarLink = document.getElementById("cerrar");
cerrarLink.addEventListener("click", function() {
	window.location.href = "/cerrar";
});

let reporteLink = document.getElementById("reporte");
reporteLink.addEventListener("click", function() {
	window.location.href = "/reportes";
});

//Recuperar el user de la pagina anterior
var usuarioText = localStorage.getItem("usuarioText");
document.getElementById("user").innerText = usuarioText;

//Cerrar Sesion
let sesionElement = document.getElementById("sesion");
sesionElement.addEventListener("click", async () => {
	let logoutData = {};
	try {
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
		if (response.ok) {
			console.log("Logout exitoso");
			alert("Se cerro la sesion");
			window.location.href = "/logout";
		}
		else {
			alert("No se pudo cerrar la sesion");
			console.error(`Error durante el logout. Código de estado: ${response.status}`);
		}
	}
	catch (error) {
		console.error('Error durante el logout:', error);
	}
});

//API SUNAT OBTENER RAZON, DIRECCION Y TELEFONO
let btnRUC = document.getElementById("buscar");
btnRUC.addEventListener("click", traer);
function traer() {
	let rucSunat = document.getElementById("nruc").value;
	fetch
		(
			"https://dniruc.apisperu.com/api/v1/ruc/" + rucSunat + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRlcmxyZW5naWZvQGdtYWlsLmNvbSJ9.N4REyBveoema1OUAGWs7ZIsU9OrVUNMLM5f-7j1Bb8A"
		)
		.then((res) => res.json())
		.then((data) => {
			document.getElementById("razon").value = data.razonSocial || '';
			document.getElementById("direccion").value = data.direccion || '';
			document.getElementById("telefono").value = data.telefonos || '';
		})
		.catch((error) => {
			Swal.fire({
				title: "No se encontró el RUC!",
				//text: "You clicked the button!",
				icon: "info"
			});
		});
}

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

const listProveedores = async () => {
	try {
		const response = await fetch("http://localhost:8081/proveedores/viewproveedores");
		const proveedor = await response.json();
		let content = ``;
		proveedor.forEach((proveedores) => {
			if (proveedores.observacion === "Activo") {
				content += `
	          <tr>
	            <td class="centered">${proveedores.ruc}</td>
	            <td class="centered">${proveedores.razonSocial}</td>
	            <td class="centered">${proveedores.representante}</td>
	            <td class="centered">${proveedores.direccion}</td>
	            <td class="centered">${proveedores.telefono}</td>
	            <td class="centered">${proveedores.observacion}</td>
	            <td class="centered">
	              <button id="edit" class="btn btn-sm btn-primary" onclick="openEditModal('${proveedores.ruc}')">
	                <i class="fa-solid fa-pencil"></i>
	              </button>
	              <button id="delete" class="btn btn-sm btn-danger" onclick="eliminar(${proveedores.ruc})">
	                <i class="fa-solid fa-trash-can"></i>
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
async function openEditModal(ruc) {
	try {
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
        	<input type="number" class="form-control" id="editTelefono" value="${proveedorDetalles.telefono}" />
     	</div>
     	
     	`;
	}
	catch (error) {
		console.error('Error durante la obtención de detalles del proveedor', error);
	}

	const editModal = new bootstrap.Modal(document.getElementById("editModal"));
	editModal.show();
}

//Editar (Guardar datos)
let save = document.getElementById("saveChangesBtn");
save.addEventListener("click", evento => {
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

function saveChanges() {
	const ruc = document.getElementById("editRuc").value;
	const proveedorRequest =
	{
		"telefono": document.getElementById("editTelefono").value,
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

async function actualizarProveedor(ruc, proveedorRequest) {
	try {
		const response = await fetch(`http://localhost:8081/proveedores/update/${ruc}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(proveedorRequest),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		console.log(data.message);
	} catch (error) { console.error('Error al actualizar el proveedor:', error); }
}

//Para que los datos se borren de los campos.
let btncancelar = document.getElementById("btnCancelar");
btncancelar.addEventListener("click", evento => {
	var Telefono = document.getElementById("telefono");
	Telefono.value = "";
});

//Registrar el nuevo
let boton = document.getElementById("btnAceptar");
boton.addEventListener("click", evento => {
	newProveedor();
});

let newProveedor = async () => {
	// Captura los valores del formulario
	let proveedor =
	{
		"ruc": document.getElementById("nruc").value,
		"razonsocial": document.getElementById("razon").value,
		"representante": document.getElementById("representante").value,
		"direccion": document.getElementById("direccion").value,
		"observacion": "Activo",
		"telefono": document.getElementById("telefono").value
	};
	try {
		const response = await fetch("http://localhost:8081/proveedores/register", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(proveedor),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		// Aquí puedes manejar la respuesta del servidor según sea necesario
		const data = await response.json();
		console.log(data.message);
		Swal.fire({
			title: "Proveedor registrado correctamente!",
			icon: "success"
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.href = "/proveedor";
			}
		});
	}
	catch (error) {
		Swal.fire({
			title: "No se pudo registrar nuevo proveedor!",
			//text: "You clicked the button!",
			icon: "error"
		});
	}
};

//Borrar Proveedor
let eliminar = async (ruc) => {
	Swal.fire({
		title: "¿Desea Eliminar al Proveedor?",
		showCancelButton: true,
		confirmButtonText: "Eliminar",
	}).then(async (result) => {
		if (result.isConfirmed) {
			try {
				const borrar = await fetch("http://localhost:8081/proveedores/delete/" + ruc,
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
			catch (error) {
				alert("No se pudo eliminar el proveedor");
				console.error('Error during delete:', error);
			}
		}
	});
};

function confirmarEliminarProveedor() {
	Swal.fire({
		title: "Proveedor Eliminado Correctamente!",
		icon: "success"
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = "/proveedor";
		}
	});
}        
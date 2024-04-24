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

//Recuperar el user de la pagina anterior y ponerlo en user de la apertura de caja
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

//Fecha, hora, usuario y estado actual
var fechaActual = new Date().toLocaleDateString('en-CA');
document.getElementById("fecha").setAttribute("min", fechaActual);
document.getElementById("fecha").setAttribute("max", fechaActual);
var horaActual = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
if (new Date().getHours() >= 23) {
	document.getElementById("estado").value = "No Aperturado";
	document.getElementById("hora").value = horaActual;
	document.getElementById("usuario").value = usuarioText;
}
else {
	fetch(`http://localhost:8081/apertura/actual/${fechaActual}`)
		.then(response => response.json())
		.then(data => {
			document.getElementById("estado").value = data.estado;
			document.getElementById("estado").readOnly = true;

			document.getElementById("fecha").value = data.fecha;
			document.getElementById("fecha").readOnly = true;

			document.getElementById("hora").value = data.horaapertura;
			document.getElementById("hora").readOnly = true;

			document.getElementById("monto").value = data.montoapertura;
			document.getElementById("monto").readOnly = true;

			document.getElementById("usuario").value = data.idempleado.empleadoNombre;
			document.getElementById("usuario").readOnly = true;

			document.getElementById("btnAperturar").disabled = true;
		})
		.catch(error => {
			console.error('Error al obtener datos de la URL:', error);
			document.getElementById("estado").value = "No aperturado";
			document.getElementById("fecha").value = fechaActual;
			document.getElementById("hora").value = horaActual;
			document.getElementById("usuario").value = usuarioText;
		});
}

//Aperturar caja
async function grabarDatos() {
	document.getElementById("estado").value = "Abierto";
	document.getElementById("estado").readOnly = true;
	document.getElementById("fecha").readOnly = true;
	document.getElementById("hora").readOnly = true;
	document.getElementById("usuario").readOnly = true;
	document.getElementById("monto").readOnly = true;
	document.getElementById("btnAperturar").disabled = true;

	let nombre = document.getElementById("usuario").value;
	let dni;
	try {
		const response = await fetch(`http://localhost:8081/apertura/empleadonombre/${nombre}`);
		const empleado = await response.json();
		const empledni = empleado.empleadoDni;
		dni = empledni;

		let reporte =
		{
			"estado": document.getElementById("estado").value,
			"fecha": document.getElementById("fecha").value,
			"horaapertura": document.getElementById("hora").value,
			"montoapertura": document.getElementById("monto").value,
			"dni": dni
		}
		console.log(reporte);
		try {
			const response = await fetch("http://localhost:8081/apertura/abrir", {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(reporte),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			console.log(data.message);
			Swal.fire({
				title: "Registro de apertura enviado correctamente!",
				icon: "success"
			}).then((result) => {
				if (result.isConfirmed) {
					window.location.href = "/venta";
				}
			});
		}
		catch (error) {
			Swal.fire({
				title: "Registro de apertura enviado correctamente!",
				icon: "success"
			}).then((result) => {
				if (result.isConfirmed) {
					window.location.href = "/venta";
				}
			});
		}
	}
	catch (ex) {
		alert(ex);
	}
}

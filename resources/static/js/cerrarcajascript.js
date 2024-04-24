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
     
//Recuperar el user de la pagina anterior y ponerlo en user de la apertura de caja
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

//Fecha, hora, usuario y estado actual
document.addEventListener('DOMContentLoaded', function() 
{
    var fechaActual = new Date().toLocaleDateString('en-CA');
    document.getElementById("fecha").setAttribute("min", fechaActual);
    document.getElementById("fecha").setAttribute("max", fechaActual);
	var horaActual = new Date().toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'});

 	fetch(`http://localhost:8081/apertura/actual/${fechaActual}`)
    .then(response => response.json())
    .then(data => 
    {
		if(data.estado == "Abierto")
		{	
	        document.getElementById("estado").value = data.estado;
	
	        document.getElementById("fecha").value = data.fecha;
	
	        document.getElementById("hrapertura").value = data.horaapertura;
	        
	        document.getElementById("hrcierre").value = horaActual;
	
	        document.getElementById("montoapertura").value = data.montoapertura;
	
	        document.getElementById("usuario").value = data.idempleado.empleadoNombre;
	        
	        document.getElementById("montocierre").value = data.montocierre;
	        document.getElementById("montocierre").readOnly = true;
	        
	        document.getElementById("btnCerrar").disabled = false;
        }
        
        else if(data.estado == "Cerrado")
		{	
	        document.getElementById("estado").value = data.estado;
	
	        document.getElementById("fecha").value = data.fecha;
	
	        document.getElementById("hrapertura").value = data.horaapertura;
	        
	        document.getElementById("hrcierre").value = horaActual;
	
	        document.getElementById("montoapertura").value = data.montoapertura;
	        
	        document.getElementById("montocierre").value = data.montocierre;
	        document.getElementById("montocierre").readOnly = true;
	
	        document.getElementById("usuario").value = data.idempleado.empleadoNombre;
	        
	        document.getElementById("btnCerrar").disabled = true;
        }
        
        else 
        {
			console.error("No se encuentra abierto el sistema");
	        document.getElementById("estado").value = "No aperturado";
			document.getElementById("fecha").value = fechaActual;
	        document.getElementById("hrcierre").value = horaActual;
	        document.getElementById("usuario").value = usuarioText;
	        document.getElementById("btnCerrar").disabled = true;
		}

    })
    .catch(error => 
    {
        console.error('Error al obtener datos de la URL:', error);
        document.getElementById("estado").value = "No aperturado";
		document.getElementById("fecha").value = fechaActual;
        document.getElementById("hrcierre").value = horaActual;
        document.getElementById("usuario").value = usuarioText;
        document.getElementById("btnCerrar").disabled = true;
    });
})
	
//Aperturar caja
	async function cerraCaja() 
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
		
	}
	
	
	async function saveChanges(){
		let reporte =
	  	{
			"estado" : "Cerrado",
			"fecha" : document.getElementById("fecha").value,
		 	"horacierre" : document.getElementById("hrcierre").value,
		  	"montocierre" : document.getElementById("montocierre").value
		}
		console.log(reporte);
		try
		{
			const response = await fetch("http://localhost:8081/apertura/cerrar", {
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
  				title: "Registro de cierre enviado correctamente!",
  				icon: "success"
				}).then((result) => {
					if (result.isConfirmed) {
    					window.location.href = "/menu";
  					} 
				}); 
		}
		catch (error)
		{
			Swal.fire({
  				title: "Registro de cierre enviado correctamente!",
  				icon: "success"
				}).then((result) => {
					if (result.isConfirmed) {
    					window.location.href = "/menu";
  					} 
				}); 
		}
	}
	
	function cancelarCambios() {
	Swal.fire({
  		title: "Cambios no guardados!",
  		//text: "You clicked the button!",
  		icon: "info"
	}).then((result) => {
		if (result.isConfirmed) {
    		window.location.href = "/cerrar";
  		} 
	});  
}
	
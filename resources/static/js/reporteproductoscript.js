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
	    
		let dataTable;
		let dataTableIsInitialized = false;
		
		const dataTableOptions = {
			//scrollX: "2000px",
			lengthMenu: [5, 10],
			columnDefs: [
				{ className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
				{ orderable: false, targets: [5, 6] },
				{ searchable: false, targets: [0] },   
				{ targets: [6], visible: false }
			],
			pageLength: 3,
			destroy: true,
			language: {
				lengthMenu: "Mostrar _MENU_ ",
				zeroRecords: "Ningún reporte encontrado",
				info: "",
				infoEmpty: "Ningún reporte encontrado",
				infoFiltered: "(filtrados desde _MAX_ registros totales)",
				search: "Buscar:",
				loadingRecords: "Cargando...",
				paginate: {
					first: "Primero",
					last: "Último",
					next: "Siguiente",
					previous: "Anterior"
				}
			},
			
		};
		
		const initDataTable = async () => {
			if (dataTableIsInitialized) {
				dataTable.destroy();
			}
		
			await listUsers();
		
			dataTable = $("#datatable_users").DataTable(dataTableOptions);
		
		 // Inicializar los botones después de que se haya creado el DataTable
		 new $.fn.dataTable.Buttons(dataTable, {
			buttons: [     
				{
					extend: 'excel',
					text: 'Exportar a Excel',
					filename: 'Reporte Productos',
					title:'Productos Bajo Stock',
					template:'blue_medium',
				},
				{
					extend: 'pdf',
						text: 'Exportar a Pdf',
					filename: 'Reporte Productos',
					title:'Productos Bajo Stock',
						// Otras opciones de exportación si es necesario
				},
			]
		});
		
		// Obtener los datos iniciales del DataTable
		var dataLabels = [];
		var dataValues = [];
		dataTable.rows().every(function () {
			dataLabels.push(this.data()[1]);
			dataValues.push(parseInt(this.data()[5]));
		});
		
		// Declarar tipograf fuera de los listeners de eventos
		var tipograf = "bar"; // Tipo de gráfico predeterminado
		
		document.getElementById("barra").addEventListener("click", function() {
			tipograf = "bar"; // Actualizar el tipo de gráfico al hacer clic en "barra"
			updateChart(); // Llamar a una función para actualizar el gráfico
		});
		
		document.getElementById("circular").addEventListener("click", function() {
			tipograf = "doughnut"; // Actualizar el tipo de gráfico al hacer clic en "circular"
			updateChart(); // Llamar a una función para actualizar el gráfico
		});
		
		// Definir una función para actualizar el gráfico con el nuevo tipo
		function updateChart() {
			myChart.config.type = tipograf;
			myChart.update();
		}
		
		// Inicializar el Chart.js
		var ctx = document.getElementById('myChart').getContext('2d');
		var myChart = new Chart(ctx, {
			type: tipograf,
			data: {
				labels: dataLabels,
				datasets: [{
					label: 'Valor',
					data: dataValues,
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)',
						'rgba(255, 0, 0, 0.2)',
						'rgba(0, 255, 0, 0.2)',
						'rgba(0, 0, 255, 0.2)',
						'rgba(255, 255, 0, 0.2)',
						'rgba(0, 255, 255, 0.2)',
						'rgba(255, 0, 255, 0.2)',
						'rgba(128, 128, 128, 0.2)',
						'rgba(0, 0, 0, 0.2)',
						'rgba(255, 255, 255, 0.2)'
					],
					borderColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)',
						'rgba(255, 0, 0, 0.2)',
						'rgba(0, 255, 0, 0.2)',
						'rgba(0, 0, 255, 0.2)',
						'rgba(255, 255, 0, 0.2)',
						'rgba(0, 255, 255, 0.2)',
						'rgba(255, 0, 255, 0.2)',
						'rgba(128, 128, 128, 0.2)',
						'rgba(0, 0, 0, 0.2)',
						'rgba(255, 255, 255, 0.2)'
					],
					borderWidth: 1
				}]
			}
		});
		
		// Escuchar cambios en el campo de búsqueda y actualizar el gráfico
		$('#datatable_users_filter input[type="search"]').on('keyup', function () {
			var filteredData = dataTable.rows({ search: 'applied' }).data(); // Cambio aquí
			var filteredLabels = [];
			var filteredValues = [];
		
			filteredData.each(function (value, index) {
				filteredLabels.push(value[1]);
				filteredValues.push(parseInt(value[5]));
			});
		
			myChart.data.labels = filteredLabels;
			myChart.data.datasets[0].data = filteredValues; // Cambio aquí
			myChart.update();
		});
		// Agregar los botones al DataTable
		dataTable.buttons().container().appendTo($('#datatable_users_wrapper .col-md-6:eq(0)'));
		
		// Agregar los botones al contenedor correspondiente
		$('#buttonsContainer').html(dataTable.buttons().container());
		
		// Mover el lengthMenu al contenedor correspondiente
		$('#lengthMenuContainer').html($('#datatable_users_length'));
		
			dataTableIsInitialized = true;
		};
		
		const listUsers = async () => {
			try {
				const response = await fetch("http://localhost:8081/reportes/datosproducto");
				const datos = await response.json();
				let content = ``;
				datos.forEach((dato) =>
				{
					console.log(dato);
					if(dato.stock < 10)
					{
						content += `
						<tr>
							<td class="centered">${dato.productoId}</td>
							<td class="centered">${dato.nombre}</td>
							<td class="centered">${dato.codCategoria[0].descripcion}</td>
							<td class="centered">${dato.codMarca[0].descripcion}</td>
							<td class="centered">${dato.unidad[0].descripcion}</td>
							<td class="centered">${dato.stock}</td>
							<td class="centered">${dato.razonSocial}</td>
						</tr>`;
					}
				});
				tableBody_users.innerHTML = content;
			} catch (ex) {
				alert(ex);
			}
		};
		
		initDataTable();
		
//Recuperar el user de la pagina anterior
var usuarioText = localStorage.getItem("usuarioText");
document.getElementById("user").innerText = usuarioText;	  

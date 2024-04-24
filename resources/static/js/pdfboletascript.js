//Botones
function generarPDF(event) {
	event.preventDefault();
	const usuarioDiv = document.getElementById('user');

	html2canvas(usuarioDiv).then(canvas => {
		const imgData = canvas.toDataURL('image/png');
		const pdf = new jsPDF('portrait', 'cm', 'a5');
		const imgProps = pdf.getImageProperties(imgData);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
		
		pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
		pdf.save('documento.pdf');
	});
}

let ventaLink = document.getElementById("btn-regresar");
	ventaLink.addEventListener("click", function () {
        window.location.href = "/venta";
    });
    
//Relleno de datos
	const urlParams = new URLSearchParams(window.location.search);
	const ventaid = urlParams.get('ventaid');
	
	document.getElementById("id").value = ventaid;
	
	async function cargarDatosVenta(ventaid) 
	{
		try 
		{
			const response = await fetch(`http://localhost:8081/ventas/boleta/${ventaid}`);
			if (!response.ok) 
			{
		  		throw new Error(`HTTP error! Status: ${response.status}`);
			}
			
			const ventaDetalles = await response.json();
	
		    document.getElementById("fecha").value = ventaDetalles .fecha;
		    document.getElementById("hora").value = ventaDetalles.hora;
		    document.getElementById("nombre").value = ventaDetalles.dninombre;
		    document.getElementById("total").value = ventaDetalles.monto;
		    document.getElementById("tipopago").value = ventaDetalles.metodo;
		    document.getElementById("vuelto").value = ventaDetalles.vuelto;
		    document.getElementById("vendedor").value = ventaDetalles.empleadonombre;
		    
		    cargarDatosRegistroVenta(ventaid);
		}
		catch (error) 
		{
	    	console.error('Error durante la obtención de detalles de la venta:', error);
	  	}
	}
	
const cargarDatosRegistroVenta = async (ventaid) => 
{
	try 
    {
      	const response = await fetch(`http://localhost:8081/registroventa/boleta/${ventaid}`);
     	const datosVenta = await response.json();
    	console.log(datosVenta);
      	let content = ``;
      	datosVenta.forEach((item) => 
      	{
			console.log (item);
        	content += `
          	<tr>
            	<td class="cantidad">${item.cantidad}</td>
            	<td class="centered">${item.descripcion}</td>
            	<td class="centered">${item.precioUnitario}</td>
            	<td class="centered">${item.importe}</td>
          	</tr>`;
      	});

      	const tableBody_pdf = document.getElementById("tableBody_pdf");
      	tableBody_pdf.innerHTML = content;
    }
    catch (ex) 
    {
    	console.error(ex);
  	}
};

cargarDatosVenta(ventaid);
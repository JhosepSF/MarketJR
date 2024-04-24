let boton = document.getElementById("btnLogin");
boton.addEventListener("click", evento =>
{
    loguearse();
});

let loguearse = async () => {
    let login = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    };

    try 
    {
        const response = await fetch("http://localhost:8081/auth/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        else
        {
			try
			{
				const getEmpleadoDNI = await fetch(`http://localhost:8081/auth/user/${login.username}`);
                const empleadoDNI = await getEmpleadoDNI.json();
                const nombre = empleadoDNI.empleadoNombre;
    			if (empleadoDNI.observacion === 'Activo') 
    			{
                    const nombre = empleadoDNI.empleadoNombre;
                    redirectToMenuPrincipal(nombre);
                } 
                else 
                {
                    alert("Usuario Inactivo");
        			console.error('Error during login:', error);
                }
			}
			catch (error)
			{console.error('Error de nombre:', error);}
		}

        const data = await response.json();
        console.log(data.message);
    } 
    catch (error) 
    {
        alert("Credenciales incorrectas");
        console.error('Error during login:', error);
    }
};

function redirectToMenuPrincipal(username)
{
    window.location.href = `/menu?username=${encodeURIComponent(username)}`;
}

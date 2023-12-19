// En tu archivo de renderizado
async function obtenerYMostrarDatos() {
    try {
        const userData = await window.api.userData();
        const information = document.getElementById('info-home');
        information.innerText = `Bienvenido ${userData.nombre}`;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

obtenerYMostrarDatos();
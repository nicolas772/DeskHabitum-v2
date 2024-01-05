// En tu archivo de renderizado
document.addEventListener('DOMContentLoaded', async () => {
    const divGuardarBtn = document.getElementById("divGuardarBtn");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const guardarCambiosBtn = document.getElementById('guardarCambiosBtn');
    guardarCambiosBtn.addEventListener('click', async () => {
        divGuardarBtn.classList.add('d-none')
        loadingSpinner.classList.remove('d-none')
        setTimeout(async function () {
            await window.api.guardarCambiosSetting();
        }, 1500);

    });
});

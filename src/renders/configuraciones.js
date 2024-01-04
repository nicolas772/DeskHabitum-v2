// En tu archivo de renderizado
document.addEventListener('DOMContentLoaded', async () => {
    const guardarCambiosBtn = document.getElementById('guardarCambiosBtn');
    guardarCambiosBtn.addEventListener('click', async () => {
        await window.api.guardarCambiosSetting();
     });
});

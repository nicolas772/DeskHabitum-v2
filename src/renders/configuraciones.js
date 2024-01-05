// En tu archivo de renderizado
document.addEventListener('DOMContentLoaded', async () => {
    const guardarCambiosBtn = document.getElementById('guardarCambiosBtn');
    guardarCambiosBtn.addEventListener('click', async () => {
        setTimeout(async function () {
            await window.api.guardarCambiosSetting();
        }, 300);

    });
});

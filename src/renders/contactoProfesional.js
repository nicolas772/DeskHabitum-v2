// En tu archivo de renderizado
document.addEventListener('DOMContentLoaded', async () => {
    const divSubmitBtn = document.getElementById("divSubmitBtn");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const submitBtn = document.getElementById("submitBtn");
    

    submitBtn.addEventListener("click", async function () {
        divSubmitBtn.classList.add("oculto");
        loadingSpinner.classList.remove("d-none");
        setTimeout(async function () {
            await window.api.enviarCorreoProfesional();
        }, 1500);
        
    });
});

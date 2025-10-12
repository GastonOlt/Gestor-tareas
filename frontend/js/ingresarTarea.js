

const modal = document.getElementById("task-modal");
const openModalButton = document.getElementById("open-modal");
const closeModalButton = document.getElementById("close-modal");


export const nuevaTarea = () => {
    openModalButton.onclick = function() {
        modal.style.display = "block";
    }

    closeModalButton.onclick = function() {
        modal.style.display = "none";
    }
    const limpiarModal = () => {
        idTareaNombre.value = '';
        idtareaDescripcion.value = '';
        idFecha.value = '';
        idTareaCategoria.value = '';
    };
    
  /*   modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            limpiarModal();
            modal.style.display = "none";
        }
    });



    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    } */
}

  
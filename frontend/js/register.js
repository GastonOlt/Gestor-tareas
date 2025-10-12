import {deleteUsuario,getUsuarioId,patchUsuario,postUsuario} from '../apis/apiUsuario.js'

/* document.querySelector('.register-form').addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(e);
    console.log(e.target.nombre.value);
    console.log(e.target.email.value);
    console.log(e.target.password.value);
}) */

window.addEventListener('load',()=>{
    const Idnombre = document.querySelector("#Idnombre")
    const Idemail = document.querySelector('#Idemail')
    const Idpassword = document.querySelector('#Idpassword')
    const IdBtnRegister = document.querySelector('#IdBtnRegister')

    IdBtnRegister.addEventListener('click',async () => {
        const nuevoUsuario={
            usuarionombre: Idnombre.value,
            usuarioemail:Idemail.value,
            usuariocontra:Idpassword.value
        }
        const resp = await postUsuario(nuevoUsuario)
        console.log(resp)
        if(resp.result_estado === "ok"){
            Swal.fire({
                icon: 'success',
                title: '¡Bien hecho!',
                text: 'Registro Completado',
                timer : 2000
            }); 
              setTimeout(() => {
                    window.location.href = "../login.html";
                  }, 3000);   
              
        }
        else{
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: `Error ${resp.result_message}`,
                confirmButtonText: 'OK',
                timer : 2500
            });
           // alert(`Error ${resp.result_message}`)
        }
    })


})
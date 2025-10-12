
import {loginUsuario} from '../apis/apiUsuario.js'

window.addEventListener('load',()=>{
    const Idemail = document.querySelector('#Idemail')
    const Idpassword = document.querySelector('#Idpassword')
    const IdbtnLogin = document.querySelector('#IdbtnLogin')

    IdbtnLogin.addEventListener('click',async () => {
        const loginDatos ={
            usuarioemail:Idemail.value,
            usuariocontra:Idpassword.value
        }
        const resp = await loginUsuario(loginDatos)
        console.log(resp);
        if(resp.result_estado === 'ok'){
            Swal.fire({
                icon: 'success',
                title: '¡Bien hecho!',
                text: 'Inicio Sesion correcto',
                timer : 2000
            }); 

              setTimeout(() => {
                    window.location.href = "../index.html";
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
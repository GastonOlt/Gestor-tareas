

import { nuevaTarea } from "./ingresarTarea.js";
import {deleteTarea,getTarea,getTareaTitulo,patchTarea,postTarea,getTareaCategoria} from '../apis/apiTarea.js';

const cuerpoTareas = document.querySelector("#cuerpo-tareas");   
const modal = document.getElementById("task-modal");


 const IdTitulo = document.querySelector("#IdTitulo")
// para buscar con getTareaTitulo
    const txtBuscarPorTitulo = document.querySelector("#txtBuscarPorTitulo")
    const btnBuscarPorTitulo = document.querySelector("#btnBuscarPorTitulo")

//post taree
const btnAgregarTarea = document.querySelector("#btnAgregarTarea")
const idTareaNombre = document.querySelector("#idTareaNombre")
const idtareaDescripcion = document.querySelector("#idtareaDescripcion")
const idFecha = document.querySelector("#idFecha")
const idTareaCategoria = document.querySelector("#idTareaCategoria")
const btnCerrarSesion = document.querySelector('#btnCerrarSesion')
const idTareaCategoriaBuscar = document.querySelector('#idTareaCategoriaBuscar')

const btnBuscarPorCategoria = document.querySelector('#btnBuscarPorCategoria')
 

const fnTareaActivada = (objtarea)=>{
    estadoTarea.activarTarea(objtarea)

    estadoTarea.tareaid = objtarea.tareaid;

    idTareaNombre.value = objtarea.tareatitulo;
    idtareaDescripcion.value = objtarea.tareadescripcion;
    idFecha.value = objtarea.tareavencimiento;
    idTareaCategoria.value = objtarea.categoriaid;
    console.log('la id desde el obj estado tarea ',estadoTarea.tareaid);
}


//claro lo que hace es asignar los valores a la tarea activada , y cuando se presiona el btn se pasa la tarea activa que tendria 
// toda la nueva info gracias a la asignacion tareaactica = input.value
//con activartarea se pasa el objeto de tarea del back , y lo asigno a tareaActivada esta tendria todas las propiedades del objeto tarea
// que se paso por el parametro , 
// abajo es para acceder a las propiedades de la tarea acticada osea el objeto que se selecciono 
 const fnRecuperTarea = ()=>{
    estadoTarea.tareaActivada.tareatitulo = idTareaNombre.value;
    estadoTarea.tareaActivada.tareadescripcion = idtareaDescripcion.value;
    estadoTarea.tareaActivada.tareavencimiento = idFecha.value ? idFecha.value : null;
    estadoTarea.tareaActivada.categoriaid = idTareaCategoria.value ? parseInt(idTareaCategoria.value) : null;

    console.log( idFecha.value,' COMO SE VE LA FECHA SIN SELECCIONARRRR '); 
    console.log(estadoTarea.tareaActivada.tareatitulo , 'tarea titulo desde el fnrecuperar');
    console.log(estadoTarea.tareaActivada.tareadescripcion , 'tarea descripcion desde el fnrecuperar');
} 

const estadoTarea ={
    tareaActivada:null,
    tareaid:null,
    activarTarea(tarea){
        this.tareaActivada = tarea
    }
}

const cambiarcolor = () => {
    const estados = document.querySelectorAll("#idEstado");
    const titulos = document.querySelectorAll(".tareaTitulo");

    estados.forEach((estado, index) => {
        if (estado.textContent === "Completada") {
            titulos[index].style.color = "#52be80";
        }
    });
}

function fnMostrarTareas(tareas) {
     cuerpoTareas.innerHTML = '';  
     
     tareas.forEach(element => {
         //console.log(element);
         let div = document.createElement("div");
         div.className = "tarea";
 
         let h3 = document.createElement("h3");
         h3.textContent = element.tareatitulo;
         h3.className = "tareaTitulo";
 
         let divDetalle = document.createElement("div");
         divDetalle.className = "tareaDetalle";

         let pDesc = document.createElement('p');
         pDesc.textContent = `Descripion:  ${element.tareadescripcion}`;
        
         let h3Fecha = document.createElement('h3');
    /*      let fechaOriginal = new Date(element.tareavencimiento);
         let fechaformateada = fechaOriginal.toLocaleDateString();  */
         h3Fecha.textContent = `tarea Vencimiento: ${element.tareavencimiento || 'sin vencimiento'}`;
         
         let h3Usuario = document.createElement('h3');
         h3Usuario.textContent = element.usuarionombre;

         let h3Estado = document.createElement('h3');
         h3Estado.textContent = element.estadoactual;
         h3Estado.id ='idEstado'
         //console.log("estado id en funcionMostra " ,h3Estado);
 
 
         let h3Categoria = document.createElement('h3');
         h3Categoria.textContent = element.categorianombre;
         
        
         let btnComplet = document.createElement('input');
         btnComplet.type = 'button';
         btnComplet.value = 'Completado';
         btnComplet.className = 'btnComplet';
         btnComplet.addEventListener('click', async () => {
            console.log(`estado actau ${element.estadoactual} tarea id del btn comp ${element.tareaid} abajo el elemento`);
            console.log(element);
            let tareaComplet ={
                   tareaid : element.tareaid,
                   estadoid : 2,
            }

             let resp = await patchTarea(tareaComplet)

             if(resp.result_estado === 'ok'){
                 
                 console.log(`estado actual dentro del ok ${element.estadoactual}`);
                 console.log('dentro del ok');
                 console.log(element);
                 getMostrarTarea();
                 
             }
             else{
                 console.log(`error ${resp.result_message}`);
             }
         });
 
         let btnEliminar = document.createElement('input');
         btnEliminar.type = 'button';
         btnEliminar.value = 'Eliminar';
         btnEliminar.className = 'btnDelete';
         btnEliminar.addEventListener('click',async () => {
             console.log(element.tareaid);
             console.log('ANTES DE');
             const result = await Swal.fire({
                 icon: 'question',
                 title: '¿Estás seguro?',
                 text: '¿Deseas eliminar esta tarea?',
                 showCancelButton: true,
                 confirmButtonText: 'Sí, eliminar',
                 cancelButtonText: 'Cancelar'
             });
             if(result.isConfirmed){
                 console.log('DESPUES DE CONFIRMA');
                 let res = await deleteTarea(element.tareaid)
                 if(res.result_estado === 'ok'){
                     Swal.fire({
                         icon: 'success',
                         title: '¡Eliminada!',
                         text: `Se elimino =  ${element.tareatitulo}`,
                         confirmButtonText: 'OK',
                         timer : 3000
                     })
                     console.log('se elimino');
                     console.log(element);
                     getMostrarTarea()
                 }
                 else{
                    console.log(`Error ${res.result_message}`);
                   }
              } 
         })
         
 
         let btnEditar = document.createElement('input');
         btnEditar.type = 'button';
         btnEditar.value = 'Editar';
         btnEditar.className = 'btnEdit';
         btnEditar.addEventListener('click', () => {
           // getMostrarTarea();
           fnTareaActivada(element)
           modal.style.display = "block";
       
         });
 
         div.appendChild(h3);
         divDetalle.appendChild(pDesc);
         divDetalle.appendChild(h3Fecha);
         divDetalle.appendChild(h3Estado);
         divDetalle.appendChild(h3Categoria);
         divDetalle.appendChild(h3Usuario);
         divDetalle.appendChild(btnComplet);
         divDetalle.appendChild(btnEditar);
         divDetalle.appendChild(btnEliminar);
 
         div.appendChild(divDetalle);
         cuerpoTareas.appendChild(div);
     });
      cambiarcolor();
 };


 const getMostrarTarea = async () => {
        
    const resp = await getTarea()
     //console.log(resp)

    if(resp.result_estado === 'ok'){
        cuerpoTareas.innerHTML = ''
        fnMostrarTareas(resp.result_data)
      }
       else{
             alert(`${resp.result_message}`)
        }
};


window.addEventListener('load',()=>{
    

    btnBuscarPorCategoria.addEventListener('click',async () => {
        if(idTareaCategoriaBuscar.value !== ''){
            const resp = await getTareaCategoria(parseInt(idTareaCategoriaBuscar.value))
            console.log('id de categoria ',parseInt(idTareaCategoriaBuscar.value));
            if(resp.result_estado === 'ok'){
                fnMostrarTareas(resp.result_data)
            }
            else{
                alert(`Error ${resp.result_message}`)
           }
        }else{
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'seleccione una cateforia',
                confirmButtonText: 'OK',
                timer : 2500
            });
        }
        
    
    })
    
 
    const nombre = async() =>{
        const rep = await getTarea()
        if(rep.result_estado ==='ok'){
            IdTitulo.textContent =`Gestor de Tareas Bienvenido ${rep.result_data[0].usuarionombre}` 
        }
    } 


    btnCerrarSesion.addEventListener('click',async()=>{
          const result = await Swal.fire({
            icon: 'question',
            title: '¿Estás seguro?',
            text: '¿Deseas Cerrar sesion?',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
        if(result.isConfirmed){
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            
          
            Swal.fire({
                icon: 'success',
                title: '¡Bien hecho!',
                text: 'Inicio Sesion correcto',
                timer : 2000
            }); 
            setTimeout(() => {
                window.location.href = "../index.html";
              }, 2000);   
 
        }
    })
       
    btnBuscarPorTitulo.addEventListener("click",async () => {
        
        const titulo = txtBuscarPorTitulo.value;
        if(titulo.length > 0){
            
            const resp = await getTareaTitulo(titulo)
           console.log(resp);
            if(resp.result_estado === 'ok'){
                cuerpoTareas.innerHTML = ''
                fnMostrarTareas(resp.result_data)
               // getMostrarTarea()
           }
            else{
              alert(`Error ${resp.result_message}`)
             }
     }
      else{
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Ingrese un texto',
            confirmButtonText: 'OK',
            timer : 2500
        });
        }
    });


        /// PATCH  POST 
       btnAgregarTarea.addEventListener('click',async()=>{
        //////////////////// PATCH DE TAREA
        if(estadoTarea.tareaid >0){
             fnRecuperTarea()
            const resp = await patchTarea(estadoTarea.tareaActivada)
            if(resp.result_estado === 'ok'){

                getMostrarTarea()

                Swal.fire({
                    icon: 'success',
                    title: '¡Bien hecho!',
                    text: 'Tarea EDITADA exitosamente',
                    timer : 2000
                });

                estadoTarea.tareaid = null;

                idTareaNombre.value = '';
                idtareaDescripcion.value = '';
                idFecha.value = '';
                idTareaCategoria.value = '';

                console.log(`desde el patch resp = ${resp.result_message} , ahora los datos 
                    ${resp.result_data}`);

              
                modal.style.display = "none";

            }
            else{
                console.log(`error ${resp.result_message}`);
            }
        }////////////////// POST DE TAREA
        else{ 
        console.log(idTareaNombre.value);

         let nuevaTarea={
            tareadescripcion: idtareaDescripcion.value,
            tareatitulo : idTareaNombre.value,
            tareavencimiento:idFecha.value || null ,
            categoriaid:idTareaCategoria.value || null,
            estadoid:1,
         }
         if(idTareaNombre.value !== ""){ 

         const resp = await postTarea(nuevaTarea)

         if(resp.result_estado ==='ok'){
            
            console.log(resp.result_data[0]);

            getMostrarTarea()
            Swal.fire({
                icon: 'success',
                title: '¡Bien hecho!',
                text: 'Tarea Guaradad exitosamente',
                timer : 2000
            });

            idTareaNombre.value = '';
            idtareaDescripcion.value = '';
            idFecha.value = '';
            idTareaCategoria.value = '';
            modal.style.display = "none";
            
            console.log(`desde el POST resp = ${resp.result_message} , ahora los datos 
                ${resp.result_data}`);
         }
         else{
            alert(`Error ${resp.result_message}`)
         }
        }
        else{
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Ingrese un texto',
                confirmButtonText: 'OK',
                timer : 2000
            });
        }
     
     }

    });

    getMostrarTarea();
    nombre();
    nuevaTarea();
})
   
    

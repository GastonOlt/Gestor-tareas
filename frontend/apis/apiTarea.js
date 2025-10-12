const enPoint = 'http://localhost:3000/tarea/'
const enPointTareaTitulo ='http://localhost:3000/tarea/portitulo/'
const enPointTareaCategoria='http://localhost:3000/tarea/porcategoria/'

export const getTarea = async () => {
    try{
        const resp = await fetch(enPoint)
        const dato = await resp.json()
        
        return dato
    }
    catch(error){
        console.log('error de get Tarea api ',error);
        return {result_estado: 'error', result_message: error.message };
    }
}

//encodeURIComponent para que los caractares especiales no causen errores , 
// por ej & etc

//const url = `/producto/porprecio?preciodesde=${encodeURIComponent(preciodesde)}&preciohasta=${encodeURIComponent(preciohasta)}`;

export const getTareaTitulo = async (tareatitulo) => {
    try{                                                                            
        const resp = await fetch(`${enPointTareaTitulo}?tareatitulo=${encodeURIComponent(tareatitulo)}`)
        const dato = await resp.json()
        return dato

    }
    catch(error){
        console.log('error de get Tarea por Titulo api ',error);
        return { result_estado: 'error', result_message: error.message};
    }
} 
export const getTareaCategoria = async (tareaCategoria) => {
    try{                                                                            
        const resp = await fetch(`${enPointTareaCategoria}?categorianombre=${encodeURIComponent(tareaCategoria)}`)
        const dato = await resp.json()
        return dato

    }
    catch(error){
        console.log('error de get Tarea por Titulo api ',error);
        return { result_estado: 'error', result_message: error.message};
    }
} 

export const postTarea = async (tarea) => {
    try {
        const resp = await fetch(enPoint,{
            method:'POST',
            headers:{
                'content-Type':'application/json'
               
            },
           // credentials: 'same-origin',
            body: JSON.stringify(tarea)
        })

        const dato = await resp.json()
        return dato
        
    }
    catch(error){
        console.log('error de get Tarea por Titulo api ',error);
        return { result_estado: 'error', result_message: error.message };
    }
}

export const patchTarea = async (tarea) => {
    try {
        const resp = await fetch(enPoint+tarea.tareaid,{
            method:'PATCH',
            headers:{
                'content-Type':'application/json'
            },
            body: JSON.stringify(tarea)
        })

        const dato = await resp.json()
        return dato
    }
    catch(error){
        console.log('error de get Tarea por Titulo api ',error);
        return { result_estado: 'error', result_message: error.message };
    }
}

export const deleteTarea = async (tareaid) => {
    try {
        const resp = await fetch(enPoint+tareaid,{
            method:'DELETE',
        })
        const dato = await resp.json()
        return dato
    }
    catch(error){
        console.log('error de get Tarea por Titulo api ',error);
        return { result_estado: 'error', result_message: error.message };
    }
}
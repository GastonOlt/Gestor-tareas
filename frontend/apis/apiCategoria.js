const endPoint = 'http://localhost:3000/categoria/'


export const getCategoria = async () => {
    try{
        const resp = await fetch(endPoint)
        const dato = await resp.json()

      
        return dato
    }
    catch(error){
        console.log('error de get categoria api ',error);
        return { result_estado: 'error', result_message: error.message };
    }
}


export const postCategoria = async (categoria) => {
    try {
        const resp = await fetch(endPoint,{
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body: JSON.stringify(categoria)
        })

        const dato = await resp.json()
        return dato
        
    }
    catch(error){
        console.log('error de get categoria por Titulo api ',error);
        return { result_estado: 'error', result_message: error.message };
    }
}

export const patchCategoria = async (categoria) => {
    try {
        const resp = await fetch(endPoint+categoria.categoriaid,{
            method:'PATCH',
            headers:{
                'content-Type':'application/json'
            },
            body: JSON.stringify(categoria)
        })

        const dato = await resp.json()
        return dato
    }
    catch(error){
        console.log('error de get categoria por Titulo api ',error);
        return { result_estado: 'error', result_message: error.message };
    }
}

export const deleteCategoria = async (categoriaid) => {
    try {
        const resp = await fetch(endPoint+categoriaid,{
            method:'DELETE',
        })
        const dato = await resp.json()
        return dato
    }
    catch(error){
        console.log('error de get categoria por Titulo api ',error);
        return { result_estado: 'error', result_message: error.message };
    }
}

const endPoint = 'http://localhost:3000/usuario/'
const endPointLogin = 'http://localhost:3000/usuario/login'


export const getUsuarioId= async (usuarioid) => {
    try {
        const resp = await fetch(endPoint+usuarioid)
        const dato = resp.json()

        return dato
    } catch (error) {
        console.log(error);
        return {result_estado :'error en get usuarioID api', error_message:error.erro_message}
    }
}

export const postUsuario = async (usuario) => {
    try {
        const resp = await fetch(endPoint,{
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body: JSON.stringify(usuario)
        })
        const dato = await resp.json()

        return dato
        
    } catch (error) {
        console.log(error);
        return {result_estado :'error en get usuarioID api', error_message:error.erro_message}
    }
}
export const loginUsuario = async (usuario) => {
    try {
        const resp = await fetch(endPointLogin,{
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body: JSON.stringify(usuario)
        })
        const dato = await resp.json()

        return dato
        
    } catch (error) {
        console.log(error);
        return {result_estado :'error en get usuarioID api', error_message:error.erro_message}
    }
}


export const patchUsuario = async (usuario) => {
    try {
        const resp = await fetch(endPoint+usuario.usuarioid,{
            method:'PATCH',
            headers:{
                'content-Type':'application/json'
            },
            body: JSON.stringify(usuario)
        })
        const dato = await resp.json()
        return dato
        
    } catch (error) {
        console.log(error);
        return {result_estado :'error en get usuarioID api', error_message:error.erro_message}
    }
}

export const deleteUsuario = async (usuarioid) => {
    try {
        const resp = await fetch(endPoint+usuarioid,{
            method:'DELETE'
        })
        const dato = await resp.json()
        return dato

    } catch (error) {
        console.log(error);
        return {result_estado :'error en get usuarioID api', error_message:error.erro_message}
    }
}
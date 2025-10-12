const enPoint = 'http://localhost:3000/estado/'

export const getEstado = async (estadoid) => {
    try{
        const resp = await fetch(enPoint+estadoid)
        const dato = await resp.json()
        return dato
    }
    catch(error){
        console.log('error de get Tarea api ',error);
        return { result_estado: 'error', result_message: error.message };
    }
}
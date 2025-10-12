import {getTarea,patchTarea,postTarea,getTareaTitulo,deleteTarea} from './apiTarea.js'
import {deleteCategoria,patchCategoria,getCategoria,postCategoria} from './apiCategoria.js'
import { getEstado } from './apiEstado.js';
import { getUsuarioId,deleteUsuario,patchUsuario,postUsuario } from './apiUsuario.js';
const obje = {
    usuarioid :9,
    usuarionombre: 'usuarionombreAp222',
    usuarioemail: 'grhwhr@gmail.com',
    usuariocontra: 'contra123'
}

const patch = async () => {
    try {
        
        const resultado = await deleteUsuario(2); 
        console.log('-----------------------------------------');
        console.log('Respuesta del servidor :', resultado); 
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
    }
};

patch();
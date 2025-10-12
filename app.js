import express from 'express';
import cookieParser from 'cookie-parser';
import {tareaRouter} from './routes/tareaRoutes.js'
import { categoriaRouter } from './routes/categoriaRoutes.js';
import { estadoRouter } from './routes/estadoRouters.js';
import { usuarioRouter } from './routes/usuarioRouters.js';

import { fileURLToPath } from 'url';// Importa la función que convierte la URL del módulo en una ruta de archivo.
import { dirname, join } from 'path';


const port = 3000
const app = express()

app.use(cookieParser())
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(express.text());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(join(__dirname, 'frontend')));
app.use(express.static("frontend"));




app.get('/',(req,res)=>{
    res.sendFile(join(__dirname, 'frontend', 'index.html'));
})

app.use('/tarea',tareaRouter)
app.use('/categoria',categoriaRouter)
app.use('/estado',estadoRouter)
app.use('/usuario',usuarioRouter)


app.listen(port, ()=>{
    console.log(`Servidor en http://localhost:${port}`);
})
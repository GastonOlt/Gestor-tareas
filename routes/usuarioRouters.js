import { Router } from "express";
import { pool } from "../connection/conexionPostgres.js";
import bcrypt from 'bcrypt'
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

let Salida={}

export const usuarioRouter = Router();

usuarioRouter.get('/',async (req,res) => {
    try{
        const querySql = `
             select * from usuario
        `;

        const respuestaSql = await pool.query(querySql)

        Salida = {
            result_estado: "ok",
            result_message: "usuario recuperados",
            result_rows: respuestaSql.rowCount,
            result_verbo: "get",
            result_proceso: "/usuario",
            result_data: respuestaSql.rows,
          }
      
    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "get",
            result_proceso: "/usuario",
            result_data: "",
          }
    }
    res.json(Salida)
});


usuarioRouter.get('/:usuarioid',async (req,res) => {
    try{
        const {usuarioid}=req.params
        const querySql = `
             select * from usuario
             where usuarioid = $1
        `;

        const respuestaSql = await pool.query(querySql,[usuarioid])

        Salida = {
            result_estado: "ok",
            result_message: "usuario recuperados por id",
            result_rows: respuestaSql.rowCount,
            result_verbo: "get",
            result_proceso: "/usuario/:usuarioid",
            result_data: respuestaSql.rows[0],
          }
      
    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "get",
            result_proceso: "/usuario/:usuarioid",
            result_data: "",
          }
    }
    res.json(Salida)
});


const verificarEmail = async (req,res) => {
    
}
usuarioRouter.post('/',async (req,res) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;// expresion regular 

    try{
        const{usuarionombre,usuarioemail,usuariocontra} = req.body;

        const contraHashed = await bcrypt.hash(usuariocontra,5)


        //  email
        if(!emailRegex.test(usuarioemail)){
            return res.json(Salida ={
                result_estado: "error",
                result_message: "Email No valido",
                result_verbo: "post",
                result_proceso: "/usuario/",
            })
        }

        const querySql = `
                select * from usuario 
                where usuarioemail = $1
        `;

        const respuestaSql = await pool.query(querySql,[usuarioemail])

        if(respuestaSql.rowCount > 0){
            return res.json(Salida ={
                result_estado: "error",
                result_message: "El Email ya esta registrado",
                result_verbo: "post",
                result_proceso: "/usuario/",
            })
        }
        ////



        const querySql2 = `
            insert into usuario (usuarionombre,usuarioemail,usuariocontra)
                    values($1,$2,$3) returning *
        `;
        const respuestaSql2 = await pool.query(querySql2,[usuarionombre,usuarioemail,contraHashed])

        Salida = {
            result_estado: "ok",
            result_message: "usuario registrado",
            result_rows: respuestaSql2.rowCount,
            result_verbo: "post",
            result_proceso: "/usuario",
            result_data: respuestaSql2.rows[0],
          }

    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "post",
            result_proceso: "/usuario/",
            result_data: "",
          }
    }
    res.json(Salida)
});

usuarioRouter.post('/login',async(req,res)=>{
    try {
        
        const{usuarioemail , usuariocontra}=req.body

        const querySql = `
            select * from usuario 
            where usuarioemail = $1
        `;
        const respuestaSql = await pool.query(querySql,[usuarioemail])

        if(respuestaSql.rowCount === 0){
            return res.json({
                result_estado: "error",
                result_message: "Error al iniciar sesion verifique email o contraseña",
                result_verbo: "post",
                result_proceso: "/usuario/login",
            });
        }
        const contraBd = respuestaSql.rows[0].usuariocontra;

        const verificarContra = await bcrypt.compare(usuariocontra,contraBd)
        
        if(!verificarContra){
            return res.json({
                result_estado: "error",
                result_message: "Error al iniciar sesion verifique email o contraseña",
                result_verbo: "post",
                result_proceso: "/usuario/login",
            });
        }

        const token = jsonwebtoken.sign({usuario:respuestaSql.rows[0].usuarioid}, process.env.JWT_SECRET , { expiresIn: '3d' })
        const cookiOption={
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path :"/"
        }
        res.cookie("jwt",token,cookiOption)

       

        Salida = {
            result_estado: "ok",
            result_message: "Login completado",
            result_rows: respuestaSql.rowCount,
            result_verbo: "post",       
            result_proceso: "/usuario/login",
            result_data: respuestaSql.rows[0],
            resultadoUsuarioId : respuestaSql.rows[0].usuarioid,
          }

    } catch (error) {
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "post",
            result_proceso: "/usuario/login",
            result_data: "",
          } 
    }
    res.json(Salida)
})


usuarioRouter.patch('/:usuarioid', async (req,res) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try{
        const{usuarioid} = req.params
        const{usuarionombre,usuarioemail,usuariocontra} = req.body

        const contraHashed = await bcrypt.hash(usuariocontra,10)


          //  email
          if(!emailRegex.test(usuarioemail)){
            return res.json(Salida ={
                result_estado: "error",
                result_message: "Email No valido",
                result_verbo: "patch",
                result_proceso: "/usuario/:usuarioid",
            })
        }

        const querySql = `
                select * from usuario 
                where usuarioemail = $1
        `;

        const respuestaSql = await pool.query(querySql,[usuarioemail])

        if(respuestaSql.rowCount > 0){
            return res.json(Salida ={
                result_estado: "error",
                result_message: "El Email ya esta registrado",
                result_verbo: "patch",
                result_proceso: "/usuario/:usuarioid",
            })
        }
        ////

        const querySql2 = `
                update usuario
                set
                usuarionombre = COALESCE($2,usuarionombre),
                usuarioemail = COALESCE($3, usuarioemail),
                usuariocontra = COALESCE($4,usuariocontra)
                where usuarioid = $1 
                returning *
        `;

        const respuestaSql2 = await pool.query(querySql2,[usuarioid,usuarionombre,usuarioemail,contraHashed])

        
        Salida = {
            result_estado: "ok",
            result_message: "usuario actualizado",
            result_rows: respuestaSql2.rowCount,
            result_verbo: "patch",
            result_proceso: "/usuario/:usuarioid",
            result_data: respuestaSql2.rows[0],
          }
    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "patch",
            result_proceso: "/usuario/:usuarioid",
            result_data: "",
          }
    }
    res.json(Salida)
})


usuarioRouter.delete('/:usuarioid',async (req,res) => {
    try{
        const{usuarioid} = req.params

        const querySql = `
            delete from usuario 
            where usuarioid = $1 returning * 
        `;

        const respuestaSql = await pool.query(querySql,[usuarioid])

        Salida = {
            result_estado: "ok",
            result_message: "usuario eliminado",
            result_rows: respuestaSql.rowCount,
            result_verbo: "delete",
            result_proceso: "/usuario/:usuarioid",
            result_data: respuestaSql.rows[0],
          }
    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "delete",
            result_proceso: "/usuario/:usuarioid",
            result_data: "",
          }
    }
    res.json(Salida)
})
import { Router } from "express";
import { pool } from "../connection/conexionPostgres.js";
import {usuarioVerificado}  from '../middlewares/middleTarea.js'
let Salida = {};

export const tareaRouter = Router();

tareaRouter.use(usuarioVerificado)

tareaRouter.get("/", async (req, res) => {
  try {
    const usuarioid  = req.usuarioid 
    console.log(`usuario id en getTarea desde el endpoint ${usuarioid}`);
    const querySql = `
            select tareaid,tareatitulo, tareadescripcion, tareavencimiento,usuarionombre,categorianombre,
		            categoriadescripcion , estadoactual , c.categoriaid
            from tarea t
            left join categoria c
            on t.categoriaid = c.categoriaid
            left join estado e
            on t.estadoid = e.estadoid  
            left join usuario u
            on t.usuarioid = u.usuarioid
            where t.usuarioid = $1
              order by tareaid desc
              
        `;
    const respuestaSql = await pool.query(querySql,[usuarioid]);

    Salida = {
      result_estado: "ok",
      result_message: "tareas recuperadas",
      result_rows: respuestaSql.rowCount,
      result_verbo: "get",
      result_proceso: "/tarea",
      result_data: respuestaSql.rows,
    }

  } catch (error) {
    Salida = {
      result_estado: "error",
      result_message: error.message,
      result_rows: 0,
      result_verbo: "get",
      result_proceso: "/tarea",
      result_data: "",
    }
  }
  res.json(Salida);
});

tareaRouter.get('/portitulo',async(req,res)=>{
    try{
        const usuarioid = req.usuarioid
        const {tareatitulo} = req.query
        const querySql =`
        select tareatitulo , tareadescripcion,tareavencimiento,estadoactual
        from tarea t
        inner join estado e
        on t.estadoid = e.estadoid
        inner join usuario u 
        on t.usuarioid = u.usuarioid
        where  t.tareatitulo Ilike $1 AND t.usuarioid = $2
        `;
        const respuestaSql = await pool.query(querySql,[`%${tareatitulo}%`,usuarioid])

        Salida = {
            result_estado: "ok",
            result_message: "tareas recuperadas",
            result_rows: respuestaSql.rowCount,
            result_verbo: "get",
            result_proceso: "/tarea/portitulo",
            result_data: respuestaSql.rows,
          }
    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "get",
            result_proceso: "/tarea/portitulo",
            result_data: "",
          }
    }
    res.json(Salida)
});

tareaRouter.get('/porcategoria',async(req,res)=>{
    try{
        const usuarioid = req.usuarioid
        const {categorianombre} = req.query
        const querySql =`
            select categorianombre,tareatitulo , tareavencimiento,estadoactual
            from tarea t
            inner join categoria c
            on t.categoriaid = c.categoriaid
            inner join estado e
            on t.estadoid = e.estadoid  
            inner join usuario us
            on t.usuarioid = us.usuarioid
            where c.categoriaid = $1 and t.usuarioid = $2
        `;
        const respuestaSql = await pool.query(querySql,[categorianombre,usuarioid])

        Salida = {
            result_estado: "ok",
            result_message: "tareas recuperadas",
            result_rows: respuestaSql.rowCount,
            result_verbo: "get",
            result_proceso: "/tarea/porcategoria",
            result_data: respuestaSql.rows,
          }
    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "get",
            result_proceso: "/tarea/porcategoria",
            result_data: "",
          }
    }
    res.json(Salida)
});

tareaRouter.post('/', async (req,res) => {
    try{
        const usuarioid = req.usuarioid
        const {tareadescripcion,tareavencimiento,categoriaid,estadoid,tareatitulo}= req.body
        const querySql =`
            insert into tarea(tareatitulo,tareadescripcion,tareavencimiento,usuarioid,categoriaid,estadoid)
            values ($1,$2,$3,$4,$5,$6) returning *
        `;
        const respuestaSql = await pool.query(querySql,[tareatitulo,tareadescripcion,tareavencimiento,usuarioid,categoriaid,estadoid])
        Salida = {
            result_estado: "ok",
            result_message: "tareas agregada",
            result_rows: respuestaSql.rowCount,
            result_verbo: "post",
            result_proceso: "/tarea",
            result_data: respuestaSql.rows,
          }
    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "post",
            result_proceso: "/tarea",
            result_data: "",
          }
    }
    res.json(Salida)
});

tareaRouter.patch('/:tareaid', async (req,res) => {
    try{
        const usuarioid = req.usuarioid
        const {tareaid} = req.params
        const {tareatitulo,tareadescripcion,tareavencimiento,categoriaid,estadoid} = req.body
        const querySql=`
                    update tarea 
                      set 
                        tareatitulo = COALESCE($2, tareatitulo),
                        tareadescripcion = COALESCE($3, tareadescripcion),
                        tareavencimiento = COALESCE($4, tareavencimiento),
                        usuarioid = COALESCE($5, usuarioid),
                        categoriaid =  COALESCE($6,categoriaid),
                        estadoid =  COALESCE($7,estadoid)
                          where tareaid = $1
                            returning * 
        `; 
        const respuestaSql = await pool.query(querySql,[tareaid,tareatitulo,tareadescripcion,tareavencimiento,usuarioid,categoriaid,estadoid])

        Salida = {
            result_estado: "ok",
            result_message: "tareas actualizada",
            result_rows: respuestaSql.rowCount,
            result_verbo: "patch",
            result_proceso: "/tarea/:tareaid",
            result_data: respuestaSql.rows[0],
          }

    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "patch",
            result_proceso: "/tarea/:tareaid",
            result_data: "",
          }
    }
    res.json(Salida)
});

tareaRouter.delete('/:tareaid', async (req,res) => {
    try{
        const {tareaid} = req.params
        const querySql =`
            delete from tarea
                where tareaid = $1 returning*
        `;
        const respuestaSql = await pool.query(querySql,[tareaid])

        Salida = {
            result_estado: "ok",
            result_message: "tarea eliminda",
            result_rows: respuestaSql.rowCount,
            result_verbo: "delete",
            result_proceso: "/tarea/:tareaid",
            result_data: respuestaSql.rows[0],
          }

    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "delete",
            result_proceso: "/tarea/:tareaid",
            result_data: "",
          }
    }
    res.json(Salida)
})
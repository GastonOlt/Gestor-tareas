import { Router } from "express";
import { pool } from "../connection/conexionPostgres.js";
let Salida = {};

export const categoriaRouter = Router();

categoriaRouter.get('/',async (req,res) => {
    try{
        const querySql = `
             select * from categoria
        `;

        const respuestaSql = await pool.query(querySql)

        Salida = {
            result_estado: "ok",
            result_message: "categorias recuperadas",
            result_rows: respuestaSql.rowCount,
            result_verbo: "get",
            result_proceso: "/categoria",
            result_data: respuestaSql.rows,
          }
      
    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "get",
            result_proceso: "/categoria",
            result_data: "",
          }
    }
    res.json(Salida)
});

categoriaRouter.get('/pornombre',async (req,res) => {
    try{
        const{categorianombre} = req.query
        const querySql =`
            select * from categoria
            where categorianombre Ilike $1
        `;
        const respuestaSql = await pool.query(querySql,[`%${categorianombre}%`])

        Salida = {
            result_estado: "ok",
            result_message: "categorias recuperadas por nombre",
            result_rows: respuestaSql.rowCount,
            result_verbo: "get",
            result_proceso: "/categoria/pornombre",
            result_data: respuestaSql.rows,
          }
        
    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "get",
            result_proceso: "/categoria/pornombre",
            result_data: "",
          }
    }
    res.json(Salida)
});

categoriaRouter.post('/',async (req,res) => {
    try{
        const {categorianombre,categoriadescripcion} = req.body
        const querySql =`
            insert into categoria (categorianombre,categoriadescripcion) 
                    values($1,$2) returning *
        `;

        const respuestaSql = await pool.query(querySql,[categorianombre,categoriadescripcion])

        Salida = {
            result_estado: "ok",
            result_message: "categorias agregada",
            result_rows: respuestaSql.rowCount,
            result_verbo: "post",
            result_proceso: "/categoria",
            result_data: respuestaSql.rows[0],
          }
    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "post",
            result_proceso: "/categoria",
            result_data: "",
          }
    }
    res.json(Salida)
});

categoriaRouter.patch('/:categoriaid',async (req,res) => {
    try{
        const {categoriaid} = req.params
        const {categorianombre,categoriadescripcion} = req.body
        
        const querySql =`
            update categoria
            set 
                categorianombre = COALESCE($2,categorianombre),
                categoriadescripcion = COALESCE($3,categoriadescripcion)
                 where categoriaid = $1 
                  returning *
        `;

        const respuestaSql = await pool.query(querySql,[categoriaid,categorianombre,categoriadescripcion])
        Salida = {
            result_estado: "ok",
            result_message: "categorias actualizada",
            result_rows: respuestaSql.rowCount,
            result_verbo: "patch",
            result_proceso: "/categoria/:categoriaid",
            result_data: respuestaSql.rows[0],
          }
    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "patch",
            result_proceso: "/categoria/:categoriaid",
            result_data: "",
          }
    }
    res.json(Salida)
})

categoriaRouter.delete('/:categoriaid',async (req,res) => {
    try{
        const {categoriaid} = req.params

        const querySql =`
            delete from categoria 
                where categoriaid = $1 returning *
        `;

        const respuestaSql = await pool.query(querySql,[categoriaid])

        Salida = {
            result_estado: "ok",
            result_message: "categorias eliminada",
            result_rows: respuestaSql.rowCount,
            result_verbo: "delete",
            result_proceso: "/categoria/:categoriaid",
            result_data: respuestaSql.rows[0],
          }

    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "delete",
            result_proceso: "/categoria/:categoriaid",
            result_data: "",
          }
    }
    res.json(Salida)
});
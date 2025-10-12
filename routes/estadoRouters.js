import {pool} from '../connection/conexionPostgres.js'
import { Router } from 'express'
let Salida ={}

export const estadoRouter = Router()

estadoRouter.get('/',async (req,res) => {
    try{
        const querySql =`
            select * from estado
        `;
        const respuestaSql = await pool.query(querySql)

        
        Salida = {
            result_estado: "ok",
            result_message: "estado recuperados",
            result_rows: respuestaSql.rowCount,
            result_verbo: "get",
            result_proceso: "/estado",
            result_data: respuestaSql.rows,
          }
      

    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "get",
            result_proceso: "/estado",
            result_data: "",
          }
    }
    res.json(Salida)
})

estadoRouter.get('/:estadoid',async (req,res) => {
    try{
        const {estadoid} = req.params

        const querySql = `
            select estadoactual 
            from estado
            where estadoid = $1
        `;

        const respuestaSql = await pool.query(querySql,[estadoid])

           
        Salida = {
            result_estado: "ok",
            result_message: "estado recuperado por Id",
            result_rows: respuestaSql.rowCount,
            result_verbo: "get",
            result_proceso: "/estado/:estadoid",
            result_data: respuestaSql.rows[0],
          }
      
    }
    catch(error){
        Salida = {
            result_estado: "error",
            result_message: error.message,
            result_rows: 0,
            result_verbo: "get",
            result_proceso: "/estado/:estadoid",
            result_data: "",
          }
    }
    res.json(Salida)
})
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export const usuarioVerificado = (req,res,next)=>{
   try {
      const cookieJWT = req.headers.cookie.split("; ").find(cookie  => cookie.startsWith("jwt=")).slice(4);
      console.log('cookie = ',cookieJWT);
      const jwtDecodificado = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
      console.log(jwtDecodificado);
      console.log(jwtDecodificado.usuario);
      
      req.usuarioid = jwtDecodificado.usuario

      next()
      
   } catch (error){
      // console.error(error); 
      return res.json({
        result_message: "Inicie sesion",
      }); 
   }
}

/* 
function authenticateToken(req, res, next) {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];

   if (!token) return res.sendStatus(401); // Si no hay token, no está autorizado

   // Verificamos el token con la clave secreta
   jwt.verify(token, SECRET_KEY, (err, user) => {
       if (err) return res.sendStatus(403); // Token inválido o expirado

       req.user = user; // Guardamos la información del usuario en req para usarla después
       next();
   });
 */
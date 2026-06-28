const jwt = require("jsonwebtoken")
require("dotenv").config();
function userauth(req, res, next){
    const token = req.headers.token

    if(!token){
        res.status(401).json({
            msg:"Token not provided"
        })
    }

   try {
     const decodedData = jwt.verify(token, process.env.JWT_TOKEN);

     if (!decodedData) {
       return res.status(401).json({
         msg: "Invalid token",
       });
     }
     req.userId = decodedData.id;
     next();
   } catch (error) {
     res.status(401).json({
       msg: "Invalid token",
     });
   }
}

module.exports = {
    userauth
}
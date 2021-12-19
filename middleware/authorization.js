
const jwt = require("jsonwebtoken")

const decrypt = async (req, res, next) => {

    //Capturar el token en una variable
    const token = req.header("x-auth-token")

    //Si no hay token
    if(!token){
        return res.status(401).json({
            msg:"No token, no validation"
        })
    }
    //Sí hay token
    try{
        const openToken = await jwt.verify(token, process.env.SECRET)

        console.log("openToken", openToken)

        req.user = openToken.user

        next ()
    } catch (error) {
        
        console.log(error) 
            res.json(
                {
                    msg: "Error with the token"
                }
            )
        
    }
}

module.exports = decrypt
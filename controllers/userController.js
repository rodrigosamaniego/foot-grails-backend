const bcryptjs      = require("bcryptjs")
const jwt           =require("jsonwebtoken")

const User          =require("./../models/User")

//Creación de usuario
exports.create = async (req, res) => {
    //Obtener datos del formulario
    const {
        email,
        username,
        country,
        admin,
        password
    }= req.body

const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
if(!regex.test(password)){
    res.json( {
        errorMessage:"Error creating your account"
    })
    return
}
//proceso acrónico
try{
    //Password para BD
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    //Nuevo Usuario
    const newUser = await User.create({
        email,
        username,
        country, 
        admin,
        password: hashedPassword
    })

    //Aut con tokens
    //Payload
    const payload = {
        user: {
            id: newUser._id //id de BD
        }
    }
    //Firmar con token
    jwt.sign(
        payload, //Datos
        process.env.SECRET, //firma
        {
            expiresIn: 360000
        },
        (error, token) => {
            if (error) throw error

            res.json({
                
                data: token
            })
        }
    )

    }catch(error ){

    res.json({
        errorMessage: "Error creating user",
        error: error
    })
    }

}

//Inicio de sesión
exports.login = async (req, res) => {

    //email y password del formulario
    const {email, password} = req.body
    try {
    //coincidencia en BD
    const foundUser = await User.findOne({email})
    //Validación ususario
    if(!foundUser){
        return res.status(400).json({
            msg:"email or password are incorrect"
        })
    }
    //evalaución de password
    const verifiedPass = await bcryptjs.compare(password, foundUser.password)
        //password no coincide
        if(!verifiedPass){
            return await res.status(400).json({
                msg: "email or password are incorrect"
            })
        }
        //Generación de json web token
        console.log("foundUser:", foundUser)
        //payload
        const payload = {
            user: {
                id: foundUser.id
            }
        }
        //Firma de jwt
        jwt.sign(
            payload,
            process.env.SECRET,
            { 
                expiresIn: 360000
            },
            (error, token) => {
                if(error) throw error

                res.json({
                    msg: "Log in succesful",
                    data: token
                })
            }
        )
        return
    }catch (error){
        console.log(error)
        res.status(500).json({
            msg: "Problem with auth",
            data: error
        })
    }
}

//Verificar usuario
//Ruta con verificación de token
exports.verifyToken = async (req, res) => {
    
    try{
        //Buscar id del usuario
        const foundUser = await User.findById(req.user.id).select("-password")

        return res.json({
            msg: "Found user data",
            data: foundUser
        })

    }catch (error ){
        console.log(error)

        res.status(500).json({
            msg: "Couldnt find user data"
        })
    }
}





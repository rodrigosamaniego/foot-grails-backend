//imports

const express       =require("express")
const router        =express.Router()
const userContorller    =require("./../controllers/userController")
const authorization     =require("./../middleware/authorization")

//Crear usuario
router.post("/create", userContorller.create)

//Log in
router.post("/login", userContorller.login)

//Verificaión de usuario
router.get("/verifytoken", authorization, userContorller.verifyToken)


//exports
module.exports = router



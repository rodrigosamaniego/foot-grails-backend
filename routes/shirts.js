// ./
//imports
const express   =require("express")
const router    =express.Router()

const shirtController   =require("./../controllers/shirtController")

// ruteo

//Crear shirt
router.post("/create", shirtController.create)

//Leer all shirts
router.get("/readall", shirtController.readAll)

//Leer one shirt
router.get("/readone/:id", shirtController.readOne)

//Editar Shirt
router.put("/edit/:id", shirtController.edit)

//Borrar shirt
router.delete("/delete/:id", shirtController.delete)




//Exports
module.exports  = router
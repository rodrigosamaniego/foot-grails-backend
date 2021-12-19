//imports
const express = require("express")
const app = express()
const cors = require("cors")

require("dotenv").config()
const connectDB = require('./config/db')

//Middlewares
//Base de datos
connectDB()

// // CORS acceso de dearrollo de terceros
app.use(cors())

//Peticiones y respuestas en json
app.use(express.json())


//Rutas
app.use("/shirts", require("./routes/shirts"))
app.use("/users", require("./routes/users") )



//Server
app.listen(process.env.PORT, () => {
    console.log(`Corriendo en ${process.env.PORT}`)
})
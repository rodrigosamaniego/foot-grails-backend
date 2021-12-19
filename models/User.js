//models User.js

//Imports
const mongoose = require ("mongoose")

//Schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Se necesita un email"],
        match: [/^\S+@\S+\.\S+$/, "Ingresa un email válido"],
        unique: true,
        lowercase: true,
        trim: true
    },
    username : {
        type: String,
        required: true,
        unique: [true, "Username already taken"]
    },
    country: {
        type: String,
        required: true,

    },
    admin: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true

    }
})

//Models
const User = mongoose.model("User", userSchema)

//Exportación
module.exports = User 
//models/Shirt.js

//Imports
const mongoose = require("mongoose")

//Schema
const shirtSchema = mongoose.Schema({
    team: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Home", "Away", "Third"]
    },
    category: {
        type: String,
        enum: ["Club", "International"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

})

//Modelo
const Shirt = mongoose.model("Shirt", shirtSchema)

//Exportación
module.exports = Shirt


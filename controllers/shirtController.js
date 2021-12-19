//shirtController

const Shirt = require("./../models/Shirt")

exports.create = async (req, res) => {

    //Asignamos valores del formulario
    const {
        team,
        price,
        year,
        status,
        category,
        description,
        image
    }= req.body

    //crear una playera en BD

    try{
        const newShirt = await Shirt.create({
            team,
            price,
            year,
            status,
            category,
            description,
            image
        })
        //Respuesta en Json
        res.json({
            msg: "New shirt created",
            data: newShirt
        })
    } catch (error) {
        res.status(500).json({
            msg:"Error creating shirt",
            error: error
        })
    }
    
}

exports.readAll = async (req, res) => {
    try{
        const shirts = await Shirt.find({})
        res.json({
            msg: "Look at dat drip",
            data: shirts
        })
    }catch (error) {

        res.status(500).json({
            msg: "Error getting shirts",
            error: error
        })
    }
}

exports.readOne = async (req, res) => {
    const { id } = req.params

    try{
        const shirt = await Shirt.findById(id)
        res.json({
            msg: "Got shirt",
            data: shirt
        })
    } catch (error){
        res.status(500).json({
            msg: "Error getting shirt",
            error: error 
        })
    }
}

exports.edit = async (req, res) => {
    const { id } = req.params

    const {
        team,
        price,
        year,
        status,
        category,
        description,
        image
    }= req.body

    try {
        const updatedShirt = await Shirt.findByIdAndUpdate(
            id,
            {
                team,
                price,
                year,
                status,
                category,
                description,
                image
                
            },
            {new: true}
        )
        res.json({
            msg: "Updated shirt",
            data: updatedShirt
        })
    } catch (error){
        res.status(500).json({
            msg: "Error updating shirt",
            error: error
        })
    }


}

exports.delete = async (req, res) => {
    const { id } = req.params
    try{
        const deletedShirt = await Shirt.findByIdAndRemove({_id: id})
        res.json({
            msg: "Shirt deleted",
            data: deletedShirt
        })
    }catch (error) {
        res.status(500).json({
            msg: "Error deleting shirt",
            error: error
        })
    }
}

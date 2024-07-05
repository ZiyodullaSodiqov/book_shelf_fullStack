const model = require('../models/register')

// user add method POST
exports.add = async(req , res ) => {

    try{
        let Model = new model({
            ...req.body
        })
        Model.save()
        res.status(201).json({
            message: 'succesfuly create',
            data: Model
        })
    } catch(e){
        res.status(500).json(
            {
                message: 'Failed ' + e
            }
        )
    }
}


// user get by id method GET

exports.getId = async(req,res) => {
    model.findById({_id:model._id})
    res.status(200).json({
        succes: true ,
        data: model
    })
}

// user get all method GET

exports.getAll = async(req,res) => {
    await model.find().sort({createAt: -1}).exec((error, value) =>{
        if(error) throw error
        else {
            res.json({value})
        }
    })
}

// user edit method PUt

exports.modelPut = async(req,res) => {
    await model.findByIdAndUpdate(req.params.id).exec(async (error, value) => {
        if (error) throw error
        else{
            value.user_name = req.body.user_name
            value.password = req.body.password
            await value.save()
            .then(()=>{
                res.json(value)
            })
            .catch((error) =>{
                res.json(error)
            })
        }
    })
}


// user delete method DELETE

exports.modelDelete = async(req,res) => {
    await model.findByIdAndDelete(req.params.id).exec(async (error, value) => {
        if (error) throw error
        else{
            res.json({
                message:"delete",
                data: []
            })
        }
    })
}
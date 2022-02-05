const {Schema, model}= require('mongoose')

const listSchema = new Schema({
    name:String
})

const item = model("lists",listSchema)

module.exports= item

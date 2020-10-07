let mongoose = require('mongoose')

let beanSchema = new mongoose.Schema({
    name: String,
    type: String,
    coolness: Number
})

let Bean = mongoose.model('Bean', beanSchema)

module.exports = Bean
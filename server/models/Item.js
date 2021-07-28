const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:String,
  icon:String,
  categories:[{type:mongoose.Schema.Types.ObjectId,ref:'Category'}]
})

module.exports = mongoose.model('Item',schema)
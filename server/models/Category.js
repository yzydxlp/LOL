const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:String,
  parent:{type:mongoose.Schema.Types.ObjectId,ref:'Category'}
})

module.exports = mongoose.model('Category',schema)
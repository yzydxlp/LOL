const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title:String,
  categories:[{type:mongoose.Schema.Types.ObjectId,ref:'Category'}],
  body:String
})

module.exports = mongoose.model('Article',schema)
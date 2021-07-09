const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username:String,
  password:{
    type:String,
    set(val){
      return require('bcrypt').hashSync(val,10)
    },
    select:false
  }
})

module.exports = mongoose.model('AdminUser',schema)
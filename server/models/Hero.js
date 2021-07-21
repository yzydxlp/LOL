const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:String,
  avatar:String,
  title:String,
  categories:[{type:mongoose.Schema.Types.ObjectId,ref:'Category'}],
  scores:{
    physicalDamage:Number,//物理攻击
    magicDamage:Number,//魔法攻击
    defensiveCapability:Number,//防御能力
    difficult:Number,//上手难度
  },
  background:String,
  skills:[{
    icon:String,//技能图标
    name:String,//技能名称
    description:String,//技能描述
    position:String//技能类型键位
  }],
  allyTip:String,//己方使用
  enemyTip:String,//敌方使用
  skins:[String]//皮肤
})

module.exports = mongoose.model('Hero',schema,'heroes')
module.exports = app => {
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')
  const express = require('express')

  const router = express.Router({
    mergeParams:true
  })
  //子路由创建资源
  router.post('/',async (req,res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  //子路由更新资源
  router.put('/:id',async (req,res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })
  //子路由删除资源
  router.delete('/:id',async (req,res) => {
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
      success:true
    })
  })
  //子路由资源列表
  router.get('/',async (req,res) => {
    const queryOptions = {}
    if(req.Model.modelName === 'Category'){
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(300)
    res.send(items)
  })
  //子路由资源详情
  router.get('/:id',async (req,res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  //子路由登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')

  app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)

  const multer = require('multer')
  const MAO = require('multer-aliyun-oss');

  const upload = multer({
    dest:__dirname+'/../../uploads'
    // storage: MAO({
    //   config: {
    //       region: 'oss-cn-shanghai',
    //       accessKeyId: 'LTAI5t5nS72eyXY8kp3tyhHt',
    //       accessKeySecret: '6RBKC3ZCbxdjT6DCBIeeMRHfah4DbR',
    //       bucket: 'lolinfo'
    //   }
    // })
  })
  app.post('/admin/api/upload',authMiddleware(),upload.single('file'),async(req,res)=> {
    const file = req.file
    //这里需要改成线上地址
    file.url = `http://localhost:3000/uploads/${file.filename}`
    // file.url = `http://www.lolinfo.xyz/uploads/${file.filename}`
    res.send(file)
  })
  app.post('/admin/api/login',async(req,res)=>{
    const {username,password} = req.body
    //1.根据用户名找用户
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user,422,'用户不存在')
    //2.校验密码  
    const isValid = require('bcrypt').compareSync(password,user.password)
    assert(isValid,422,'用户或密码错误')
    //3.返回token
    const token = jwt.sign({id:user._id,},app.get('secret'))
    res.send({token})
  })
  //错误处理
  app.use(async (err,req,res,next)=> {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message:err.message
    })
  })
}
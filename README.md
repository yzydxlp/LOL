# Node.js +Vue.js 开发LOL手机端官网和管理后台

## 一、入门

### 1-2 工具安装和环境配置

下载Node.js和MongoDB

### 1-3 项目初始化

分为admin、server和web三个文件夹

**admin**负责后台管理，vue

**server**负责服务端，使用node开发，给后台管理和前端界面提供接口

**web**负责移动端，Vue

## 二、管理后台

基于Element-UI开发库

首先在vue项目中添加element组件库`vue add element`，以及安装路由`vue add router`

### 2-1 创建分类

数据的双向保定

#### 保存数据：请求一个接口，保存数据。`axios`

Axios 是一个基于 `promise` 的 `HTTP 库`，可以用在浏览器和 node.js 中

在客户端中创建一个axios实例，并绑定在prototype上

在服务端安装express，mongoose和cors，

```javascript
const express = require("express")
const app = express()
app.listen(3000,()=> {
	console.log("http://localhost:3000")
});
```

在服务端引用express ，创建实例，最后启动。有一个技巧，在写admin接口时，可以导出一个函数，这个函数接收一个参数，即express的实例`app`

当一个路由有好多个子路由时用app.use(path,router)

例子：
	 http://localhost:3000/home/one
	 http://localhost:3000/home/second
	 http://localhost:3000/home/three
 路由/home后面有三个子路由紧紧跟随，分别是/one,/second,/three
 如果使用app.get()，则要不断的重复,很麻烦，也不利用区分

```javascript
app.get("/home",callback)
app.get("/home/one",callback)
app.get("/home/second",callback)
app.get("/home/three",callback)
```

我们可以创建一个router.js 专门用来一个路由匹配多个子路由

```javascript
var express = require('express')
var router = express.Router()
router.get("/",(req,res)=>{
    res.send("/")
})
router.get("/one",(req,res)=>{
    res.send("one")
})
router.get("/second",(req,res)=>{
    res.send("second")
})
router.get("/treen",(req,res)=>{
    res.send("treen")
})
module.exports = router;
```

在app.js中导入router.js

```jsx
var express = require('express')
var router = require("./router")
var app = express()

app.use('/home',router) //router路由对象中的路由都会匹配到"/home"路由后面
app.get('/about', function (req, res) {
  console.log(req.query)
  res.send('你好，我是 Express!')
})

// 4 .启动服务
app.listen(3000, function () {
  console.log('app is running at port 3000.')
})
```

路由规则是`app.use(path,router)`定义的，`router`代表一个由`express.Router()`创建的对象，在路由对象中可定义多个路由规则。可是如果我们的路由只有一条规则时，可直接接一个回调作为简写，也可直接使用`app.get`或`app.post`方法。即当一个路径有多个匹配规则时，使用app.use（）

当需要用到多个子路由时，可以创建一个路由，将调用的接口请求等挂载到router上，再将router挂载到app上

在提交数据或者请求数据时，首先需要创建一个数据模型，定义需要用的字段

```javascript
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:String
})
module.exports = mongoose.model('Category',schema)
```

#### 提交数据

```javascript
router.post('/categories',async ( req,res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
```

#### 请求数据

```javascript
router.get('/categories',async ( req,res) => {
    const items = await Category.find().limit(200)
    res.send(items)
  })
```

一般请求数据都放在created中，因为如果放在mounted中时，可能会发生屏闪。在页面挂载完之前把请求完成就不回看到屏闪了

### 2-2 分类列表

### 2-3 修改分类



在List页面，给列表分类添加编辑功能，点击这个编辑时，即可跳转到编辑页面，将当前这个数据的id传入。

```javascript
@click="$router.push(`/categories/edit/${scope.row._id}`)"
```

在路由中，添加子路径，并绑定到创建的页面中去，接收一个id参数,props表明在组件`CategoryEdit`中接收id的参数

```javascript
{
        path:'/categories/edit/:id',
        component:CategoryEdit,
        props:true
}
```

在Edit页面，接收这个id参数

```javascript
props: {
      id: String
},
```

最后在Edit界面，根据是否有id来辨别界面，以及是否需要获取详情数据

**辨别界面**：

```javascript
<h2>{{id ? '编辑':'新建'}}分类</h2>
//根据是否有传入数据id，来显示到底是编辑页面还是新建页面，
```

**是否需要获得数据详情**：

```javascript
this.id && this.fetch()
```

**获取详情的接口**：

```javascript
//获取具体某一个详情
  router.get('/categories/:id',async ( req,res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })
```

在进行修改的时候，还要根据id是否存在来判别是创建还是修改

**判别是修改数据还是提交数据**：

```javascript
if(this.id) {
    res = await this.$http.put(`categories/${this.id}`,this.model)
}else {
    res = await this.$http.post('categories',this.model)
}
```

**修改数据的接口：**

```javascript
//修改数据  router.put('/categories/:id',async ( req,res) => {    const model = await Category.findByIdAndUpdate(req.params.id,req.body)    //接收两个参数，通过id找到，然后根据req.body的内容修改    res.send(model)  })
```

### 2-4 删除分类

添加删除按钮，并绑定一个remove函数，点击按钮时，获取当前行的数据row，传入函数，作为接口的删除参数

```javascript
async remove(row){
    this.$confirm(`是否确定删除分类"${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then( async () => {
        await this.$http.delete(`categories/${row._id}`)
        this.$message({
            type: 'success',
            message: '删除成功!'
        });
        this.fetch()
    })
}
```

**删除接口：**

```javascript
router.delete('/categories/:id',async ( req,res) => {
    await Category.findByIdAndDelete(req.params.id,req.body)
    res.send({
        success:true
    })
})
```

### 2-5 创建父级分类

在数据库中，他们还是平级的分类，但是在子分类中会有一个父级的字段，表示父级是谁，形成一个链式结构，就可以实现无限层级的分类

修改`Category`的数据模型，表示关联到Category的模型。：

```javascript
const schema = new mongoose.Schema({
  name:String,
  parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}
})
```

再修改获取数据，加入`populate`表示取出关联的那个对象。不加的话返回的是parent的id，加了返回对应的对象

```javascript
 //获取列表数据
  router.get('/categories',async ( req,res) => {
    const items = await Category.find().populate('parent').limit(200)
    res.send(items)
  })
```

### 2-6 通用CRUD接口

通过一套增删改查的接口，就能给所有的资源使用

观察接口发现，只要修改路径中模型的名字即可，这样，将模型的名字作为参数，并通过`inflextion`模块将模型名字进行修改，如修改单复数和大写等等操作，转化为对应路径。inflection用于单词的格式转换

由于要给每个接口和请求都添加一个前置操作，因此可以使用添加中间件的方式

```javascript
app.use('/admin/api/rest/:resource',async (req,res)=> {
    const modelName = require('inflection').classify(req.params.resource)
    const Model = require(`../../models/${modelName}`)
    next()
  },router)
```

### 2-7 上传图片

使用模块multer

首先让上传文件可见，由于在Node.js中写的，但反想要访问的东西一定要写路由。要定义一个特殊的路由，静态文件托管

```javascript
app.use('/uploads',express.static(__dirname+'/uploads'))
```

```javascript
const multer = require('multer')
  const upload = multer({dest:__dirname+'/../../uploads'})
  //single表示单个文件的上传
  app.post('/admin/api/upload',upload.single('file'),async (req,res)=> {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
```

### 2-8 富文本编辑器

vue editor 

```javascript
npm install --save vue2-editor
```

富文本编辑器中存在图片上传的问题：直接将图片转为了base64的格式，这样的上传数据太大

### 2-9 管理员账号

#### 管理员账号

去模型中新增,使用bcrypt中的散列去加密，而且只需要散列一次

```javascript
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username:String,
  password:{
    type:String,
    select:false,
    set(val) {
      return require('bcrypt').hashSync(val,10)//对密码进行加密
    }
  }
})
module.exports = mongoose.model('AdminUser',schema)
```

#### 登陆页面

在登陆界面写两个input，并绑定数据，在点击按钮提交时，将这个model发送出去

#### 登录接口

```javascript
http.interceptors.response.use(res=>{
  return res
},err =>{
  if(err.response.data.message) {
    Vue.prototype.$message.error(err.response.data.message)
  }
  return Promise.reject(err)
})
```

在后端统一获取错误信息，如果有错误信息则直接弹出。响应拦截

安装jwt(jsonwebtoken)，用于返回token校验

token的生成

```javascript
//3.返回token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({id:user._id,},app.get('serect'))
    res.send({token})
```

在前端登陆界面接收token,存储在浏览器中，下次关闭仍然存在

```javascript
async login(){
    const res = await this.$http.post('login',this.model)
    localStorage.token = res.data.token
    console.log(res.data)
    this.$router.push('/')
    this.$message({
        type:'success',
        message:'登陆成功'
    })
}	
```

#### 服务端登录校验

在各种接口前面加一个中间件，用来验证是否存在用户信息，如果不存在，则不成功

express可以在任意位置加入中间件，用来处理各种操作

为了校验是否存在token，我们需要在请求头里添加数据。因此在前端发起的每一个请求中，都要添加headers信息

```javascript
http.interceptors.request.use(function(config){
  //标准的请求头
  config.headers.Authorization ="Bearer " + localStorage.token
  return config
},function(error){
  return Promise.reject(error)
})
```

此时，在后端校验，使用jwt的函数验证，如果验证通过，则返回登录用户的id

```javascript
const token =  String(req.headers.authorization|| '').split(' ').pop()
const {id} = jwt.verify(token,app.get('serect'))
req.user = await AdminUser.findById(id)
```

这样就可以根据返回的id去数据库找用户是否存在，将找到的用户挂载到req上，这样后续都可以用到

在上述操作中，但凡有一步出错，都需要报错，频繁使用到了报错，因此使用assert，只要在接口请求中简单地抛出所有异常，然后在最后用一个错误处理函数处理即可

```javascript
//处理错误函数  app.use(async (err,req,res,next)=> {    // console.log(err)    res.status(500).send({      message:err.message    })  })	
```

将用户登录检验写成一个中间件，放在资源请求的前面，这样所有资源请求都要经过校验，看用户是否登录，再给定接口

注意，在提取中间件时，要以一个函数的形式返回

#### 客户端路由限制(beforeEach,meta)

在创建的页面，由于没有发起请求，所以还是可以正常访问。在路由界面，给登录界面添加一个meta属性

```javascript
{    path:'/login',    name:'login',    component:Login,    //如果没加这个参数 都是必须要登录    meta:{      isPublic:true    }  },
```

然后在路由中添加一个beforreEach

```javascript
//表示每一次切换路由的时候，需要做什么
router.beforeEach((to,from,next)=> {
  //如果在进入这个页面之前，没有meta参数中的isPublic而且用户信息的token不存在
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})
```

## 三、移动端网站

### 工具样式的概念 less

### 网站整体色彩和字体定义

​	比如定义主色调是什么，大致用到哪几种颜色，将这几种颜色作为变量导入样式表，并在main.js中引用这个样式表，这样在任何文件中都可以用到定义的颜色

```javascript
@spacing-types:{
  m:margin;
  p:padding
};
@spacing-directions:{t:top;r:right;b:bottom;l:left}
@spacing-base-size:1rem;
@spacing-sizes:{0:0;1:0.25;2:0.5;3:1;4:1.5;5:3}
//遍历定义的spacing-types
each(@spacing-types,.(@typeKey,@type) {
  each(@spacing-sizes,.(@sizeKey,@size) {
    // .m-1 {margin-top:0.25rem}
    .@{type}-@{size} {
      @{typeKey} : @sizeKey * @spacing-base-size

    }
    //.mx-1
    .@{type}x-@{size} {
      @{typeKey}-left : @sizeKey * @spacing-base-size;
      @{typeKey}-right : @sizeKey * @spacing-base-size
    }
    //.my-1
    .@{type}y-@{size} {
      @{typeKey}-top : @sizeKey * @spacing-base-size;
      @{typeKey}-bottom : @sizeKey * @spacing-base-size
    }
  })
  //.mt-1
  each(@spacing-directions,.(@directionKey,@direction){
    each(@spacing-sizes,.(@sizeKey,@size) {
      .@{type}@{direction}-@{size} {
        @{typeKey}-@{directionKey} : @sizeKey * @spacing-base-size
      }
    })
  })
})
```

使用插件`pxtorem`可以简单地换算。这样就可以适应不同屏幕地大小

### 通用flex布局定义

主要定义`justify-content`和`align-items`的属性

### 定义padding和margin

### 使用具名插槽

### 函数调用的内存情况

函数调用的时候会压入函数栈，存储了所有临时变量，当函数调用结束时，会弹出函数栈，释放所有变量

### 事件总线

在main.js的原型中设置一个`Vue.prototype.$bus = new Vue()`

this.$bus.$emit() 发送

this.$bus.$on()接收

### 防抖debounce/节流throttle

#### 防抖，最后只会刷新一次

```javascript
debounce(fun,delay){
    let timer = null
    return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimerout(()=>{
            func.apply(this,...args)
        },delay)
    }
}
```

在延迟的过程中，又会调用此函数，这样就又会把上一次的timer的定时器取消掉。在最后一次调用的时候，就等到了延迟事件，就会执行最后一次

#### 节流，在一定时间内只执行一次

### 遇到的问题

设置了keep-alive之后，跳转到某个英雄信息页面之后路由改变，但是页面信息没有改变。原因是因为keep-alive会缓存同一组件的信息，不回再发送新的请求。解决方法有两个：

一：在每次进入当前页面时，在activated中添加请求，使得每次进入当前页面都要发送一次请求并更新页面，这样的坏处就是请求数据之前还是显示上一次的页面，会有短暂的停留

二、在设置keep-alive时，调用exclude属性，填入英雄详情页面设置的name属性





## 四、发布和部署


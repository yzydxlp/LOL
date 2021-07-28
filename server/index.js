const express = require("express")

const app = express()

app.set('secret','qazokm')

app.use(require('cors')())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}))
app.use('/admin',express.static(__dirname+'/admin'))
app.use('/',express.static(__dirname+'/web'))
app.use('/uploads',express.static(__dirname+'/uploads'))

require('./plugins/db.js')(app)//引用数据库
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000,() => {
  console.log('http://localhost:3000')
});
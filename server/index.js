const express = require("express")

const app = express()
app.set('secret','qazokm')
app.use(require('cors')())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}))
app.use('/uploads',express.static(__dirname+'/uploads'))
require('./plugins/db.js')(app)
require('./routes/admin')(app)
app.listen(3000,() => {
  console.log('http://localhost:3000')
});
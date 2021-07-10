const express = require('express')
const app = express()
const cors = require('cors')
require('./db/conn')

const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
app.use(require('./routes/userRoutes'))
app.use(require('./routes/sheetRoute'))

app.get('/', (req,res)=>{
    console.log(req)
    res.send('WELCOME')
})

app.listen(PORT, ()=>{
    console.log(`${PORT}`)
})
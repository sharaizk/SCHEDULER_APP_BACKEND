const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const currentdate = new Date()
const time = new Date();
const currenttime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',second:'numeric', hour12: true })

const sheetSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: `${currentdate.getFullYear()}-${(currentdate.getMonth() + 1).toString().padStart(2, "0")}-${currentdate.getDate().toString().padStart(2, "0")}`
    },
    sheets:[
        {
            time:{
                type: String,
                required: true
            },
            status:{
                type:String,
                required: true
            },
            description:{
                type: String
            }
        }
    ]
})

const Sheet = mongoose.model('SHEET', sheetSchema)
module.exports = Sheet
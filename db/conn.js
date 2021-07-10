const mongoose = require('mongoose')
const DB = 'mongodb+srv://shariazk:Ppaplk123@cluster0.nfjlb.mongodb.net/schedulerDatabase?retryWrites=true&w=majority'

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log('Connection Established')
}).catch((e)=>{
    console.log(e)
})
const express = require("express");
const router = express.Router();

const Sheet = require('../models/sheetSchema')
const currentdate = new Date()
const date = `${currentdate.getFullYear()}-${(currentdate.getMonth() + 1).toString().padStart(2, "0")}-${currentdate.getDate().toString().padStart(2, "0")}`
router.post('/sheet/create',async (req,res)=>{
    const {userId, time} = req.body
    let {description, status} = req.body
    if(!userId) {
        return res.status(400).send({error:"Please fill the data"})
    }
    // Dynamically deciding if the user has clocked-in or clocked-out
    if(!description){
        description = "Arrived"
        status = "Clock-In"
    }
    else if(description){
        status="Clock-Out"
    }
    try {
        // Finding the sheet of a particular user on current date
        const findSheet = await Sheet.findOne({userId: userId, date:date})
        if(findSheet){
            // Pushing the data into existing sheet
            const saveSheet = await Sheet.findOneAndUpdate({userId, date}, {$push: {sheets: {time:time, description:description, status: status}}})
            return res.status(200).json({message:"Sheet Created"})
        }
        else{
            // Sheet isn't created so creating the sheet on current date
            const sheetData = new Sheet({userId,sheets:{time:time, description:description, status: status}})
            const savedSheet = await sheetData.save()
            if(savedSheet){
                return res.status(200).send({message:"Sheet Created"})
            }
            else{
                return res.status(200).send({error:"Couldn't create sheet"})
            }
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/sheet/get', async(req,res)=>{
    const {userId} = req.query
    if(!userId || !date){
        return res.status(400).send({error:"Invalid User"})
    }
    try {
        const searchedSheet = await Sheet.findOne({userId, date}).select({"_id":0, "__v":0})
        if(searchedSheet){
            res.status(200).send(searchedSheet)
        }
        else{
            return res.status(404).send({error:"No Sheet Found"})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
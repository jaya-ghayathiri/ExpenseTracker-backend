const mongoose=require('mongoose')
const expenseTrackerSchema=new mongoose.Schema({
    amount:{
        type:Number
    },
    category:{
        type:String
    },
    date:{
        type:String
    }
})      
    

const Expense=mongoose.model('expensedetails',expenseTrackerSchema)//expensedetails-->collection
// const userSchema=new mongoose.Schema()
module.exports={Expense }

const usersSchema = new mongoose.Schema({
    name :{
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
})
const User = mongoose.model('Userdetails',usersSchema)
module.exports = {User}
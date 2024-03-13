const mongoose=require('mongoose')
const express=require('express')
const{Expense}=require('./schema.js')
const {User} = require('./schema.js')
const bodyparser=require('body-parser')
const cors=require('cors')

const app=express()
app.use(bodyparser.json())
app.use(cors())
/**
 * npm init --y
 * npm i nodemon --save-dev
 * create .gitignore
 * while deployment-->change process.env.PORT || 8000
 * 2)install-->npm i cors
 * 3)const cors=require('cors')
 * 4)app.use(cors())
 * render.com in browser-->get free started
 * new web servies--config account--only select repo--particularly choose the repo--click on connect
 * next-->chage the build command as npm install---then at start command()print npm start--create web services
 * copy the link in render after some procedur place the copied link instead of localhost8000...
 * 
 * expense tracker
 * 
 * Adding a new expense/income:/add-expense(post)
 * displaying existing expenses:/get-expense(get)
 * editing exxisting entries:/edit-expense(put/patch)
 * deleting expenses:/delete-expense(delete)
 * 
 * budget reporting
 * creating user
 * validating user
 * editing existing entries
 * 
 * 
 * defining the schema
 * category,amount,date
 * 
 * 
 */ 
// / and ? between them give the database name here it is ExpenseTracker
async function connectToDb(){
    try{
    await mongoose.connect('mongodb+srv://jayaghayathiri:jayagayu@cluster0.jhjnpn6.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0')
    console.log('DB connection established')
    //process.env.PORTprocess.env.PORT -->port number will be given by itself
    const port=process.env.PORT || 8000
    app.listen(port,function(){
    console.log(`listening on port ${port}`)
})
    }catch (error){
        console.log(error)
        console.log("couldnt establish connection")
    }
}
connectToDb()

app.post('/add-expense',async function(request,response){
    // console.log(request.body)
    // response.json({
    //     "status":"created"
    // })

    //fetch and give the result from postman
    //model is to create the schema
    try{//this block is used to add the data from postamn to atlas
        await Expense.create({//create-->insert/add to mongo atlas
            "amount":request.body.amount,
            "category":request.body.category,
            "date":request.body.date
        })
        response.status(201).json({
            "status":"success",
            "message":"new entry created"
        })
    }catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"entry not created",
            "error":error
    })
}
})
app.get('/get-expense',async function(request,response){
   try{//this block is used to print the details in the postman itself...(name,email...)
    const expensesData= await Expense.find()//inorder to store,create a variable
   response.status(200).json(expensesData)
   }catch(error){
    response.status(500).json({
        "status":"failure",
        "message":"entry not created",
        "error":error
})
   }
})

//localhost:8000/delete-expense/65e69b0ae1c79d97a7a7192a
// localhost:8000/delete-expense/params
app.delete('/delete-expense/:id',async function(request,response){
    // console.log(request.params.id)
   const expenseData= await Expense.findById(request.params.id)
   try{
    if(expenseData){
        await Expense.findByIdAndDelete(request.params.id)
        response.status(200),json({
            "status":"success",
            "message":"deleted entry"
        })
       }
       else{
        response.status(404),json({
            "status":"failure",
            "message":"could not find document"
        })
       }
   }catch(error){
    response.status(500).json({
        "status":"failure",
        "message":"could not delete entry",
        "error":error
})
   }
})
app.patch('/edit-expense/:id',async function(request,response){
    try{
        const expenseEntry=await Expense.findById(request.params.id)
    if(expenseEntry){
        await expenseEntry.updateOne({
            "amount":request.body.amount,
            "category":request.body.category,
            "date":request.body.date
        })
        response.status(200).json({
            "status":"success",
            "message":"updated entry"
        })
    }
    else{
        response.status(404).json({
            "status":"failure",
            "message":"could not find document"
        })
    }
    }
    catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"could not delete entry",
            "error":error
    })
    }
})
app.post('/user-expense',async function(request,response){
    try{
        await User.create({
            "name" : request.body.name,
            "email" : request.body.email,
            "password" : request.body.password
        })
        response.status(201).json({
            "status":"Success",
            "message":"new user created"
        })
    }
    catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "couldn/'t add user",
            "error" : error
        })
    }
})
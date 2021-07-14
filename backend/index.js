require("dotenv").config()
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

//ROUTES
const authRoute = require("./route/auth"); 
const appRoute = require("./route/appdata"); 



//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors())



//DATABASE CONNECTION
mongoose.connect(process.env.DATABASE,
 {useNewUrlParser: true})
.then(()=>console.log("DB connected"));


//Routes

app.use("/api",authRoute)
app.use("/api",appRoute)

app.listen(5000,()=>{

console.log("App is running");
})



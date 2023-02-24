require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors")

//My Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");



//DB connection
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true
}).then(()=>{
    console.log('DB CONNECTED')
}).catch((err)=>{
    console.log(err)
})

//middleware
app.use(express.json());
app.use(cors());

//my routes
app.use("/api",authRoutes)
app.use("/api",postRoutes);
app.use("/api",userRoutes)


//port
const port = 8000 ;
//listening port;
app.listen(port,()=>{
    console.log(`Server is up and running at ${port}`);
})
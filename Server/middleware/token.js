const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require('../models/user');

const verifyToken = (req,res,next)=>{
let token = req.headers.authorization;
if(token){
    token = token.split(" ")[1];
    jwt.verify(token,process.env.SECRET,(err,payload)=>{
        if(err){
        return res.status(401).json({ error: "you must be logged in" });
        }
        const {_id} = payload;
        User.findById(_id).then((userdata)=>{
            req.user = userdata;
            next();
        })
    })

}else{
    return res.status(401).json({ error: "unauthorized User" });
}

}
module.exports = verifyToken;
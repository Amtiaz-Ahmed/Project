const bcrypt            = require('bcrypt');
const jwt               = require('jsonwebtoken');
const userModel         = require('../models/user-model');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser  = async (req,res)=>{
        try {
        let { fullname , email, password } = req.body;

        let user =await userModel.findOne({email : email});
        if(user){
             return res.status(401).send('You already have accound , Please Login first...');
        }
        else{

        
         bcrypt.genSalt(10, function(err, salt) {
             bcrypt.hash(password, salt,async function(err, hash) {
                 if (err) {
                     return res.send(err.message);
                 } else {
                     
                 
                 let user = await userModel.create({
                     fullname ,
                     email,
                     password : hash,
                 });
                 let token = generateToken(user);
                 res.cookie('token', token);
                 res.send("user created...")
             };   
             });
         });
        }
     
        } catch (error) {
          res.send(error.message)
        }
     
     };

module.exports.loginUser     = async (req,res)=>{
    let { email, password } = req.body;

    let user = await userModel.findOne({email : email});
        if(!user){
             return res.send('Email or Password not correct...');
        };

        bcrypt.compare(password, user.password , function(err, result) {
            if(result){
                let token =  generateToken(user);
                res.cookie('token',token)
                res.send('You can login');
            }
            else{
                return res.send('Emails or Passwords not correct...');
            }
        });
     
}
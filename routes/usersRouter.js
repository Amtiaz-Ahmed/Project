const express   = require('express');
const router    = express.Router();
const bcrypt    = require('bcrypt');
const jwt    = require('jsonwebtoken');
const userModel = require('../models/user-model');

router.get('/',(req,res)=>{
    res.send('users router')
});

router.post('/register' , (req,res)=>{
   try {
    let { fullname , email, password } = req.body;

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
            let token = jwt.sign({ email, id : user._id }, 'project');
            res.cookie('token', token);
            res.send()
        };   
        });
    });


   } catch (error) {
     res.send(error.message)
   }

})

module.exports = router;
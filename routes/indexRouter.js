const express     = require('express');
const router      = express.Router();
const ownersModel = require('../models/owner-model'); 

router.get('/',(req,res)=>{
    res.send('owners router')
});

if(process.env.NODE_ENV === "development"){
    router.post('/create',async (req,res)=>{
        let owner =await ownersModel.find();

        if(owner.length>0)
        {
           return res.status(503).send("you can't create User");
        }
        let { fullname, email, password } = req.body;
        let createdOwner = ownersModel.create({
            fullname,
            email,
            password,
            });
        res.status(200).send(createdOwner);
    
    });
}

module.exports = router;
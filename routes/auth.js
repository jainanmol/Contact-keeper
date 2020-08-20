const express= require('express');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const config= require('config');
const auth= require('../middleware/auth');
const {check, validationResult } = require('express-validator');
const User= require('../models/Users');
const router= express.Router();

// @route GET api/auth
// @desc Get logged in user
// @acess private

router.get('/', auth, async(req, res)=>{
    console.log('user id', req.user);
    try {
        
        //req.user is same what i have assigned in auth middlewre
    const user= await User.findById(req.user.id).select('-password');
    console.log('user', user);
    res.status(200).json(user);

    } catch (error) {
        res.status(400).json({msg: 'Server Error'});
    }
});

// @route POST api/auth
// @desc Auth user and get token
// @acess private

router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],async (req, res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array() });
    }

    const {email, password}= req.body;

    try{
        let user= await User.findOne({email});
        if(!user){
           return res.status(400).json({msg: 'Invalid credentials'});
        }

        console.log('user password', user.password);
        console.log('password', password);
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const payload={
            user:{
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token)=>{
            if(err) throw err;
            res.json({token});
        })

    }
    catch(err){
        res.status(500).send('Server error');
    }
});

module.exports= router;
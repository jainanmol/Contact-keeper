const express= require('express');
const User= require('../models/Users');
const Contact= require('../models/Contacts');
const { check, validationResult } = require('express-validator');
const auth= require('../middleware/auth');
const router= express.Router();

// @route GET api/contacts
// @desc Get user's contact
// @acess Private

router.get('/', auth, async(req, res)=>{
    try {
        const contacts= await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts);
        
    } catch (error) {
        console.log(`Error in contacts ${error}`);
        res.status(500).json({msg: 'Server error'});
    }
});

// @route POST api/contacts
// @desc Add new contact
// @acess Private

router.post('/', auth, [
    check('name', 'Name is required').not().isEmpty(),
], async(req, res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const { name, email, phone, type }= req.body;

    try {
        const newContact= new Contact({            
            user: req.user.id,
            name, 
            email,
            phone,
            type,
        });
        console.log('contatc body>>', req.user.id);
        
        const savedContact= await newContact.save();
        console.log('sved contatc', savedContact);
        return res.json(savedContact);
    } catch (error) {
        console.log('error in saving contact', error);
        return res.status(400).json({msg: 'Error in saving contact'});
    }

    res.send('Add a contact');
});

// @route PUT api/contacts/:id
// @desc Update user contact
// @acess Private

router.put('/:id', auth, async(req, res)=>{
    const { name, email, phone, type }= req.body;

    const contactFields={};
    if(name) contactFields.name= name;
    if(email) contactFields.email= email;
    if(phone) contactFields.phone= phone;
    if(type) contactFields.type= type;

    try {
        let contactid= await Contact.findById(req.params.id);
        console.log("contatcid",contactid);

        if(!contactid){
            return res.status(404).json({msg: 'Contact not found'});
        }

        //make sure user owns contact

        if(contactid.user.toString() !==req.user.id){
            return res.status(401).json({msg:'Not Authorized'});
        }

        contactid= await Contact.findByIdAndUpdate(req.params.id,{
            $set: contactFields},{new: true});

            res.json(contactid);

    } catch (error) {

        console.log('Error in contact updating', error);
        return res.staus(404).json({err: error});
        
    }
});

// @route DELETE api/contacts/:id
// @desc Delete user contact
// @acess Private

router.delete('/:id', auth, async(req, res)=>{

    try {
        let contactid= await Contact.findById(req.params.id);

        if(!contactid){
            return res.status(404).json({msg: 'Contact not found'});
        }

        //make sure user owns contact

        if(contactid.user.toString() !==req.user.id){
            return res.status(401).json({msg:'Not Authorized'});
        }

       await Contact.findByIdAndRemove(req.params.id);
       res.json({msg:'contact deleted'})

    } catch (error) {

        console.log('Error in contact deletion', error);
        return res.staus(404).json({err: error});
        
    }
    res.send('delete user contact');
});

module.exports= router;
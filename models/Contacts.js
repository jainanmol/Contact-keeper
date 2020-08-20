const mongoose= require('mongoose');

const contactSchema= mongoose.Schema({
    //because each user can have their own set of contacts
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,        
    },
    type:{
        type: String,
        default: 'personal',
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

module.exports= mongoose.model('contact', contactSchema);
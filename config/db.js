const mongoose= require('mongoose');
const config= require('config');

const db=config.get("mongoURI");

const connectDb= async()=>{
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log('Mondo db connected');
    }
    catch(err){
        console.log(`Error in mongodb connection ${err}`);
        process.exit(1);
    }
}

module.exports= connectDb;
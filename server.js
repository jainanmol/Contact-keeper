const express= require("express");
const connectDb= require('./config/db');

const app= express();

//init middleware

app.use(express.json({extended: false}));

connectDb();
app.get('/',(req, res)=>{
    res.json({msg:'Welcome to the Contactkeeper Api'});
});

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

const port=process.env.PORT || 5000;

app.listen(port, ()=>{console.log(`Server stared on port ${port}`)});
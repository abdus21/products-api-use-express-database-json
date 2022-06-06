const express = require('express');
const path = require('path')
const app = express();
const dotenv = require('dotenv');
const { authCheck } = require('./middleware/authMiddleware');

const colors = require('colors')




dotenv.config();
const Port = process.env.server_port

// use middleware
app.use(authCheck);

// request body init
app.use(express.json())
app.use(express.urlencoded({extended : false}))

/* app.get('/samad', authCheck , (req,res,next)=>{
    res.send('done')
    console.log('sdfsadf');
    next()
}) */

app.use('/api/product', require('./routers/product'))


app.listen(Port,()=>{
    console.log('server is running');
})
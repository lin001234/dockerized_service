require('dotenv').config();
const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();
const port = 3000;

// Create auth middleware instance
const authMiddleware = basicAuth({
    users: { 
        [process.env.USERNAME]: process.env.PASSWORD 
    },
    challenge: true,
    unauthorizedResponse: 'Unauthorized Access'
});

app.get('/', (req,res) =>{
    res.send("Hello World");
});

app.get('/secret', authMiddleware,(req,res)=>{
    res.send(process.env.SECRET_MESSAGE);
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Test credentials: ${process.env.USERNAME}/${process.env.PASSWORD}`);
});
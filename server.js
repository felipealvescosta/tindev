const express = require('express');

const app = express();
const server = require('http').Server(app); 


app.use((req,res, next) =>{
   console.log("hellow word!");
});

app.use(express.json());


server.listen(8080);
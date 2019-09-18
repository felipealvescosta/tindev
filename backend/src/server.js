const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app); 
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket=> {
    console.log('Nova Conexão', socket.id);

    socket.on('hello', message => {
        const { user } = socket.handshake.query;
        console.log('Usuário: '+user, ' - Sessão: '+socket.id);
        connectedUsers[ user ] = socket.id;
    } )
});

mongoose.connect('mongodb+srv://felipealves:Res3456res@cluster0-ubw8y.mongodb.net/tindev1?retryWrites=true&w=majority',{
    useNewUrlParser: true
});

app.use((req,res, next) =>{
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(2090);
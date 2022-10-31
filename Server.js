const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket) => {
    socket.on('name',(data)=>{
        console.log(data+' connected');
    });

    socket.on('spinStart',(data)=>{
      socket.broadcast.emit('spinStart',data);
    })

    socket.on('spinEnd',(data)=>{
      socket.broadcast.emit('spinEnd',data);
    });

    socket.on('buzz',(data)=>{
      console.log(data+' Buzzed!');
      socket.broadcast.emit('buzz',data+' has Buzzed!');
    })
  
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});
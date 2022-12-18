const express = require("express");
const app = express();

const http = require("http").createServer(app)
app.use(express.static(__dirname + "/public"))
const port = process.env.PORT || 8000

http.listen(port, ()=>{
    console.log(`listining at port ${port}`)
})

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

const io = require("socket.io")(http);

io.on('connection', (socket)=>{
    console.log("socket connection successfull");

    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg)
    })
})

import { Socket } from 'dgram'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
const app=express()
const server=http.createServer(app)
const io=new Server(server,{
    cors: {
        origin: 'http://localhost:5173', // Allow the frontend origin
        methods: ['GET', 'POST'],
        credentials: true,
      }
})
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    methods: ['GET', 'POST'],
    credentials: true
}));










let sockett=[]

io.on('connection',(socket)=>{
    sockett.push(socket.id)
    socket.join('room')
    console.log(socket.id)

    socket.on('join',()=>{
        console.log('joined')
        if(sockett.length>1){
            io.to(socket.id).emit('isFull',true)
        }
        else{
            io.to(socket.id).emit('isFull',false)
        }
    })

    socket.on('offer',(data)=>{
        socket.to('room').emit('offer',data)
        
    })
    socket.on('answer',(data)=>{
        socket.to('room').emit('answer',data)
    })
    socket.on('dis',()=>{
        const index = sockett.indexOf(socket.id);
        if (index > -1) { // only splice array when item is found
            sockett.splice(index, 1); // 2nd parameter means remove one item only
        }
        socket.leave('room')
        socket.to('room').emit('dis')
        socket.disconnect(true)
        
        
        
    })
    socket.on('disconnect',()=>{
        const index = sockett.indexOf(socket.id);
            if (index > -1) { // only splice array when item is found
                sockett.splice(index, 1); // 2nd parameter means remove one item only
            }
        socket.leave('room')
        socket.to('room').emit('dis')
        
        
    })
})






server.listen(8000,()=>{
    console.log("Hello..")
})











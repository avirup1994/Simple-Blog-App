const socketio=require('socket.io');
const jwttoken=require('./JwtToken');
const events = require('events');
const eventEmitter = new events.EventEmitter();

let setserver=(server)=>{
    let onlineusers=[];
    let io=socketio.listen(server);
    let myio=io.of('');
    myio.on('connection',(socket)=>{
        console.log('Connection on in socket');
    
        socket.emit('verifyuser',`Hello user your are verifying`);
        socket.on('set-user',(authToken)=>{
        jwttoken.verifyJWTwithoutsecret(authToken,(err,result)=>{
            if(err)
            {
                socket.emit('authToken error',
                {status:500,
                error:'Please provide correct authToken'})
            }
            else{
                console.log(result);
                let currentuser=result.data;
                let fullname=`${currentuser.firstName} ${currentuser.lastName}`;
                console.log(`${fullname} is online`);
                socket.emit('user',`${fullname} is online`);
                let userobj={
                useridjwt:currentuser.userId,
                userName:fullname};
                onlineusers.push(userobj);
                socket.emit('online',onlineusers);
                console.log(onlineusers);
            }
        })
        })
    
    socket.emit('send-msg');
    socket.on('chat-msg',(data)=>{
    myio.emit(data.receiverId,data);
    })
    socket.join(socket.rooms);
    socket.emit('let-typing');
    socket.on('typing',(data)=>{
    socket.to(socket.rooms).broadcast.emit('typing-emit',data);
    })
})
}
module.exports={
    setserver:setserver
}
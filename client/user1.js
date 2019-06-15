const socket=io('http://localhost:3600');
const authToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTI5MjU5NTQ4MjQsImV4cCI6MTU1MzAxMjM1NCwic3ViIjoiVGVzdCIsImRhdGEiOnsidXNlcklkIjoiMU9naGR6bVNEIiwiZmlyc3ROYW1lIjoiQXJuYWIiLCJsYXN0TmFtZSI6IkR1dHRhIiwiZW1haWwiOiJtbmJAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo3ODksImNyZWF0ZWRPbiI6IjIwMTktMDMtMTNUMTA6NDg6NTQuMDMxWiIsInZpZXciOjAsImtleSI6IiIsIl9pZCI6IjVjODhlMDE2ZmI5MTA2MmIzNDk0MGE3NyIsIl9fdiI6MH19.yx-hZ82913iMZsxwsXH-ik-1jVsT3KFohsbxXqjXpX4";

const userId='1OghdzmSD';
let mydata={
    fullName:'Arnab Dutta',
    userId:userId,
    receiverName:'Avishek Das',
    receiverId:'YViG2AMu2',
}

let chatsocket=()=>{
    socket.on('verifyuser',(data)=>{
        console.log(data);
        socket.emit('set-user',authToken);
    })
socket.on('user',(data)=>{
    console.log('Your current status');
    console.log(data);
})
socket.on('send-msg',()=>{
    $('#send').click(function(){
    let mymessage=$('#messageToSend').val();
    //console.log(mymessage);
    mydata.message=mymessage;
    socket.emit('chat-msg',mydata);
    })
})
socket.on(userId,(data)=>{
    console.log(`You received a message from ${data.fullName}`);
    console.log(`${data.message}`);
})
socket.on('let-typing',()=>{
    $('#messageToSend').keypress(function(){
        socket.emit('typing',mydata.fullName);
    })
})
socket.on('typing-emit',(data)=>{
    console.log(`${data} is typing`);
})

}
chatsocket();
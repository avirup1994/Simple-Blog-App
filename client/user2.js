const socket=io('http://localhost:3600');
const authToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTI5MjYxMjQxNzgsImV4cCI6MTU1MzAxMjUyNCwic3ViIjoiVGVzdCIsImRhdGEiOnsidXNlcklkIjoiWVZpRzJBTXUyIiwiZmlyc3ROYW1lIjoiQXZpc2hlayIsImxhc3ROYW1lIjoiRGFzIiwiZW1haWwiOiJ4eXpAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo3ODksImNyZWF0ZWRPbiI6IjIwMTktMDMtMTBUMDc6NDM6MjAuNDgwWiIsInZpZXciOjAsImtleSI6IiIsIl9pZCI6IjVjODRjMDE4YTBkYTYyMWFiNDZjYmM0OCIsIl9fdiI6MH19.VXNqkeF4V_pks-XlKj-p-ZKDP5tJuCN2wTS6bgaWquQ";

const userId='YViG2AMu2';
let mydata={
    fullName:'Avishek Das',
    userId:userId,
    receiverName:'Arnab Dutta',
    receiverId:'1OghdzmSD',
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
    $('#send').on('click',function(){
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
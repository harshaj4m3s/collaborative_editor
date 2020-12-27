
const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('editor1');
//const messageForm = document.getElementById('send-container');
//const messageInput = document.getElementById('message-input');
// is user is active on tab or not
//var windowActive = true ;
// to count unread messages
//var unread = 0;
//var name;
if(messageForm != null){
    let name = prompt('Type your nick name.' , '');
    // checking the name entered must be not empty string
    while(true){
        if(name === '' || name == null || name == undefined){
            name = prompt('enter name whose length greater than 1');
        }else if( name.indexOf(' ') >= 0 ){
            name = prompt('name must not contain spaces');
        }else if(name.includes('/')){
            name = prompt('name must not contain /');
        }else{
            break;
        }
    }

    // setting the room name in the chat-box header
    

    // emitting that u have joined in to room
    socket.emit('new-user',roomName,name);
}


// for storing socket id
let mysocketid ;
socket.on('myid',myid => {
    mysocketid = myid;
});


socket.on('datafromfirstuser' , data => {
    document.getElementById('editor1').innerHTML = data;
});


socket.on('user-connected',(name  , id )=> {
    //appendMessage( name , 'left' , ` connected`);
    if(mysocketid != id){
        let data = document.getElementById('editor1').innerHTML;
        socket.emit('previous-content',roomName , data);
    }
})

socket.on('user-disconnected',name => {
    appendMessage( name , 'left',`disconnected`);
})



  





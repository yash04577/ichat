const socket = io();
const input_message = document.getElementById("input_message");
const send_btn = document.getElementById("send_btn");

const message_container = document.getElementsByClassName("message_container")[0];
let uname;

// do{

//     uname = prompt("enter your name");
// }while(!uname)

input_message.addEventListener('keyup', (e)=>{
    if(e.key === "Enter"){
        // console.log(e.target.value);
        send_msg(e.target.value);
    }
})

send_btn.addEventListener('click', ()=>{
    
    send_msg(input_message.value);
    
})

function send_msg(msg){
    let message = {
        user : uname,
        msg : msg
    }

    appendmsg(message, "message_outgoing");
    socket.emit('message', message);
}


function appendmsg(message, type){
    let main_div = document.createElement('div');
    main_div.classList.add(type);
   
    if(type == "message_incoming"){
        let markup = `
        <div class="sender">${message.user}</div>
        <div class="message_text">${message.msg}</div>
        `
        main_div.innerHTML = markup;
        message_container.appendChild(main_div);
        console.log(message.user);
        scrollToBottom();
    }

    else{
        let markup = `
        <div class="message_text">${message.msg}</div>
        `
        main_div.innerHTML = markup;
        message_container.appendChild(main_div);
        console.log(message.user);
        scrollToBottom();
    }
    scrollToBottom();

}

function scrollToBottom(){
    message_container.scrollTop = message_container.scrollHeight;

}

socket.on('message', (msg) => {
    appendmsg(msg, "message_incoming")
    scrollToBottom();
})
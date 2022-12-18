const socket = io();
const send_btn = document.getElementById("send_btn");

const message_container = document.getElementsByClassName("message_container")[0];
let uname;

do{

    uname = prompt("enter your name");
}while(!uname)

send_btn.addEventListener('keyup', (e)=>{
    if(e.key === "Enter"){
        console.log(e.target.value);
        send_msg(e.target.value);
    }
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
    }

    else{
        let markup = `
        <div class="message_text">${message.msg}</div>
        `
        main_div.innerHTML = markup;
        message_container.appendChild(main_div);
    }

   
   
}

socket.on('message', (msg) => {
    appendmsg(msg, "message_incoming")
})
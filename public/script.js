const room = window.location.pathname.replace(/\//g, '')
console.log(room)
const socket = io(`http://localhost:3000/${room}`)


socket.on('array_msgs', (all_messages)=>{
    
    const {array} = all_messages

    updateMessages(array)

})

function updateMessages(messages){

    let chat = ''

    messages.forEach(message=>{
        chat += `<div id="message">
                        <h4>${message.user}</h4>
                            <p>${message.message}</p>
                    </div>`
    })

        

    const div_chat = document.querySelector('#div_all_messages')

    div_chat.innerHTML = chat

}



document.addEventListener('DOMContentLoaded', ()=>{
    let user_to_send = ''
    
    const form_message = document.querySelector('#form_message_id')

    form_message.addEventListener('submit', (event)=>{

        event.preventDefault()

        if(!user_to_send){
            alert('Preencha o campo "Seu Nome"')
            return
        }

        const message_to_send = document.forms['form_message_name']['input_message_name'].value

        socket.emit('send_msg', {user: user_to_send, message: message_to_send})

        document.forms['form_message_name']['input_message_name'].value = ' '
    })

    const form_user = document.querySelector('#form_user_id')

    form_user.addEventListener('submit', (event_user)=>{

        event_user.preventDefault()

        user_to_send = document.forms['form_user_name']['input_user_name'].value

        form_user.style.display = 'none';
        form_message.style.display = 'block';
    })


})


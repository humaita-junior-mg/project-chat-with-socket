const socket = io('http://localhost:3000')

socket.on('all_messages', (messages)=>{

    const {docs} = messages

    updateMessages(docs)
})

function updateMessages(messages){

    let list_messages = '<ul>'

    messages.forEach(message=>{
        list_messages += `<li>${message}</li>`
    })

    list_messages += '</ul>'

    const div_messages = document.querySelector('#messages')

    div_messages.innerHTML = list_messages

}

document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('#message_form')

    form.addEventListener('submit', (event)=>{
        event.preventDefault()

        const message = document.forms['message_form_name']['message_input_name'].value

        /* or const message = document.forms.message_form_name.message_input_name.value */

        socket.emit('message_front_end', {msg: message})

        document.forms['message_form_name']['message_input_name'].value = ''
    })
})
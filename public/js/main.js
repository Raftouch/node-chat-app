const chatForm = document.getElementById('chat-form')
// const chatMessages = document.getElementById('chat-messages')

const socket = io()

socket.on('msg', (msg) => {
  console.log(msg)
  outputMessage(msg)

  // chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const msg = e.target.elements.msg.value
  socket.emit('chatMsg', msg)

  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

function outputMessage(msg) {
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `
  <p class="meta">Louis <span>9:15pm</span></p>
  <p class="text">
      ${msg}
  </p>
  `
  document.getElementById('chat-messages').appendChild(div)
}

const chatForm = document.getElementById('chat-form')

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const username = urlParams.get('username')
const room = urlParams.get('room')

const socket = io()

socket.emit('joinedRoom', { username, room })

socket.on('msg', (msg) => {
  console.log(msg)
  outputMessage(msg)
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
  <p class="meta">${msg.user} <span>${msg.time}</span></p>
  <p class="text">
      ${msg.text}
  </p>
  `
  document.getElementById('chat-messages').appendChild(div)
}

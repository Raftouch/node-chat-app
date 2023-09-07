const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatMsg = require('./utils/message')

require('dotenv').config()
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

const botName = 'Chat Bar'

io.on('connection', (socket) => {
  socket.emit('msg', formatMsg(botName, 'Welcome to Chat Bar'))
  socket.broadcast.emit('msg', formatMsg(botName, 'A user has joined the chat'))
  socket.on('disconnect', () => {
    io.emit('msg', formatMsg(botName, 'A user has left the chat'))
  })

  socket.on('chatMsg', (msg) => {
    io.emit('msg', formatMsg('User', msg))
  })
})

const start = () => {
  try {
    server.listen(port, () => console.log(`App listening on port ${port}`))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()

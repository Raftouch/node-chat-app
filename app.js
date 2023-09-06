const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

require('dotenv').config()
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
  socket.emit('msg', 'Welcome to Chat Bar')
  socket.broadcast.emit('msg', 'A user has joined the chat')
  socket.on('disconnect', () => {
    io.emit('msg', 'A user has left the chat')
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

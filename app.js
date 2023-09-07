const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatMsg = require('./utils/message')
const {
  userJoinedRoom,
  getCurrentUser,
  userLeftRoom,
  getRoomUsers,
} = require('./utils/user')

require('dotenv').config()
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

const botName = 'Chat Bar'

io.on('connection', (socket) => {
  socket.on('joinedRoom', ({ username, room }) => {
    const user = userJoinedRoom(socket.id, username, room)
    socket.join(user.room)

    socket.emit(
      'msg',
      formatMsg(botName, `Hi ${user.username}, welcome to Chat Bar!`)
    )

    socket.broadcast
      .to(user.room)
      .emit('msg', formatMsg(botName, `${user.username} has joined the chat`))
  })

  socket.on('chatMsg', (msg) => {
    const user = getCurrentUser(socket.id)

    io.to(user.room).emit('msg', formatMsg(user.username, msg))
  })

  socket.on('disconnect', () => {
    const user = userLeftRoom(socket.id)

    if (user) {
      io.to(user.room).emit(
        'msg',
        formatMsg(botName, `${user.username} has left the chat`)
      )
    }
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

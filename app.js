const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./server/api/user')
const videoRoutes = require('./server/api/video')
const commentRoutes = require('./server/api/comment')
const imageRoutes = require('./server/api/image')
const uploadRoutes = require('./server/api/upload')
const socket = require('socket.io')
const history = require('connect-history-api-fallback')
const env = process.env.NODE_ENV || 'development'

// const mongoConf = require('./mongo_conf')

// let dbUrl = mongoConf.mongoUrl

// connect db
if (env === 'development') {
  dbUrl = 'mongodb://localhost:27017/vnpastime'
}

mongoose.connect(dbUrl)
mongoose.Promise = global.Promise

const app = express()

app.set('tokenSecret', 'csgocoin')
app.use(bodyParser.json())

app.get('/', function(req, res){
  res.send('<h1>Welcome Realtime csgo coin flip</h1>');
});

app.use(history())

if (env !== 'development') {
  app.use(express.static('./dist'))
}

// 错误处理
app.use((err, req, res, next) => {
  res.status(442).send({ error: err.message })
})

const server = app.listen(4000, () => {
  console.log(`Express started in ${app.get('env')} mode on http://localhsot:4000`)
})

// socket setup
const io = socket(server)
let onlineUsers = []

io.on('connect', (socket) => {
  console.log('进入')
  socket.on('online', (user) => {
    if (onlineUsers.length > 0) {
      const onlineUser = onlineUsers.find(onlineUser => onlineUser.name === user.name)
      if (!onlineUser && user.name) {
        onlineUsers.push(user)
      }
    } else {
      if (user.name) {
        onlineUsers.push(user)
      }
    }
    socket.name = user.name
    // 向所有客户端发送
    io.sockets.emit('online', onlineUsers)

    socket.broadcast.emit('join', {
      name: user.name,
      type: 'join'
    })
  })

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data)
  })

  socket.on('disconnect', () => {
    const onlinUser = onlineUsers.find(onlinUser => onlinUser.name === socket.name)
    const index = onlineUsers.indexOf(onlinUser)
    onlineUsers.splice(index, 1)
    // 重新向所有客户端发送在线用户
    io.sockets.emit('online', onlineUsers)
    // 向除自己以外的客户端发送信息
    socket.broadcast.emit('user left', {
      name: socket.name,
      type: 'left'
    })
  })
})

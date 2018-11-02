const express = require('express')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const env = process.env.NODE_ENV || 'development'
const history = require('connect-history-api-fallback')

const app = express()

app.set('tokenSecret', 'csgocoin')
app.use(bodyParser.json())

app.get('/', function(req, res){
  res.send('<h1>Welcome Realtime csgo coin flip</h1>');
})

if (env !== 'development') {
  app.use(express.static('./dist'))
}

app.use(history())

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
  })


  let all_games = []
  socket.on('create game', function (data) {
  
    all_games.push({
        starter_id : data.starter_id
      }
    )

    socket.emit('game created', all_games);
  });

  socket.on('join game', function (data) {
    
    const this_game = all_games.find(game => game.id === data.id)

    this_game.joiner.name = data.joiner_name;
    this_game.joiner.probability = data.joiner_probability;

    socket.emit('game ready', this_game);
  });


  socket.on('disconnect', () => {
    console.log('li kai la')
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

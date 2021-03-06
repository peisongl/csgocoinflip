const express = require('express')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const env = process.env.NODE_ENV || 'development'
const history = require('connect-history-api-fallback')
const passport = require('passport');
const mongoose = require('mongoose');

// connect db
if (env === 'development') {
  dbUrl = 'mongodb://localhost:27017/csgocoinflip'
}

mongoose.connect(dbUrl)
mongoose.Promise = global.Promise

// const UserModel = require('./server/models/users');
// const user = UserModel.create({ email: 'sdfsdf', password: '23424234lksdjflk' });
// console.log(user)


require('./passport')

const app = express()

app.set('tokenSecret', 'csgocoin')
app.use(bodyParser.json())

const authRoute = require('./server/api/auth');
const routes = require('./server/api/coinflip');

app.use(function(req, res, next) { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); }); 

app.use('/auth', authRoute);
app.use('/coinflip', passport.authenticate('jwt', { session : false }), routes );


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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});


// socket setup
const io = socket(server)
let onlineUsers = []
let all_games = []

io.on('connect', (socket) => {
  console.log('进入')
  socket.on('online', (user) => {
    console.log('adding user')
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
    console.log('adding user done')
    socket.name = user.name
    // 向所有客户端发送
    io.sockets.emit('online', onlineUsers);
    io.sockets.emit('current game', all_games);
  })

  socket.on('create game', function (data) {
    
    console.log("creating game now")
    all_games.push({
        game_id : data.game_id,
        starter_id : data.starter_id,
        joiner_id: "",
        ready: false,
        game_result : ""
      }
    );
    console.log("creating game done")
    io.sockets.emit('current game', all_games);
  });

  socket.on('join game', function (data) {

    console.log("joining game now");
    console.log(data.game_id);

    const this_game = all_games.find(game => game.game_id === data.game_id);

    console.log(this_game.game_id);

    this_game.joiner_id = data.joiner_id;
    this_game.ready = true;

    io.sockets.emit('current game', all_games);
    // socket.emit('game ready', this_game);
  });

  socket.on('game result', function (data) {
    console.log("updating game result now");

    const this_game = all_games.find(game => game.game_id === data.game_id);

    this_game.game_result = data.game_result;
    // store game history
    all_games.indexOf(this_game)

    all_games.splice(index, 1)

    io.sockets.emit('current game', all_games);
    // socket.emit('game ready', this_game);
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

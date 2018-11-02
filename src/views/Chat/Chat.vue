<template>
  <div class="gamelist">
      <div class="games">
        <Loading v-show="!games.length > 0"></Loading>
        <GameItem v-for="(game, index) in games" 
          :video="game" 
          :key="index">
        </GameItem>
      </div>
      <Pagination v-show="games.length"></Pagination>
      <AppFooter v-show="games.length"></AppFooter>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'
import { start } from 'repl';
export default {
  data () {
    return {
      scoket: {},
      // 在线用户
      status: "",
      games: []
    }
  },
  created () {
    let url = 'www.xxxuthus.cn'
    if (process.env.NODE_ENV === 'development') {
      url = 'http://localhost:4000'
    }
    this.socket = io.connect(url)
  },
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  methods: {
    startGame(game){
      console.log("game ready to play")
    },

    createGame(){
      if (this_status == 'oneline'){
        this.socket.emit('create game', {
        starter_name : this.socket_name,
        starter_probability : this.socket_probability
      })} 
      else {
        console.log("user has to be online to create game")
      }
    },

    joinGame(game_id){
      if (this_status == 'oneline'){
        this.socket.emit('join game', {
        game_id : game_id,
        joiner_name : this.socket_name,
        joiner_probability : this.socket_probability
      })} else {
        console.log("user has to be online to join game")
      }
    }
  },

  watch: {
    messages () {
      this.$nextTick(() => {
        const { chatMessage } = this.$refs
        chatMessage.scrollTop = chatMessage.scrollHeight
      })
    }
  },

  mounted () {
    this.$store.state.isHome = false

    // 给客户端发送进入聊天室用户信息
    this.socket.emit('online', {
      name: this.user.name,
      probability: this.user.probability,
    })

    this.socket.on('game ready', (game) => {
      startGame(game)
    })

    this.socket.on('game created', (games) => {
      this.games = games
    })

    // 监听在线用户
    this.socket.on('online', (onlineUsers) => {
      this.onlineUsers = onlineUsers,
      this.status = 'online'
    })

    // 监听用户离开
    this.socket.on('user left', (data) => {
     console.log('user left')
    })

    this.socket.on('disconnect', function () {
      console.log('you have been disconnected')
    })
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/mixins.scss";
.gamelist {
  font-size: 1rem;
  @include stickFooter;
  width: 100%;
  position: relative;
  background-image: url('https://1x.com/images/user/6872df05db6242eb3f61f8f1e646deb3-hd2.jpg');
  background-repeat: no-repeat;
  background-size: 100% 28.125rem;
  @include mediaQ(480px) {
    background-size: 100% 15rem;
  }
  @include mediaQ(768px, 481px) {
    background-size: 100% 25rem;
  }
  @include mediaQ(960px, 769px) {
    background-size: 100% 25rem;
  }
}
.games {
  padding-top: 33rem;
  padding-bottom: 3rem;
  width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-flow: wrap;
  @include mediaQ(480px) {
    padding-top: 15rem;
  }
  @include mediaQ(768px, 481px) {
    padding-top: 27rem;
  }
  @include mediaQ(960px, 769px) {
    padding-top: 27rem;
  }
  @include mediaQ(1365px, 961px) {
    padding-top: 30rem;
  }
  @include mediaQ(1365px) {
    justify-content: space-around;
    width: 90%;
  }
}
</style>
<template>
  <div class="game_section">

    <h1> CSGO COIN FLIP</h1>
    
    <div id="action-button">
      <input id="create_game" type="button" value="creategame" @click='createGame' />
    </div>
    
    <div class="gamelist">
      <div class="games">
          <GameItem v-for="(game, index) in games" 
            :game="game" 
            :key="index">
          </GameItem>
      </div>
     </div>
    
  </div>
</template>

<script>
import GameItem from '../../components/Game/GameItem'

import io from 'socket.io-client'
import { start } from 'repl';
export default {
  components: {
    GameItem
  },
  data () {
    return {
      // 在线用户
      // why no socket
      games: []
    }
  },
  created () {
    let url = 'www.xxxuthus.cn'
    if (process.env.NODE_ENV === 'development') {
      url = 'http://localhost:4000'
    }
    console.log("created function")
    this.socket = io.connect(url)
  },
  methods: {
    startGame(game){
      console.log("game ready to play")
    },

    createGame(){
        this.socket.emit('create game', {
        game_id: this.socket.id,
        starter_id : this.socket.id
      })} ,

    joinGame(game_id){
        this.socket.emit('join game', {
        game_id : this.socket.id,
        joiner_name : this.socket.id
      })}
    },

  watch: {
    games () {
      this.$nextTick(() => {

      })
    }
  },

  mounted () {

    // 给客户端发送进入聊天室用户信息
    this.socket.emit('online', {
      name: this.socket.id
    })

    this.socket.on('game ready', (game) => {
      startGame(game)
    })

    this.socket.on('current game', (games) => {
      this.games = games
    })

    // 监听在线用户
    this.socket.on('online', (onlineUsers) => {
      this.onlineUsers = onlineUsers
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

<style>

</style>
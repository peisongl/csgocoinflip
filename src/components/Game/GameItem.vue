<template>
  <div class="game">
    <h1>{{ game.starter_id }}</h1>
    <button :id="game.starter_id" type="hidden" @click="emitJoinGameID">Join Game</button>
  </div>
</template>

<script>
export default {
  props: ['game'],
  
  mounted () {
      // this.showJoinGame()
  },

  methods: {
    showJoinGame(){
          console.log("show join game bottun")
          console.log(this.$props.game.joiner_id)
          if(this.$props.game.joiner_id == "") {
              document.getElementById(this.$props.game.starter_id).style.display = 'block'; 
          } else {
              document.getElementById(this.$props.game.starter_id).style.display = 'none';
        }

      },

    emitJoinGameID(){
      console.log("child join game clicked")
      this.$emit("emitJoinGameID", this.$props.game.game_id)
    }
  },

  watch: { 
      game: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.showJoinGame()
    }

  }
}
</script>

<style>
</style>
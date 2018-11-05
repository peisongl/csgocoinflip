<template>
  <div class="game">
    <h1>{{ game.starter_id }}</h1>
    <button :id="game.starter_id" type="hidden">Join Game</button>
  </div>
</template>

<script>
export default {
  props: ['game'],
  
  mounted () {
      this.showJoinGame()
  },

  methods: {
  showJoinGame(){
        if('joiner_id' in this.$props.game) {
            document.getElementById(this.$props.game.starter_id).style.display = 'none'; 
        } else {
            document.getElementById(this.$props.game.starter_id).style.display = 'block';
      }

    }
  }
}
</script>

<style>
</style>
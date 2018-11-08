<template>
  <div class="game">
    <h1>{{ game.starter_id }}</h1>
    <button :id="game.starter_id" type="hidden" @click="emitJoinGameID">Join Game</button>
    
    <div class="numberCircle" id="countdowntimer" v-show="this.$props.game.ready">10</div>

    <div id="displayImage" style="display:none">
      <img src="https://www.google.co.in/images/branding/googleg/1x/googleg_standard_color_128dp.png">
      <p>You got: <span id="result"></span></p>
    </div>

  </div>

  <!-- <b-container class="game">
    
    <b-row>
        <b-col> <h1>{{ game.starter_id }}</h1> </b-col>
        <b-col> 
            <b-button :size="sm" :variant="primary" :id="game.starter_id" type="hidden" @click="emitJoinGameID">Join Game</b-button> 

            <div class="numberCircle" id="countdowntimer" v-show="this.$props.game.ready">10</div>

            <div id="displayImage" style="display:none">
              <img src="https://www.google.co.in/images/branding/googleg/1x/googleg_standard_color_128dp.png">
              <p>You got: <span id="result"></span></p>
            </div>

        </b-col>
    </b-row>
</b-container> -->
</template>

<script>
export default {
  props: ['game'],
  
  mounted () {
      this.showJoinGame()
  },

  methods: {
    showJoinGame(){
          console.log("show join game bottun")
          console.log(this.$props.game.ready)
          if(!this.$props.game.ready) {
              document.getElementById(this.$props.game.starter_id).style.display = 'block'; 
          } else {
              document.getElementById(this.$props.game.starter_id).style.display = 'none';
        }

      },

    emitJoinGameID(){
      console.log("child join game clicked")
      this.$emit("emitJoinGameID", this.$props.game.game_id)
    },

    gameCountDown() {
      console.log("start countdown")

      var timeLeft = 9;
      var elem = document.getElementById('countdowntimer');
      var timerId = setInterval(countdown, 1000);

      function countdown() {
          if (timeLeft == -1) {
              clearTimeout(timerId);
              document.getElementById("countdowntimer").style="display:none";         
              document.getElementById("displayImage").style="display:block";
          } else {
              elem.innerHTML = timeLeft;
              timeLeft--;
          }
      }
    },

    playGame(){
      this.gameCountDown();

      var x = (Math.floor(Math.random() * 2) == 0);
      if(x) {
        var result = "starter"
        document.getElementById("result").innerHTML = result
      } else {
        var result = "joiner"
        document.getElementById("result").innerHTML = result
      }
      //send game result to server
      this.$emit("gameResult", {game_id : this.$props.game.game_id, res : result})
      // emit game result to parent game list
      // use diff game id
    }
  },

  watch: { 
      game: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.showJoinGame()
      if(this.$props.game.ready) {
          this.playGame()
      }
    }

  }
}
</script>

<style>

.numberCircle {
    border-radius: 80%;
  
    width: 36px;
    height: 36px;
    padding: 8px;
    
    background: #fff;
    border: 5px solid #228B22;
    color: #7FFF00;
    text-align: center;
    
    font: 32px Arial, sans-serif;
}

</style>
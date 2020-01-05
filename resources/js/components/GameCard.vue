<template>
  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="6">
    <vs-card>
      <div slot="header">
        <h2>Spiele</h2>
      </div>
      <vs-divider/>
      <div v-if="games.length > 0">
        <vs-row class="padding-left-m margin-top-m" :key="game.name" v-for="game in games" vs-justify="space-between" vs-align="center" :class="{active: (activeGame && game.name === activeGame.name)}">
          <vs-col vs-type="flex" vs-w="3">
            <b>{{game.name}}</b>
          </vs-col>
          <vs-col vs-type="flex" vs-w="2" vs-justify="flex-end">
            <vs-button color="success" type="gradient" icon="play_arrow" @click="select(game)"></vs-button>
          </vs-col>
        </vs-row>
      </div>
      <div v-else>
        <span><i>No games available yet...</i></span>
      </div>
      <div slot="footer">
        <vs-row vs-justify="flex-end">
            <div>
              <vs-button type="gradient" color="success" icon="add" @click="createGame()"></vs-button>
            </div>
          </vs-row>
      </div>
    </vs-card>
    <vs-popup title="New Game" :active.sync="showGameWindow">
      <vs-row vs-w="12">
        <vs-input label="Spielname" placeholder="New Game" v-model="newGame.name"/>
      </vs-row>
      <vs-row vs-w="12" class="margin-top-m">
        <vs-textarea label="Spielbeschreibung" v-model="newGame.description" />
      </vs-row>
      <vs-row vs-justify="flex-end">
        <vs-button type="gradient" color="success" @click="saveGame()">Erstellen</vs-button>
      </vs-row>
    </vs-popup>
  </vs-col>
</template>
<script>
export default {
  data () {
    return {
      newGame: {
        name: '',
        description: ''
      },
      showGameWindow: false
    };
  },
  mounted () {
    if (this.games.length === 0) {
      this.$store.dispatch('game/pull');
    }
  },
  computed: {
    games () {
      return this.$store.state.game.games;
    },
    activeGame () {
      return this.$store.state.activeGame;
    }
  },
  methods: {
    select (game) {
      this.$store.commit('setGame', game);
      this.$emit('gameSelected');
    },
    createGame ()  {
      this.showGameWindow = true;
    },
    saveGame () {
      if (this.newGame.name !== '') {
        this.$store.dispatch('game/create', this.newGame);
        this.newGame = {
          name: '',
          description: ''
        };
        this.showGameWindow = false;
      } else {

      }
    }
  }
}
</script>
<style lang="less">
.active {
  background-color: rgba(15, 200, 30, 0.6);
}
</style>
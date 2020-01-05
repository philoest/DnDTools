import Vue from 'vue'
import Vuex from 'vuex'
import inventory from './modules/inventory'
import game from './modules/game'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    activeUser: null,
    activeGame: null
  },
  mutations: {
    setUser (state, user) {
      if (user !== null)
        state.activeUser = user;
    },
    setGame(state, game) {
      if (game !== null) {
        state.activeGame = game;
      }
    }

  },
  modules: {
    inventory,
    game
  },
})
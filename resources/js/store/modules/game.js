export default {
  namespaced: true,
  state: {
    games: []
  },
  getters: {

  },
  mutations: {
    setGames (state, games) {
      state.games = games;
    },

    addGame (state, game) {
      state.games.push(game);
    }
  },
  actions: {
    pull ({commit, state})  {
      axios.get('/games/my').then(result =>  {
        commit('setGames', result.data.games);
      }).catch(e => {
        console.log(e);
      })
    },

    create({commit, state}, game) {
      axios.post('games/new', game).then(result => {
        if (result.data.status === 'success') {
          commit('addGame', game);
        }
      }).catch(e => {
        console.log(e);
      })
    }
  }
}
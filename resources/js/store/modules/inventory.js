export default {
  namespaced: true,
  state: {
    inventories: []
  },
  getters: {
  },
  actions: {
    newInventory ({ commit, state }, newInventory) {
      if (newInventory !== null && newInventory.name !== null) {
        axios.post('/inventory/new', newInventory).then(result => {
          commit('addInventory', result.data.inventory);
        }).catch(error => {
          console.log(error);
        })
      }
    },
    pull ({commit, state}, game_id) {
      axios.get('/inventory/allFromGame', {
        params: {
          game_id: game_id
        }
      }).then(result => {
        if (result.data.status === 'success') {
          result.data.inventories.forEach(inventory => {
            commit('addInventory', inventory);
          });
        }
      }).catch(e => {
        console.log(e);
      });
    },
    newItem ({commit, state}, newItem) {
      axios.post('/item/new', newItem).then(result => {
        if (result.data.status === 'success') {
          console.log(result.data.item)
          commit('addItem', result.data.item);
        }
      })
    }

  },
  mutations: {
    addItem (state, newItem) {
      let found = false;
      state.inventories.forEach(inventory =>  {
        if (inventory.id === newItem.inventory_id) {
          inventory.items.push(newItem);
          found = true;
        }
      });
      if (!found) {
        console.log('Item couldn\'t be added...');
      }
    },
    addInventory (state, newInventory) {
      state.inventories.push(newInventory)
    }
  }
}
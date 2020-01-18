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
          commit('addItem', result.data.item);
        }
      })
    },
    itemIncrease ({commit, state}, item) {
      item.count++;
      axios.post('/item/update', item).then(result =>  {
        if (result.data.status !== 'success') {
          item.count--;
          console.log(result.data.message);
        }
      }).catch(e => {
        item.count--;
        console.log(e);
      });
    },
    itemDecrease ({commit, state}, params) {
      let item = params.item;
      let amount = params.amount;
      
      item.count -= amount;
      if (item.count <= 0) {
        axios.post('/item/delete', item).then(result =>  {
          if (result.data.status !== 'success') {
            item.count += amount;
            console.log(result.data.message);
          } else {

            for (let inventory of state.inventories) {
              if (inventory.id === item.inventory_id) {
                for (let index in inventory.items) {
                  if (item.id === inventory.items[index].id) {
                    inventory.items.splice(index, 1);
                  }
                }
              }
            }
          }
        }).catch(e => {
          item.count += amount;
          console.log(e);
        });
      } else {
        axios.post('/item/update', item).then(result =>  {
          if (result.data.status !== 'success') {
            item.count += amount;
            console.log(result.data.message);
          }
        }).catch(e => {
          item.count += amount;
          console.log(e);
        });
      }
    }

  },
  mutations: {
    addItem (state, newItem) {
      let found = false;
      let index = 0;
      while (!found && index < state.inventories.length) {

        if (state.inventories[index].id === newItem.inventory_id) {
          state.inventories[index].items.push(newItem);
          found = true;
        }

        index++;
      }
      
      if (!found) {
        console.log('Item couldn\'t be added...');
      }
    },
    addInventory (state, newInventory) {
      state.inventories.push(newInventory)
    }
  }
}
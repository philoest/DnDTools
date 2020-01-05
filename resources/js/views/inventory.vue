<template>
  <div>
    <h2>Inventar-Management</h2>
    <div class="margin-top-m" v-if="activeGame">
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-xs="12" vs-sm="12" vs-lg="6" :key="inventory.title" v-for="inventory in inventories" class="padding-s">
          <vs-card>
            <div slot="header">
              <h3>
                {{inventory.title}}
              </h3>
            </div>
            <div>
              <span>{{inventory.description}}</span>
            </div>
            <vs-divider/>
            <div>
              <vs-table stripe :data="inventory.items">
                <template slot="header">
                  <h3>
                    Items
                  </h3>
                </template>
                <template slot="thead">
                  <vs-th>
                    Name
                  </vs-th>
                  <vs-th>
                    Anzahl
                  </vs-th>
                  <vs-th>
                    Gewicht
                  </vs-th>
                  <vs-th>
                    Aktionen
                  </vs-th>
                </template>

                <template slot-scope="{data}">
                  <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                    <vs-td :data="data[indextr].name">
                      {{data[indextr].name}}
                    </vs-td>

                    <vs-td :data="data[indextr].anzahl">
                      {{data[indextr].count}}
                    </vs-td>

                    <vs-td :data="data[indextr].gewicht">
                      {{data[indextr].weight}} lb.
                    </vs-td>

                    <vs-td>
                      <vs-button color="warning" type="gradient" icon="remove" @click="decrease(data, indextr)"></vs-button>
                      <vs-button class="margin-left-s" color="success" type="gradient" icon="add" @click="increase(data[indextr])"></vs-button>
                      <vs-button class="margin-left-s" color="danger" type="gradient" icon="delete" @click="remove(data, indextr)"></vs-button>
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
            <div slot="footer">
              <vs-row vs-justify="space-between">
                <div>
                  <span>Gesamtgewicht: {{gewicht(inventory.items)}} lb.</span>
                </div>
                <div>
                  <vs-button type="gradient" color="success" icon="add" @click="newItem(inventory.id)"></vs-button>
                  <vs-button class="margin-left-s" type="gradient" color="warning" icon="settings"></vs-button>
                </div>
              </vs-row>
            </div>
          </vs-card>
        </vs-col>
        <vs-col vs-type="flex" vs-xs="12" vs-sm="12" vs-lg="6" class="padding-s" vs-justify="center" vs-align="center">
          <span class="pointer" @click="newInventory()">
            <vs-icon icon="add" size="large"></vs-icon>
          </span>
        </vs-col>
      </vs-row>
    </div>
    <div class="margin-top-m" v-else>
      <vs-row vs-justify="center">
        <game-card v-on:gameSelected="pullInventory()"></game-card>
      </vs-row>
    </div>
    <vs-popup :title="(item && item.name !== '') ? item.name :'Neuer Gegenstand'" :active.sync="showItemPopup">
      <vs-row vs-w="12">
        <vs-input label="Gegenstandsname" v-model="item.name"/>
      </vs-row>
      <vs-row vs-w="12" class="margin-top-m">
        <vs-textarea label="Gegenstandsbeschreibung" v-model="item.description" />
      </vs-row>
      <vs-row vs-w="12" class="margin-top-m">
        <vs-input label="Gegenstandstyp" v-model="item.type"/>
      </vs-row>
      <vs-row vs-w="12" class="margin-top-m">
        <vs-input label="Gegenstandswert" v-model="item.value"/>
      </vs-row>
      <vs-row vs-w="12" class="margin-top-m">
        <vs-input label="Gegenstandsgewicht (lb.)" type="number" v-model="item.weight"/>
      </vs-row>
      <vs-row vs-w="12" class="margin-top-m">
        <vs-input label="Gegenstandsanzahl" type="number" v-model="item.count"/>
      </vs-row>
      <vs-row vs-justify="flex-end">
        <vs-button type="gradient" color="success" @click="saveItem()">Erstellen</vs-button>
      </vs-row>
    </vs-popup>
    <vs-popup :title="(inventory && inventory.title !== '') ? inventory.title :'Neues Inventar'" :active.sync="showInventoryPopup">
      <vs-row vs-w="12">
        <vs-input label="Inventartitel" v-model="inventory.title"/>
      </vs-row>
      <vs-row vs-w="12" class="margin-top-m">
        <vs-textarea label="Inventarbeschreibung" v-model="inventory.description" />
      </vs-row>
      <vs-row vs-justify="flex-end">
        <vs-button type="gradient" color="success" @click="saveInventory()">Erstellen</vs-button>
      </vs-row>
    </vs-popup>
  </div>
</template>
<script>
import gameCard from "../components/GameCard.vue";

export default {
  data () {
    return {
      showItemPopup: false,
      showInventoryPopup: false,
      item: {
        name: ''
      },
      inventory: {
        title: ''
      }
    }
  },
  components: {
    gameCard,
  },
  mounted () {
    // pull the inventories when their are none found yet
    if (this.activeGame && this.inventories.length === 0) {
      this.pullInventory();
    }
    this.resetItem();
  },
  computed: {
    inventories ()  {
      return this.$store.state.inventory.inventories;
    },
    gewicht (items) {
      return items => {
        let sum = 0;
        for (let item of items) {
          sum += item.weight * item.count;
        }
  
        return sum;
      }
    },
    activeGame () {
      return this.$store.state.activeGame;
    }
  },
  methods: {
    increase (item) {
      item.count++;
    },
    decrease (items, index, amount = 1) {
      items[index].count -= amount;
      if (items[index].count <= 0) {
        this.$delete(items, index);
      }
    },
    remove (items, index) {
      this.decrease(items, index, items[index].count);
    },
    pullInventory () {
      this.$store.dispatch('inventory/pull', this.activeGame.id);
    },
    newItem (inventoryID) {
      this.resetItem();
      this.showItemPopup = true;
      this.item.inventory_id = inventoryID;
    },
    resetItem () {
      this.item = {
        name: '',
        description: '',
        inventory_id: 0,
        type: '',
        value: '',
        weight: 0,
        count: 1
      }
    },
    saveItem () {
      this.$store.dispatch('inventory/newItem', this.item);
      this.resetItem();
      this.showItemPopup = false;
    },
    newInventory () {
      this.resetInventory();
      this.showInventoryPopup = true;
    },
    resetInventory () {
      this.inventory = {
        title: '',
        description: '',
        game_id: this.activeGame.id
      }
    },
    saveInventory () {
      this.$store.dispatch('inventory/newInventory', this.inventory);
      this.resetInventory();
      this.showInventoryPopup = false;
    }
  }
}
</script>
<style lang="less">
</style>
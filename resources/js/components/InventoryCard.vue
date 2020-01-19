<template>
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

          </vs-th>
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
          <vs-tr :key="indextr" v-for="(tr, indextr) in data" 
                 v-bind:draggable="draggable" 
                 v-on:dragstart.native="startDrag(indextr)"
                 v-on:dragover.native="$event.preventDefault()"
                 v-on:drop.native="endDrag()">
            <vs-td>
              <span>
                <vs-icon class="drag-icon" icon="reorder" @mousedown="setDraggable()"></vs-icon>
              </span>
            </vs-td>
            <vs-td :data="tr.name">
              {{tr.name}}
            </vs-td>

            <vs-td :data="tr.count">
              {{tr.count}}
            </vs-td>

            <vs-td :data="tr.weight">
              {{tr.weight}} lb.
            </vs-td>

            <vs-td>
              <vs-button color="warning" type="gradient" icon="remove" @click="decrease(tr)"></vs-button>
              <vs-button class="margin-left-s" color="success" type="gradient" icon="add" @click="increase(tr)"></vs-button>
              <vs-button class="margin-left-s" color="danger" type="gradient" icon="delete" @click="remove(tr)"></vs-button>
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
          <vs-button type="gradient" color="success" icon="add" @click="newItem()"></vs-button>
          <vs-button class="margin-left-s" type="gradient" color="warning" icon="settings"></vs-button>
        </div>
      </vs-row>
    </div>
  </vs-card>
</template>
<script>

export default {
  props: ['inventory'],
  data () {
    return {
      draggable: false,
      dragItem: null,
      dragItemIndex: null
    }
  },
  computed: {
    gewicht (items) {
      return items => {
        let sum = 0;
        for (let item of items) {
          sum += item.weight * item.count;
        }
  
        return sum;
      }
    },
  },
  events: {
  },
  methods: {
    newItem () {
      this.$emit("new-item", this.inventory.id);
    },
    increase (item) {
      this.$store.dispatch('inventory/itemIncrease', item);
    },
    decrease (item, amount = 1) {
      this.$store.dispatch('inventory/itemDecrease', {item: item, amount: amount});
    },
    remove (item) {
      this.decrease(item, item.count);
    },
    setDraggable () {
      this.draggable = true;
    },
    startDrag (index) {
      this.dragItem = this.inventory.items[index];
      this.dragItemIndex = index;
    },
    endDrag () {
      this.inventory.items.push(this.dragItem);
      this.$delete(this.inventory.items, this.dragItemIndex);
      this.draggable = false;
    } 
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.drag-icon {
  cursor: pointer;
  font-size: 18px;
}
</style>
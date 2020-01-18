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
          <item-row :key="indextr" v-for="(tr, indextr) in data" :item="tr" />
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
import itemRow from "../components/ItemRow.vue"

export default {
  props: ['inventory'],
  data () {
    return {

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
  methods: {
    newItem () {
      this.$emit("new-item", this.inventory.id);
    }
  },
  components: {
    itemRow
  }
}
</script>
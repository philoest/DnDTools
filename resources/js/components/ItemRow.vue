<template>
  <vs-tr>
    <vs-td :data="item.name">
      {{item.name}}
    </vs-td>

    <vs-td :data="item.count">
      {{item.count}}
    </vs-td>

    <vs-td :data="item.weight">
      {{item.weight}} lb.
    </vs-td>

    <vs-td>
      <vs-button color="warning" type="gradient" icon="remove" @click="decrease(item)"></vs-button>
      <vs-button class="margin-left-s" color="success" type="gradient" icon="add" @click="increase(item)"></vs-button>
      <vs-button class="margin-left-s" color="danger" type="gradient" icon="delete" @click="remove(item)"></vs-button>
    </vs-td>
  </vs-tr>
</template>
<script>
export default {
  props: ['item'],
  methods: {
    increase (item) {
      this.$store.dispatch('inventory/itemIncrease', item);
    },
    decrease (item, amount = 1) {
      this.$store.dispatch('inventory/itemDecrease', {item: item, amount: amount});
    },
    remove (item) {
      this.decrease(item, item.count);
    },
  }
}
</script>
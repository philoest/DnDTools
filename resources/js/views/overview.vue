<template>
  <div>
    <h1>Überblick</h1>

    <vs-row>
      <game-card></game-card>
    </vs-row>
  </div>
</template>
<script>
import gameCard from '../components/GameCard.vue';

export default {
  data () {
    return {
    };
  },
  components:  {
    gameCard,
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="less">
</style>
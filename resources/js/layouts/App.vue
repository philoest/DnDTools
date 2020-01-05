<template>
  <div>
    <vs-navbar type="shadow" v-model="activeItem" class="nabarx">
      <div slot="title">
        <vs-navbar-title>
          DnD Tools
        </vs-navbar-title>
      </div>
      
      <div class="user-name-item" v-if="game === null">
        <span><i>No game selected...</i></span>
      </div>
      <div class="user-name-item" v-else>
        <span>{{game.name}}</span>
      </div>

      <vs-navbar-item index="0">
        <router-link class="flex-link" to="/home">
          <span>
            <vs-icon icon="dashboard" size="small"></vs-icon>
          </span>
          <span class="flex-link-text">
            Overview
          </span>
        </router-link>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <router-link  class="flex-link" to="/inventory">
          <span>
            <vs-icon icon="archive" size="small"></vs-icon>
          </span>
          <span class="flex-link-text">
            Inventar
          </span>
        </router-link>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <router-link class="flex-link" to="/characters">
          <span>
            <vs-icon icon="contacts" size="small"></vs-icon>
          </span>
          <span class="flex-link-text">
            Charaktere
          </span></router-link>
      </vs-navbar-item>
    </vs-navbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['puser'],
    data () {
      return {
        activeItem: 0
      }
    },
    mounted() {
      this.$store.commit('setUser', JSON.parse(this.puser));

      // mark the correct Navbar Item as active
      switch (this.$route.name) {
        case 'overview':
          this.activeItem = 0;
          break;
        case 'inventory':
          this.activeItem = 1;
          break;
        case 'characters':
          this.activeItem = 2;
          break;
      }
    },
    computed: {
      user () {
        return this.$store.state.activeUser;
      },
      game () {
        return this.$store.state.activeGame;
      }
    }
  }
</script>
<style lang="less">

html {
  font-size: 18px;
}
.container {
  max-width: 940px;
  padding: 0 20px;
  margin: 20px auto;
}

.user-name-item {
  align-self: center;
  justify-self: center;
  margin: auto 40px;
}

a.flex-link {
  display: flex;
  align-items: center;

  .flex-link-text {
    margin-left: 5px;
  }
}

@media (max-width: 800px) {
  .user-name-item {
    display: none;
  }
}
</style>

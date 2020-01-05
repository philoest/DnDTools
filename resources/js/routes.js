import Vue from 'vue';
import VueRouter from 'vue-router';

import Overview from './views/overview.vue';
import Inventory from './views/inventory.vue';
import Characters from './views/characters.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'overview',
      component: Overview
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: Inventory
    }, 
    {
      path: '/characters',
      name: 'characters',
      component: Characters
    }
  ]
})

export default router;
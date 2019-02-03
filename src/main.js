import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import store from './store/store.js';
import { routes } from './routes';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'https://stocktrader-f457a.firebaseio.com/';

Vue.filter('currency', value => {
  return '$' + value.toLocaleString();
})

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

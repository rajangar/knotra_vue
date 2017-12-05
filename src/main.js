// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import BootstrapVue from 'bootstrap-vue';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

// import socketio from 'socket.io'
import VueSocketIO from 'vue-socket.io'

// export const SocketInstance = socketio('http://localhost:3000')

Vue.use(VueSocketIO, 'http://localhost:3000')

// Vue.use(BootstrapVue);

Vue.config.productionTip = false

// Require dependencies
// var Vue = require('vue');
var VueCookie = require('vue-cookie')
// Tell Vue to use the plugin
Vue.use(VueCookie)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

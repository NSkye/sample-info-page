import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import 'normalize.css'

Vue.use(Vuex)

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App)
})

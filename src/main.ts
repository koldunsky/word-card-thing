import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  beforeCreate () {
    this.$store.commit('initializeStore')
    if (this.$store.state.currentWord.id === '') {
      this.$store.commit('setRandomWordAsCurrent')
    }
  }
}).$mount('#app')

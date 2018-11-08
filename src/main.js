import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import BootstrapVue from 'bootstrap-vue'

// Vue.use(BootstrapVue);
Vue.config.productionTip = false

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  components: { App },
  render: h => h(App)
}).$mount('#app')
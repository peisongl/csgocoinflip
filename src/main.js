import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
// import BootstrapVue from 'bootstrap-vue'

// Vue.use(BootstrapVue);
Vue.config.productionTip = false

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'


// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) { // 如果需要权限
//     if (store.getters.token) { // 存在的话，直接跳转过去
//       console.log("with token")
//       console.log(store.getters.token)
//       console.log(store.getters.token.id)
//       next()
//     } else {
//       console.log("no token")
//       next({ path: '/signin' })
//       // store.commit('SHOW_SIGN_DIALOG')
//     }
//   } else {
//     next()
//   }
// })

new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app')
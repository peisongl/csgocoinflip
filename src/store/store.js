import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: { // 登录者信息
      _id: '',
      email: ''
    },
    // 判断是登入还是注册
    signType: 'signin',
    token: localStorage.getItem('token'),
    message: {}
  },
  mutations,
  actions,
  getters
  // plugins: [createPersistedState()]
})

export default store
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: { // 登录者信息
      name: '',
      id: ''
    },
    // 判断是登入还是注册
    signType: 'signin',
    message: {}
  },
  mutations,
  actions,
  getters
})

export default store
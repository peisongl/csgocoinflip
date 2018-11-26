import * as types from './mutations-type'
import { fetchUserById } from '../api/user'

const mutations = {

  // 将用户信息添加至状态
  [types.SET_SIGNIN_USER] (state, data) {
    state.user = data
  },
  // 登出
  [types.SET_USER_OUT] (state) {
    // 显示菜单的时候是将这个字段作为判断，
    state.token = ''
  },
  // 弹出登录框
  [types.SHOW_SIGN_DIALOG] (state) {
    state.showSignDialog = true
    // state.showSignin ? state.showSignin = false : state.showSignin = true
  },
  // 关闭登录框
  [types.CLOSE_SIGN_DIALOG] (state) {
    state.showSignDialog = false
  },
  // 保存token
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_MESSAGE] (state, message) {
    state.message = message
  },
  // 获取用户信息，显示主页
  [types.FETCH_USER_INFO] (state, id) {
    fetchUserById(id).then(res => {
      state.userInfo = res.data
    })
  }
}

export default mutations
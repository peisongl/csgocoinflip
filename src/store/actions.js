import * as types from './mutations-type'
import { loginByUsername, signupByUsername } from '../api/user'

const actions = {
  // 用户登录
  [types.SIGN_BY_USERNAME] ({ commit }, formInfo) {
    return new Promise((resolve, reject) => {
        loginByUsername(formInfo.username.trim(), formInfo.password).then((res) => {
        const data = res.data
        // 后台有返回这个字段,success为ture
        commit('SET_SIGNIN_USER', data.body)
        localStorage.setItem('token', data.token)
        commit('SET_TOKEN', data.token)
        resolve(data.success)

      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取登录用户信息
  [types.SIGNUP_BY_USERNAME] ({commit}, formInfo) {
    signupByUsername(formInfo.username.trim(), formInfo.password).then(res => {
    //   const data = res.data
    //   commit('SET_SIGNIN_USER', data)
    })
  }
}

export default actions
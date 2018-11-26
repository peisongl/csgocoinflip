import Vue from 'vue'
import Router from 'vue-router'

const GameList = resolve => require(['../views/Gamelist/GameList'], resolve)
const Signin = resolve => require(['../views/Signin/Signin'], resolve)

const Signup = resolve => require(['../views/Signup/Signup'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/coinflip',
      name: 'Game',
      component: GameList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
    
  ]
})
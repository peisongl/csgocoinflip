import Vue from 'vue'
import Router from 'vue-router'

const GameList = resolve => require(['../views/Gamelist/GameList'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Game',
      component: GameList,
      meta: {
        requireAuth: true
      }
    } 
  ]
})
import Vue from 'vue'
import Router from 'vue-router'

const Chat = resolve => require(['views/chat/Chat'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      meta: {
        requireAuth: true
      }
    } 
  ]
})
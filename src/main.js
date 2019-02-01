import Vue from 'vue'
import App from './App.vue'
import './plugins/vuetify'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Search from './components/Search.vue';
import Report from './components/Report.vue';

const routes = [
  { path: '/search', component: Search, name: 'search' },
  { path: '/report/:teamKey', component: Report, name: 'report' }
]

// 3. `routes` 옵션과 함께 router 인스턴스를 만드세요.
// 추가 옵션을 여기서 전달해야합니다.
// 지금은 간단하게 유지하겠습니다.
const router = new VueRouter({
  routes // `routes: routes`의 줄임
})

Vue.config.productionTip = false

Vue.prototype.$teamSelectorDict = [
      {
      index: "avatar",
      selector : "#con_tabs01 > div > a > div.search_photo_img > img",
      startAt: 0,
      attr : "src",
      limit : -1,
      },
      {
      index: "name",
      selector : "#con_tabs01 > div > a > div.search_contents > div",
      startAt: 0,
      attr : "text",
      limit : -1,
      },
      {
      index: "master",
      selector : "#con_tabs01 > div > a > div.search_contents > ul > li:nth-child(1)",
      startAt: 0,
      attr : "text",
      limit : -1,
      },
      {
      index: "link",
      selector : "#con_tabs01 > div > a",
      startAt: 0,
      attr : "href",
      limit : -1,
      },
    ]
Vue.prototype.$teamLink = "http://www.gameone.kr/club/info/player?club_idx="
Vue.prototype.$memberSelectorDict = [
  {
    index: "name",
    selector : "#sContent > div.s_content > div.scon_players._helix > ul > li > dl > form > dt",
    startAt: 0,
    attr : "text",
    limit : -1,
  },
  {
    index: "code",
    selector : "#sContent > div.s_content > div.scon_players._helix > ul > li > dl > form > dd > a",
    startAt: 0,
    attr : "href",
    limit : -1,
    },
]

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

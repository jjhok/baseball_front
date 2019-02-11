import Vue from 'vue'
import App from './App.vue'
import './plugins/vuetify'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

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


Vue.prototype.$years = []
for (let index = 2017; index < 2019; index++) {
  Vue.prototype.$years.push(index);
}

Vue.prototype.$labels = [
  "경기수", "타율", "타석", "타수", "득점", "총안타", "1루타", "2루타", "3루타", "홈런", "루타", "타점", "도루", "도루자", "희타", "희비", "볼넷", "고의4구", "사구", "삼진", "병살", "장타율", "출루율", "도루성공률", "멀티히트", "OPS", "BB/K", "장타/안타"
]

Vue.prototype.$recordDict = []
for (let index = 0; index < Vue.prototype.$labels.length; index++) {
  Vue.prototype.$recordDict.push(
    {
      index: Vue.prototype.$labels[index],
      selector : "#Content > div > div.c_content > div.pyMenu > div.py_content > div > div.recordwr > div.hitter_section.on > div > div.score_record > ul > li:nth-child(" + (index+1) +") > span.score",
      startAt: 0,
      attr : "text",
      limit : -1,
    },
  )  
}


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

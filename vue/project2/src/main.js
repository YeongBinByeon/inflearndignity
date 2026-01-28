import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './mixins'
import i18nPlugin from './plugins/i18n'
import en from './i18n/en'
import ko from './i18n/ko'
import PageTitle from './components/fragments/PageTitle.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faUserClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

library.add(faUserSecret)
library.add(faUserClock)
const i18nStrings = { en: en, ko: ko }

const app = createApp(App)
app.use(store)
app.use(router)
app.mixin(mixin)
app.component('page-title', PageTitle)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(i18nPlugin, i18nStrings)
app.directive('focus', {
  mounted(el, binding) {
    console.log(el) // 커스텀 디렉티브가 적용된 엘리먼트
    el.focus()
  }
})
app.directive('lowercase', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      console.log(event.target.value)
      event.target.value = event.target.value.toLowerCase()
    })
  }
})
app.directive('uppercase', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      console.log(event.target.value)
      event.target.value = event.target.value.toUpperCase()
    })
  }
})
app.directive('number', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      console.log(event.target.value)
      event.target.value = event.target.value.replace(/\D/g, '')
    })
  }
})
app.directive('korean', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      console.log(event.target.value)
      event.target.value = event.target.value.replace(
        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,
        ''
      )
    })
  }
})
app.mount('#app')

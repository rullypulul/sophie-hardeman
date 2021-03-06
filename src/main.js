import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './store'
import VueHead from 'vue-head'
import {format} from 'date-fns'

/**
 * Config
 */

Vue.config.productionTip = false

/**
* Plugins
*/

window.jQuery = window.$ = require('jquery')

Vue.use(VueHead)

/**
 * Filters
 */

Vue.filter('dotted', (date) => {
  return format(date, 'DD.MM.YYYY')
})

Vue.filter('temperature', (temp) => {
  if (temp > 0) return '+' + temp + '°c'
  else return temp + '°c'
})

/**
 * Initiation
 */

new Vue({ // eslint-disable-line no-new
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})

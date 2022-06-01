import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import less from 'less';
// 完整加载
import VueLuckyCanvas from '@lucky-canvas/vue'
import common from '../commonFunction/common.js';
import init from '../commonFunction/init.js';
Vue.use(Vant)
Vue.use(VueLuckyCanvas)
Vue.use(less)
Vue.prototype.common = common
Vue.prototype.init = init

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

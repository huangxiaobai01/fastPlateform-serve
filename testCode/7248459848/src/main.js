import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 公共样式
import '@/styles/index.scss'

Vue.config.productionTip = false

// element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入echartS图表
import '@/utils/initEcharts.js';
// vuescroll
import vuescroll from 'vuescroll';
Vue.use(vuescroll);
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
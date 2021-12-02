import Vue from 'vue'
// 按需引入echarts图表
//引入基本模板
let echarts = require('echarts/lib/echarts')
 
// 引入折线图等组件
require('echarts/lib/chart/line')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/graphic')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

Vue.prototype.$echarts = echarts
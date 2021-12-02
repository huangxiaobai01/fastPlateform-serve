<template>
  <div id="echarts" class="echarts"></div>
</template>

<script>
export default {
  name: 'EchartsExample',
  data() {
    return {
    }
  },
  mounted() {
    this.drapEcharts()
  },
  methods: {
    drapEcharts() {
      var charts = this.$echarts.init(document.getElementById('echarts'))
      const options = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
      charts.setOption(
        options,
        true
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.echarts {
  width: 40rem;
  height: 40rem
}
</style>
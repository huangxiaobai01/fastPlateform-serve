<template>
  <div>
    <div class="painDiv" id="painDiv">
      <div>
        <h1>截屏</h1>
        <p>
          HTMLcanvas是一个可以实现页面元素截屏的插件！
        </p>
      </div>
    </div>
    截屏图片：<img :src="showImg">
  </div>
</template>

<script>
 import html2canvas from "html2canvas";
export default {
  name: 'Html2canvasExample',
  data() {
    return {
      showImg: null
    }
  },
  mounted() {
    this.canvasDiv()
  },
  methods: {
    canvasDiv() {
      let _that = this
      html2canvas(document.getElementById('painDiv'), {
        backgroundColor: null
      }).then(function (dcanvas) {
        _that.showImg = dcanvas.toDataURL("png");
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.painDiv {
  padding: 2rem;
  &>div {
    width: 40rem;
    height: 40rem;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p {
      font-size: 2rem;
      color: #ddd
    }
  }
}
</style>
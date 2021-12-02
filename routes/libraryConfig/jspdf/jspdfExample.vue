<template>
  <div>
    <button @click="getPdf">生成pdf</button>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
export default {
  name: 'Jspdf',
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    getPdf() {
      let doc = new jsPDF('l', 'px', [1722, 969], true)
      const pageWidth = doc.internal.pageSize.getWidth();
      const imgHeight = doc.internal.pageSize.getHeight()
      const firstImg = require('./pdftest.png')
      doc.addImage(firstImg, 'JPEG', 0, 0, pageWidth, imgHeight)
      doc.addPage()
      let secondImg = require('./pdftest.png')
      doc.addImage(secondImg, 'JPEG', 0, 0, pageWidth, imgHeight)
      doc.save('pdf' + Math.random() + '.pdf');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
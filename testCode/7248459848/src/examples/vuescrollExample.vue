<template>
  <div class="content">
    <vue-scroll>
      <div class="test-div"></div>
    </vue-scroll>
  </div>
</template>

<script>
export default {
  name: 'VueScrollExample',
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
  height: 20rem;
  .test-div {
    height: 50rem;
    background-color: red;
  }
}
</style>
<template>
  <div class="hello">
    <div v-if="isLoggedIn">
      <h1>Dashboard</h1>
    </div>
    <div v-else>
      <h1>HomePage</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home Page'
    }
  },
  props: ['isLoggedIn']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
  <div class="hello">
      <h1>Search {{ query }}</h1>
      <h1> {{ searchString }} </h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Search',
  data () {
    return {
      searchString: [],
      errors: []
    }
  },
  props: [
    'query'
  ],
  created () {
    axios.get(`http://localhost:3000/api/getSearchFromProfile`, {
      params: {
        query: this.query
      }
    }).then(response => {
      this.searchString = JSON.stringify(response.data)
      console.log('3-searchString: ' + this.searchString)
    }).catch(e => {
      this.errors.push(e)
    })
  }
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
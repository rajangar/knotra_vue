<template>
  <div class="hello">
    <h1>Profile {{ userid }} {{ id }} </h1>
    <h1> {{ profileInfo }} </h1>
  </div>
</template>

<script>
import {HTTP} from '@/backend/index.js'
export default {
  name: 'Profile',
  data () {
    return {
      profileInfo: [],
      errors: []
    }
  },
  props: [
    'userid',
    'id',
    'cnt'
  ],
  async created () {
    if (this.id == '' && this.$cookie.get('userid') && this.$cookie.get('password') &&
    this.$cookie.get('id')) {
      this.id = this.$cookie.get('id')
    }
    HTTP.get(`getProfileById`, {
      params: {
        userid: this.userid,
        id: this.id
      }
    }).then(response => {
      this.profileInfo = JSON.stringify(response.data)
      console.log('3-profileInfo: ' + this.profileInfo)
    }).catch(e => {
      this.errors.push(e)
    })
  },
  watch: {
    cnt: function (val) {
      HTTP.get(`getProfileById`, {
        params: {
          userid: this.userid,
          id: this.id
        }
      }).then(response => {
        this.profileInfo = JSON.stringify(response.data)
        console.log('4-profileInfo: ' + this.profileInfo)
      }).catch(e => {
        this.errors.push(e)
      })
    }
  },
  async beforeUpdate () {
    /* if (this.id == '' && this.$cookie.get('userid') && this.$cookie.get('password') &&
    this.$cookie.get('id')) {
      this.id = this.$cookie.get('id')
    }
    HTTP.get(`getProfileById`, {
      params: {
        userid: this.userid,
        id: this.id
      }
    }).then(response => {
      this.profileInfo = JSON.stringify(response.data)
      console.log('4-profileInfo: ' + this.profileInfo)
    }).catch(e => {
      this.errors.push(e)
    }) */
  },
  methods: {
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
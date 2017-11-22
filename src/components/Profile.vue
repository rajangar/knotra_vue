<template>
  <div class="hello">
      <h1>Profile {{ userid }} {{ id }}</h1>
      <h1> {{ profileInfo }} </h1>
  </div>
</template>

<script>
import axios from 'axios'
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
    'id'
  ],
  async created () {
    if (this.id == '' && this.$cookie.get('userid') && this.$cookie.get('password')) {
        var userid = this.$cookie.get('userid')
        var password = this.$cookie.get('password')
        try {
            var response = await axios.get(`http://localhost:3000/api/getUserById`, {
                params: {
                    userid: userid,
                    password: password
                }
            })
            this.id = response.data.id
            axios.get(`http://localhost:3000/api/getProfileById`, {
                params: {
                    userid: this.userid,
                    id: this.id
                }
            }).then(response => {
                this.profileInfo = JSON.stringify(response.data)
                console.log('profileInfo: ' + this.profileInfo)
            })
        } catch(e) {
            this.errors.push(e)
        }
    } else if (this.id != '') {
        axios.get(`http://localhost:3000/api/getProfileById`, {
            params: {
                userid: this.userid,
                id: this.id
            }
        }).then(response => {
            this.profileInfo = JSON.stringify(response.data)
            console.log('2-profileInfo: ' + this.profileInfo)
        }).catch(e => {
            this.errors.push(e)
        })
    } else {
        axios.get(`http://localhost:3000/api/getProfileWithoutId`, {
            params: {
                userid: this.userid
            }
        }).then(response => {
            this.profileInfo = JSON.stringify(response.data)
            console.log('3-profileInfo: ' + this.profileInfo)
        }).catch(e => {
            this.errors.push(e)
        })
    }
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
<template>
  <div class="hello">
    <h1>Forgot Password:</h1>
    <form id="confirmform">
      <label id="labelEmail">Registered Email:</label>
      <br>
      <input type="text" id="email" v-bind:class="[email_highlight ? 'email_high' : '']" tabindex="1" v-model.lazy="email" @focus="correctEmail">
      <br>
      <div v-if="email_msg == 1">
        <small>Password sent on your email</small>
      </div>
      <div v-else-if="email_msg == 2">
        <small>Please check email, if it is correct and registered</small>
      </div>
      <br>
      <br>
      <button tabindex="1" id="confirm" type="submit" @click="confirm" :disabled="wait">Send On Email</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: '',
      email_highlight: false,
      wait: false,
      email_msg: 0,
      errors: []
    }
  },
  props: [
    'isLoggedIn'
  ],
  created () {
    if (this.$cookie.get('isLoggedIn') && this.$cookie.get('isLoggedIn') == "true") {
      this.$router.push('/')
    }
  },
  watch: {
    isLoggedIn: function (val) {
      console.log('logging: ' + val)
      if (val)
        this.$router.push('/')
    }
  },
  methods: {
    confirm: function (event) {
      event.preventDefault()
      if (this.email == '' || /[^a-zA-Z0-9_@.-]/.test(this.email)) {
          this.email_highlight = true
          return
      }
      this.wait = true
      this.$emit('setWaiting', true)
      axios.get(`http://localhost:3000/api/getPassword`, {
        params: {
          email: this.email
        }
      }).then(response1 => {
        if (response1.data.status == 'success') {
          this.$emit('setWaiting', false)
          this.email_msg = 1
          setTimeout(function () {
            this.email_msg = 0
            this.wait = false
            this.$router.push('/')
          }.bind(this), 2000)
        } else {
          this.email_msg = 2
          this.wait = false
          this.$emit('setWaiting', false)
          return
        }
      }).catch(e => {
        this.email_msg = 2
        this.wait = false
        this.$emit('setWaiting', false)
        this.errors.push(e)
      })
    },
    correctEmail: function () {
        this.email_msg = 0
        this.email_highlight = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

#hello {
    text-align: center;
}

small {
    display: inline-block;
    color: red;
    float: left;
}

#confirmform {
    display: inline-block;
    width: 40%;
}

#email {
    display: inline-block;
    width: 80%;
    line-height: 16px;
    font-weight: 400;
    font-size: 13px;
    height: 35px;
    /* margin: 0 0 0 20px; */
    padding: 0 10px;
    background: #d6d9dd;
    float: left;
}

#labelEmail {
    /* display: block; */
    float: left;
    /* margin: 20px 0 0 0; */
}

#confirm {
    margin: 10px 0 20px 20%;
    float: left;
    font-size: 17px;
    font-weight: 400;
    display: inline-block;
    line-height: 24px;
    height: 35px;
    padding: 0 20px;
    width: auto;
    color: #d6d9dd;
    background-color: grey;
}

.email_high {
    border-color: red;
}
</style>

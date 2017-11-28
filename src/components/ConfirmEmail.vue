<template>
  <div class="hello">
    <h1>Email Confirmation:</h1>
    <form id="confirmform">
      <label id="labelUser">UserId:</label>
      <br>
      <input type="text" id="uid" tabindex="1" disabled v-model.lazy="userid">
      <br>
      <br>
      <br>
      <label id="labelEmail">Email:</label>
      <br>
      <input type="text" id="email" tabindex="1" disabled v-model.lazy="email">
      <br>
      <br>
      <br>
      <label id="labelCode">6 digit Code:</label>
      <br>
      <input type="password" id="code" v-bind:class="[code_highlight ? 'code_high' : '']" tabindex="1" v-model.lazy="code" @focus="correctCode">
      <br>
      <br>
      <br>
      <button tabindex="1" id="confirm" type="submit" @click="confirm" :disabled="wait">Confirm</button>
      <button tabindex="1" id="confirm" type="submit" @click="reSend" :disabled="wait">Resend Code</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ConfirmEmail',
  data () {
    return {
      code: '',
      code_highlight: false,
      wait: false,
      errors: []
    }
  },
  props: [
    'userid',
    'email',
    'isLoggedIn',
    'verified'
  ],
  created () {
    if (!this.$cookie.get('isLoggedIn') || this.$cookie.get('isLoggedIn') != "true") {
      this.$router.push('/')
    }
    if (this.$cookie.get('verified') && this.$cookie.get('verified') == "true") {
      this.$router.push('/')
    }
  },
  watch: {
    isLoggedIn: function (val) {
      console.log('cnfrmemail: logging: ' + val)
      if (!val)
        this.$router.push('/')
    },
    verified: function (val) {
      console.log('cnfrmemail: verified: ' + val)
      if (val)
        this.$router.push('/')
    }
  },
  methods: {
    confirm: function (event) {
      console.log('confirm: ' + this.code.length)
      event.preventDefault()
      if (this.code == '' || this.code.length != 6 || /[^0-9]/.test(this.code)) {
          this.code_highlight = true
          return
      }
      this.wait = true
      this.$emit('setWaiting', true)
      axios.get(`http://localhost:3000/api/getVerification`, {
        params: {
          userid: this.userid,
          email: this.email,
          randomnumber: +this.code
        }
      }).then(response1 => {
        if (response1.data.status == 'success') {
          var url = 'http://localhost:3000/api/setVerification?userid=' + this.userid + '&email=' + this.email + '&verified=true'
          axios.put(url).then (response => {
            this.$emit('setverified', true)
            this.wait = false
            this.$emit('setWaiting', false)
            this.$router.push('/')
          })
        } else {
          this.code_highlight = true
          this.wait = false
          this.$emit('setWaiting', false)
          return
        }
      }).catch(e => {
        this.wait = false
        this.$emit('setWaiting', false)
        this.errors.push(e)
      })
    },
    reSend: function (event) {
      console.log('Resend')
      event.preventDefault()
      var url = 'http://localhost:3000/api/resetRandom?userid=' + this.userid + '&email=' + this.email
      axios.put(url).then (response => {
        console.log('response: ' + response.data)
      }).catch(e => {
        this.errors.push(e)
      })
    },
    correctCode: function () {
        this.code_highlight = false
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

#confirmform {
    display: inline-block;
    width: 40%;

}

#code {
    display: inline-block;
    width: 80%;
    line-height: 16px;
    font-weight: 400;
    font-size: 13px;
    height: 35px;
    /* margin: 0 0 0 20px; */
    padding: 0 10px;
    background: white;
    float: left;
}

#uid, #email {
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

#labelUser, #labelEmail, #labelCode {
    /* display: block; */
    float: left;
    /* margin: 20px 0 0 0; */
}

#confirm {
    margin: 10px 0 20px 20px;
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

.code_high {
    border-color: red;
}
</style>

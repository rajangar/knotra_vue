<template>
  <div class="hello">
    <h1>Sign Up:</h1>
    <div>
    <form id="signupform">
        <br>
        <label id="labelFname">First Name:</label>
        <br>
        <input type="text" v-bind:class="[fname_highlight ? 'fname_high' : '']" id="fname" tabindex="1" v-model.lazy="fName" @blur="checkFName" @focus="correctFName">
        <span id="sideMessage" v-if="fname_highlight">FirstName should not be empty</span>
        <br>
        <br>
        <label id="labelLname">Last Name:</label>
        <br>
        <input type="text" v-bind:class="[lname_highlight ? 'lname_high' : '']" id="lname" tabindex="1" v-model.lazy="lName" @blur="checkLName" @focus="correctLName">
        <span id="sideMessage" v-if="lname_highlight">LastName should not be empty</span>
        <br>
        <br>
        <label id="labelEmail">Email:</label>
        <br>
        <input type="text" v-bind:class="[email_highlight ? 'email_high' : '']" id="email" tabindex="1" v-model.lazy="emaill" @blur="checkEmail" @focus="correctEmail">
        <span id="sideMessage" v-if="emailEmpty">Email should not be empty</span>
        <span id="sideMessage" v-if="!emailFormat">Email Format is not correct</span>
        <span id="sideMessage" v-if="emailUsed">Email is already used</span>
        <br>
        <br>
        <label id="labelUid">UserId:</label>
        <br>
        <input type="text" v-bind:class="[userid_highlight ? 'uid_high' : '']" id="userid" required tabindex="1" v-model.lazy="userid" @blur="checkUserId" @focus="correctUserId">
        <span id="sideMessage" v-if="uidEmpty">UserId should not be empty</span>
        <span id="sideMessage" v-if="!uidFormat">Only Alphanumeric and '_' is allowed</span>
        <span id="sideMessage" v-if="uidUsed">UserId is already used</span>
        <br>
        <br>
        <label id="labelPwd">Password (more than 7 characters):</label>
        <br>
        <input type="password" v-bind:class="[password_highlight ? 'pwd_high' : '']" id="password" required tabindex="1" v-model.lazy="password" @blur="checkPassword" @focus="correctPassword">
        <span id="sideMessage" v-if="pwdEmpty">Password should not be empty</span>
        <span id="sideMessage" v-if="!pwdFormat">Password should be more than 7 characters and alphanumeric or _@.- symbols can be used</span>
        <br>
        <br>
        <label id="labelCnfPwd">Confirm Password:</label>
        <br>
        <input type="password" v-bind:class="[cnf_password_highlight ? 'cnf_pwd_high' : '']" id="cnfpassword" required tabindex="1" v-model.lazy="cnfPassword" @blur="checkCnfPwd" @focus="correctCnfPwd">
        <span id="sideMessage" v-if="!cnfpwdFormat">Passwords do not match</span>
        <br>
        <input type="checkbox" v-bind:class="[agree_highlight ? 'agree_high' : '']" id="terms" v-model="agreed" @focus="correctAgree">
        <label for="checkbox" id="labelTerms">Agree for <router-link to="/terms">terms and conditions</router-link></label>
        <br>
        <br>
        <vue-recaptcha id="recaptcha" sitekey="6LeJcjoUAAAAALHJl7zs_u-V8UbnKGTbyeKhiMX6" v-on:verify="val => g_recaptcha_response = val"></vue-recaptcha>
        <span id="sideMessage" class="captchaerror" v-if="!recaptchaUsed">Recaptcha Error</span>
        <br>
        <button tabindex="1" id="submit" type="submit" :disabled="wait" @click="submit">Submit</button>
    </form>
    <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'SignUpPage',
  data () {
    return {
      fName: '',
      lName: '',
      emaill: '',
      userid: '',
      password: '',
      cnfPassword: '',
      agreed: false,
      userid_highlight: false,
      password_highlight: false,
      fname_highlight: false,
      lname_highlight: false,
      email_highlight: false,
      cnf_password_highlight: false,
      agree_highlight: false,
      emailFormat: true,
      emailUsed: false,
      emailEmpty: false,
      uidFormat: true,
      uidUsed: false,
      uidEmpty: false,
      pwdFormat: true,
      pwdEmpty: false,
      cnfpwdFormat: true,
      g_recaptcha_response: '',
      recaptchaUsed: true,
      wait: false,
      errors: []
    }
  },
  props: [
    'firstName',
    'lastName',
    'email',
    'isLoggedIn'
  ],
  components: {
    VueRecaptcha
  },
  created () {
    console.log('isLoggedIn: ' + this.$cookie.get('isLoggedIn'))
    if (this.$cookie.get('isLoggedIn') && this.$cookie.get('isLoggedIn') == "true") {
      this.$router.push('/')
    }
    console.log('firstname: ' + this.firstName)
    if (this.firstName == undefined) {
      this.$router.push('/')
    }
    this.fName = this.firstName
    this.lName = this.lastName
    this.emaill = this.email
  },
  watch: {
    isLoggedIn: function (val) {
      console.log('SignUpPage: logging: ' + val)
      if (val)
        this.$router.push('/')
    }
  },
  methods: {
    /* recaptchaResponse: function (val) {
      console.log('verify called')
      this.g_recaptcha_response = val
    }, */
    submit: function (event) {
      event.preventDefault()
      var status = true
      status = this.checkFName()
      status = this.checkLName()
      status = this.checkEmail()
      status = this.checkUserId()
      status = this.checkPassword()
      status = this.checkCnfPwd()
      if(!this.agreed) {
        this.agree_highlight = true
        status = false
      }
      console.log('response = ' + this.g_recaptcha_response)
      // var url= 'https://www.google.com/recaptcha/api/siteverify?secret=6LeJcjoUAAAAAFBSIYNzcZleibkmG6HMligiKvMS&response=' + this.g_recaptcha_response
      // axios.post(`https://www.google.com/recaptcha/api/siteverify`, {
        // secret: '6LeJcjoUAAAAAFBSIYNzcZleibkmG6HMligiKvMS',
        // response: this.g_recaptcha_response
      /* axios.post(url
      ).then(rsp => {
        console.log(rsp.data)
      }).catch(e => {
        this.errors.push(e)
        console.log(e)
        status = false
      }) */
      if (!status)
        return
      this.wait = true
      this.$emit('setWaiting', true)
      axios.get(`http://localhost:3000/api/getEmailUser`, {
        params: {
          email: this.emaill,
        }
      }).then(response => {
        if (response.data.status == 'success') {
          this.email_highlight = true
          this.emailUsed = true
          status = false
          this.wait = false
          this.$emit('setWaiting', false)
        }
        axios.get(`http://localhost:3000/api/getIdUser`, {
          params: {
            userid: this.userid,
          }
        }).then(response1 => {
          if (response1.data.status == 'success') {
            this.userid_highlight = true
            this.uidUsed = true
            status = false
            this.wait = false
            this.$emit('setWaiting', false)
          }
          if (!status) {
            return
          }
          
          axios.post(`http://localhost:3000/api/addProfile`, {
              g_recaptcha_response: this.g_recaptcha_response,
              userid: this.userid,
              email: this.emaill,
              firstName: this.fName,
              lastName: this.lName,
              phone: '',
              address: '',
              city: '',
              country: '',
              s_expert: '',
              s_ready_to_help: '',
              s_to_learn: '',
              ratings: '',
              credits: '',
              credits_to_provide: '',
              helper_response_per: '',
              help_take_response_per: '',
              help_taker_pages_id: '',
              help_provider_pages_id: '',
              reviews: '',
              profile_summary: '',
              profile_explanation: '',
              password: this.password
          }).then(response2 => {
            if (response2.data.status == 'success') {
              console.log('added')
              this.$cookie.set('userid', this.userid, 1)
              this.$cookie.set('password', this.password, 1)
              this.wait = false
              this.$emit('setWaiting', false)
              this.$router.push('/confirmemail/' + this.userid + '&' + this.email)
            } else if (response2.data.status == 'errorcaptcha') {
              this.wait = false
              this.$emit('setWaiting', false)
              this.recaptchaUsed = false
              setTimeout(function () {
                this.recaptchaUsed = true
              }.bind(this), 2000)
            }
          }).catch(e => {
            this.wait = false
            this.$emit('setWaiting', false)
            this.errors.push(e)
          })
        }).catch(e => {
          this.errors.push(e)
        })
      }).catch(e => {
        this.errors.push(e)
      })
    },
    correctAgree: function () {
      this.agree_highlight = false
    },
    checkFName: function () {
      console.log('Check FName')
      if(this.fName == '' || /[^a-zA-Z0-9_@.-]/.test(this.fName)) {
        this.fname_highlight = true
        return false  
      }
      return true
    },
    correctFName: function () {
      this.fname_highlight = false
    },
    checkLName: function () {
      console.log('Check LName')
      if(this.lName == '' || /[^a-zA-Z0-9_@.-]/.test(this.lName)) {
        this.lname_highlight = true
        return false
      }
      return true
    },
    correctLName: function () {
      this.lname_highlight = false
    },
    checkEmail: function () {
      console.log('Check Email')
      if(this.emaill == '') {
        this.email_highlight = true
        this.emailEmpty = true
        return false
      }
      if(!this.emaill.match('@') || this.emaill.match(' ') || /[^a-zA-Z0-9_@.-]/.test(this.emaill)) {
        console.log('Email is incorrect')
        this.email_highlight = true
        this.emailFormat = false
        return false
      }
      /* axios.get(`http://localhost:3000/api/getEmailUser`, {
        params: {
          email: this.emaill,
        }
      }).then(response => {
        if (response.data.status == 'success') {
          this.email_highlight = true
          this.emailUsed = true
          return false
        }
      }).catch(e => {
        this.errors.push(e)
      }) */
      return true
    },
    correctEmail: function () {
      this.emailFormat = true
      this.email_highlight = false
      this.emailUsed = false
      this.emailEmpty = false
    },
    checkUserId: function () {
      console.log('Check UserId')
      if(this.userid == '') {
        this.userid_highlight = true
        this.uidEmpty = true
        return false
      }
      if(/[^a-zA-Z0-9_]/.test(this.userid)) {
        console.log('UserId is incorrect')
        this.userid_highlight = true
        this.uidFormat = false
        return false
      }
      /* axios.get(`http://localhost:3000/api/getIdUser`, {
        params: {
          userid: this.userid,
        }
      }).then(response => {
        if (response.data.status == 'success') {
          this.userid_highlight = true
          this.uidUsed = true
          return false
        }
      }).catch(e => {
        this.errors.push(e)
      }) */
      return true
    },
    correctUserId: function () {
      this.uidFormat = true
      this.userid_highlight = false
      this.uidUsed = false
      this.uidEmpty = false
    },
    checkPassword: function () {
      console.log('Check Password')
      if(this.password == '') {
        this.password_highlight = true
        this.pwdEmpty = true
        return false
      }
      if(this.password.length < 8 || /[^a-zA-Z0-9_@.-]/.test(this.password)) {
        console.log('Password is incorrect')
        this.password_highlight = true
        this.pwdFormat = false
        return false
      }
      return true
    },
    correctPassword: function () {
      this.pwdFormat = true
      this.password_highlight = false
      this.pwdEmpty = false
      this.correctCnfPwd()
    },
    checkCnfPwd: function () {
      console.log('Check confirm Password')
      if(this.cnfPassword != this.password) {
        this.cnf_password_highlight = true
        this.cnfpwdFormat = false
        return false
      }
      return true
    },
    correctCnfPwd: function () {
      this.cnfpwdFormat = true
      this.cnf_password_highlight = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  width:100%;
  text-align: left;
  background-color: grey;
  color: black;
  padding-left: 10px;
}

#signupform {
    width: 50%;
    border: 1px solid grey;
    text-align: left;
}

#labelUid, #labelPwd, #labelFname, #labelLname, #labelEmail, #labelCnfPwd, #terms {
    margin: 20px 0 0 20px;
    color: black;
}

#labelTerms {
    color: black;
}

#userid, #password, #fname, #lname, #email, #cnfpassword {
    display: inline-block;
    width: 50%;
    line-height: 16px;
    font-weight: 400;
    font-size: 13px;
    height: 35px;
    margin: 0 0 0 20px;
    padding: 0 10px;
    background: #d6d9dd;
}

.uid_high, .pwd_high, .fname_high, .lname_high, .email_high, .cnf_pwd_high {
    border-color: red;
}

.agree_high {
    outline: 1px solid red;
}

#submit {
    margin: 10px 0 20px 20%;
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

#recaptcha {
    margin: 0 0 0 20px;
}

#sideMessage {
    color: red;
}

.captchaerror {
  margin-left: 20px;
}
</style>
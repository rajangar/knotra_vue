<template>
  <div class="hello">
    <form id="signupform">
      <input type="text" id="firstname" v-bind:class="[fname_highlight ? 'fname_high' : '']" required tabindex="1" v-model.lazy="firstName" placeholder="First Name">
      <br>
      <input type="text" id="lastname" v-bind:class="[lname_highlight ? 'lname_high' : '']" required tabindex="1" v-model.lazy="lastName" placeholder="Last Name">
      <br>
      <input type="text" id="email" v-bind:class="[email_highlight ? 'email_high' : '']" required tabindex="1" v-model.lazy="email" placeholder="Email">
      <!-- <br>
      <input type="password" id="password" v-bind:class="[pwd_highlight ? 'pwd_high' : '']" required tabindex="1" v-model.lazy="password" placeholder="Password"> -->
      <br>
      <!-- <section id="termsform">
      <input type="checkbox" v-bind:class="[agree_highlight ? 'agree_high' : '']" id="terms" v-model="agreed">
      <label for="checkbox" id="labelTerms">Agree for <router-link to="/terms">terms and conditions</router-link></label>
      </section> -->
      <button tabindex="1" id="signup-submit" type="submit" @click="signUp">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      // agreed: false,
      fname_highlight: false,
      lname_highlight: false,
      email_highlight: false,
      // pwd_highlight: false,
      agree_highlight: false
    }
  },
  methods: {
    signUp: function (event) {
        event.preventDefault()
        if (this.firstName == '') {
            this.fname_highlight = true;
            setTimeout(function () {
              this.fname_highlight = false
            }.bind(this), 200)
            return
        }
        if (this.lastName == '') {
            this.lname_highlight = true;
            setTimeout(function () {
              this.lname_highlight = false
            }.bind(this), 200)
            return
        }
        if (this.email == '') {
            this.email_highlight = true;
            setTimeout(function () {
              this.email_highlight = false
            }.bind(this), 200)
            return
        }
        /* if (this.password == '') {
            this.pwd_highlight = true;
            setTimeout(function () {
              this.pwd_highlight = false
            }.bind(this), 200)
            return
        } */
        /* if (!this.agreed) {
            this.agree_highlight = true;
            setTimeout(function () {
              this.agree_highlight = false
            }.bind(this), 200)
            return
        } */
        this.$router.push('/signuppage/' + this.firstName + '&' + this.lastName + '&' + this.email)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#firstname, #lastname, #email, #password {
    display: inline-block;
    line-height: 16px;
    font-weight: 400;
    font-size: 13px;
    width: 70%;
    height: 35px;
    margin: 10px 5px 10px 5px;
    padding: 0 10px;
    background: #d6d9dd;
}

#termsform {
    text-align: center;
}

#labelTerms {
    font-size: 13px;
    color: #d6d9dd;
}

#signup-submit {
    margin: 10px 5px 10px 5px;
    font-size: 17px;
    font-weight: 400;
    display: inline-block;
    line-height: 24px;
    height: 35px;
    padding: 0 20px;
    width: auto;
    color: #d6d9dd;
    background-color: transparent;
}

.fname_high, .lname_high, .email_high, .pwd_high {
    border-color: red;
}

.agree_high {
    outline: 1px solid red;
}
</style>

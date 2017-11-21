<template>
  <div id="app">

    <div id='container' v-cloak v-bind="checkCookie()">

      <section class='header'>
        <section>
          <h1 id='logo'><router-link :to="{ name: 'Home' }">KNOTRA</router-link></h1>
        </section>

        <section id='login' v-if="checkLogin">
          
          <section id="searchform">
            <!-- <form> -->
              <label for="search">Search</label>
              <input type="text" class="search-control" id="search" required tabindex="1" placeholder="search">
            <!-- </form> -->
          </section>

          <section id='logout'>
              <form id="logoutform">
                <button tabindex="1" id="logout-submit" type="submit" class="btn btn-success" @click="signOut">Logout</button>
              </form>
          </section>

        </section>
        <section id='login' v-else>
          
          <form id="loginform">
                
            <label for="userid">UserId</label>
            <input type="text" class="form-control" id="userid" required tabindex="1" v-model.lazy="userid" placeholder="UserId">
              
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" required tabindex="1" v-model.lazy="password" placeholder="Password">
              
            <button tabindex="1" id="login-submit" type="submit" class="btn btn-success" @click="signIn">Sign in</button>

            <router-link class="link-forgot-password" tabindex="1" to="/forgot-password">Forgot password?</router-link>

          </form>
        </section>
        
      </section>
      
      <router-view v-bind:is-logged-in="isLoggedIn"></router-view>
      
      <div id='menu-outer'>
        
        <div class='table'>
          <ul id='horizontal-list'>
            <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>
        
        <div id='copyright'><small>&copy; Copyright 2017, KNOTRA</small></div>
        </div>
      
      </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isLoggedIn: false,
      userid: '',
      password: ''
    }
  },
  methods: {
    tryLogin: function () {
      if (this.userid == 'rajan' && this.password == 'garg') {
        this.$cookie.set('userid', this.userid, 1)
        this.$cookie.set('password', this.password, 1)
        this.isLoggedIn = true
      } else {
        this.$cookie.set('userid', '', 1)
        this.$cookie.set('password', '', 1)
        this.isLoggedIn = false
      }
      return this.isLoggedIn
    },
    signIn: function (event) {
      event.preventDefault()
      console.log('signin = ' + this.userid + ',' + this.password)
      this.tryLogin()
    },
    signOut: function (event) {
      event.preventDefault()
      this.$cookie.delete('userid')
      this.$cookie.delete('password')
      console.log('signout = ' + this.userid + ',' + this.password)
      this.isLoggedIn = false
      this.userid = ''
      this.password = ''
    },
    checkCookie: function () {
      console.log('checkCookie = ' + this.isLoggedIn + this.$cookie.get('userid') + ',' + this.$cookie.get('password'))
      if (!this.isLoggedIn && this.$cookie.get('userid') && this.$cookie.get('password')) {
        this.userid = this.$cookie.get('userid')
        this.password = this.$cookie.get('password')
        if (!this.tryLogin()) {
          this.userid = ''
          this.password = ''
        }
      } else if ((this.isLoggedIn && (!this.$cookie.get('userid') || !this.$cookie.get('password')))) {
        console.log('Logout')
        this.$cookie.delete('userid')
        this.$cookie.delete('password')
        console.log('signout = ' + this.userid + ',' + this.password)
        this.isLoggedIn = false
        this.userid = ''
        this.password = ''
      } else if ((this.isLoggedIn && (this.$cookie.get('userid') != this.userid || this.$cookie.get('password') != this.password))) {
        this.userid = this.$cookie.get('userid')
        this.password = this.$cookie.get('password')
        if (!this.tryLogin()) {
          this.userid = ''
          this.password = ''
        }
      }
    }
  },
  computed: {
    checkLogin: function () {
      return this.isLoggedIn
    }
  },
  watch: {

  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
#container {
    display: block;
    width: 100%;
    /* max-width: 1345px; */
    margin: 0 0;
    padding: 0 0;
    background: #ffffff;
  }
  
  @media only screen and (max-width:1345px) {
    #container {
        width: 1345px;
        /* margin: 0 3%; */
    }
  }

  #logoutform #searchform {
    margin: 0px 0 5px 10px;
    text-align: right;
}

#search {
    line-height: 16px;
    font-weight: 400;
    color: rgba(0,0,0,0.85);
    font-size: 13px;
    display: inline-block;
    width: 216px;
    height: 32px;
    margin: 10px 8px 10px 0;
    padding: 0 10px;
    /* background: #f3f6f8; */
    background: #d6d9dd;
    /* border: 1px solid #b3b6b9; */
    /* border: 1px solid #d6d9dd; */
    /* border-radius: 2px; */
}

#logout-submit {
    line-height: 24px;
    /* color: #fff; */
    color: #d6d9dd;
    font-size: 17px;
    font-weight: 400;
    display: inline-block;
    width: auto;
    height: 32px;
    margin: 10px 0 0;
    padding: 0 20px;
    background-color: transparent;
    /* border: 1px solid #fff; */
    /* border: 1px solid d6d9dd ; */
    /* border-radius: 2px; */
}

.header {
    display: inline-block;
    width: 100%;
    font-size: 0;
    line-height: 0;
    margin: 0 auto;
    padding: 0;
    background: #2f94a1;
    color: #ffffff;
}

.header #login #searchform {
    width: 30%;
    float: left;
}

.header #login #logout {
    width: 70%;
    float: right;
}

.header #login {
    width: 90%;
    float: right;
}

#logout-submit {
    width: 10%;
    float: right;
    /*margin: 0 10px 0 0;*/
}

/* .header #login #searchform {
    width: 50%;
    float: right;
}

.header #login #logout {
    width: 50%;
    float: right;
} */

  #logo {
    font-family: 'AR CENA', sans-serif;
    font-weight: 700;
    font-size: 30px;
    line-height: 35px;
    /*color: #010000;*/
    margin: 10px 0 5px 10px;
    padding: 0;
    display: block;
    width: 90px;
    /* color: white; */
    color: #d6d9dd;
    float: left;
  }

  #logo a {
    text-decoration: none;
    /* color: white; */
    color: #d6d9dd;
  }

    #menu-outer {
    /*height: 84px;*/
    /*background: url(images/bar-bg.jpg) repeat-x;*/
    width: 100%;
    font-size: 0;
    /*line-height: 50px;*/
    padding: 0;
    background: #2f94a1;
    color: #ffffff;
  }
  
  #menu-outer .table ul#horizontal-list {
    /* min-width: 696px; */
    /* width: 100%; */
    list-style: none;
    padding: 20px 0 20px 0;
    text-align: center;
  }

  #menu-outer .table ul#horizontal-list li {
    display: inline-flex;
    /* margin: 0 auto 0 auto; */
    
    /* margin: 0 0 0 50px; */
    padding: 0 0 0 5%;
    text-align: center;
  }

  #menu-outer .table ul#horizontal-list li a {
    text-decoration: none;
    color: white;
    font-size: 15px;
    
  }

  #menu-outer #copyright small {
    color: black;
    float: right;
    font-size: 12px;
    margin: 0 10px;
  }

  #loginform {
    margin: 0px 0 5px 10px;
    text-align: right;
}

#userid, #password {
    line-height: 16px;
    font-weight: 400;
    color: rgba(0,0,0,0.85);
    font-size: 13px;
    display: inline-block;
    width: 216px;
    height: 32px;
    margin: 10px 8px 10px 0;
    padding: 0 10px;
    /* background: #f3f6f8; */
    background: #d6d9dd;
    /* border: 1px solid #b3b6b9; */
    /* border: 1px solid #d6d9dd; */
    /* border-radius: 2px; */
}

#login-submit {
    line-height: 24px;
    /* color: #fff; */
    color: #d6d9dd;
    font-size: 17px;
    font-weight: 400;
    display: inline-block;
    width: auto;
    height: 32px;
    margin: 10px 0 0;
    padding: 0 20px;
    background-color: transparent;
    /* border: 1px solid #fff; */
    /* border: 1px solid d6d9dd ; */
    /* border-radius: 2px; */
}

#loginform .link-forgot-password {
    text-decoration: none;
    background-color: transparent;
    /* border: 0; */
    /* vertical-align: baseline; */
    line-height: 16px;
    font-weight: 400;
    font-size: 13px;
    /*display: flex;*/
    height: 100%;
    /* -webkit-box-align: center; */
    /* align-items: center; */
    color: #d6d9dd;
    margin: 0 10px 0 20px;
    /* box-sizing: border-box; */
}

</style>

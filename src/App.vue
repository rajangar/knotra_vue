<template>
  <div id="app">

  <transition name="fade">
    <wait-circle v-if="waiting" class="modal"></wait-circle>
  </transition>

  <div v-bind:class="[waiting ? blurClass : '', bkClass]">

    <div id='container' v-cloak>
    
      <section class='header'>
       <div class="fixedwidth">
        <section class='logoSection'>
          <h1 id='logo' v-on:click="checkCookie"><router-link :to="{ name: 'Home' }">KNOTRA</router-link></h1>
        </section>

        <section id='login' v-if="checkLogin">
                  
          <section id="searchform">
            <!-- <form>
              <label for="search">Search</label> -->
              <input type="text" class="search-control" id="search" required tabindex="1" placeholder="search" v-model.lazy="searchQuery" @keyup.enter="search">
            <!-- </form> -->
          </section>

          <section id='logout'>
              <table class="u1">
              <td class="li2">
                <div id="notify1" @click="showNotifications">
                <i class="fa-con"></i>
                <div id="numberNotify">
                <small> {{ "9999" }} </small>
                </div>
                </div>
              </td>
              <td class="li2">
                <div id="notify1" @click="showNotifications">
                <i class="fa-msg"></i>
                <div id="numberNotify">
                <small> {{ "9999" }} </small>
                </div>
                </div>
              </td>
              <td class="li2">
                <div id="notify1" @click="showNotifications">
                <i class="fa-notify"></i>
                <div id="numberNotify">
                <small> {{ "9999" }} </small>
                </div>
                </div>
              </td>
              <td class="li1">
              <div id="logoutform" tabindex="-1" @blur="showList=false">
                <div id="profileBtn" @click="profileBtn">
                  <img v-if="currentProfile.avatar!=''" :src="currentProfile.avatar" />
                  <img v-else src="./assets/man.jpg" />
                  <span class="s1">{{ currentProfile.firstName.length > 12 ? currentProfile.firstName.substr(0, 9) + '...' : currentProfile.firstName }}
                  <i class="fa-down"></i></span>
                </div>
                <div class="dropdown-content" :class="[showList ? 'showClass' : '']">
                <!-- <button tabindex="1" id="profile-submit" type="submit" class="btn btn-success" @click="showProfile">Profile</button>
                <button tabindex="1" id="logout-submit" type="submit" class="btn btn-success" @click="signOut">Logout</button> -->
                <div tabindex="-1" id="profile-submit" @focus="showProfile">Profile</div>
                <div tabindex="-1" id="logout-submit" @focus="signOut">Logout</div>
                </div>
              </div>
              </td>
              </table>
          </section>

        </section>

        <section id='login' v-else>

          <form id="loginform">
            <span id="uandpwdnotmatch" v-if="user_pwd_not_match">UserId and Password do not match</span>
                
            <!-- <label for="userid">UserId</label> -->
            <input type="text" v-bind:class="[userid_highlight ? 'uid_high' : '']" id="userid" required tabindex="1" v-model.lazy="userid" placeholder="UserId or Email">
              
            <!-- <label for="password">Password</label> -->
            <input type="password" v-bind:class="[password_highlight ? 'pwd_high' : '']" id="password" required tabindex="1" v-model.lazy="password" placeholder="Password">
              
            <button tabindex="1" id="login-submit" type="submit" class="btn btn-success" @click="signIn">Sign in</button>

            <router-link class="link-forgot-password" tabindex="1" to="/forgot-password">Forgot password?</router-link>

          </form>
        </section>
        
       </div>
      </section>

      <div class="fixedwidth">
      <router-view :userid="userid" v-bind:is-logged-in="isLoggedIn" v-bind:id="id" v-bind:cnt="cnt" v-bind:verified="verified" @setverified="val => verified = val"
      @setWaiting="val => waiting = val"></router-view>
      </div>

      <chat-window v-if="isLoggedIn"></chat-window>
       
      <div id='menu-outer'>
        
        <div class="fixedwidth">
        <div class='table'>
          <ul id='horizontal-list'>
            <li v-on:click="checkCookie"><router-link :to="{ name: 'Home' }">Home</router-link></li>
            <li v-on:click="checkCookie"><router-link to="/about">About</router-link></li>
            <li v-on:click="checkCookie"><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>
        
        <div id='copyright'><small>&copy; Copyright 2017, KNOTRA</small></div>
        </div>
        </div>
      
      </div>

</div>
  </div>
</template>

<script>
import {HTTP} from '@/backend/index.js'
import WaitCircle from '@/components/WaitCircle'
import ChatWindow from '@/profilecomponents/ChatWindow'
import {CurrentProfile, NewProfile} from '@/profilecomponents/ProfileInfo.js'

export default {
  name: 'app',
  data () {
    return {
      isLoggedIn: false,
      userid: '',
      password: '',
      id: '',
      errors: [],
      searchQuery: '',
      cnt: 0,
      waiting: false,
      bkClass: 'bk',
      blurClass: 'blur',
      userid_highlight: false,
      password_highlight: false,
      user_pwd_not_match: false,
      verified: true,
      userid2: '',
      password2: '',
      currentProfile: CurrentProfile,
      newProfile: NewProfile,
      showList: false,
      showChatWindow: false
    }
  },
  components: {
    WaitCircle,
    ChatWindow
  },
  watch: {
    userid2: function (val) {
      this.logCookie()
    }
  },
  created () {
    this.checkCookie()
    /* this.$refs.logoutform.onblur = function() {
      this.showList = false
    }
    $refs.logoutform.$watch('onblur', function(newval, oldval) {
      this.showList = false
    }) */
  },
  methods: {
    showNotifications (event) {
      event.preventDefault()
    },
    toggleShowList () {
      this.showList = !this.showList
    },
    toggleChatWindow (event) {
      event.preventDefault()
      this.showChatWindow = !this.showChatWindow
    },
    search: function (event) {
      event.preventDefault()
      this.$router.push('/search/' + this.searchQuery)
      this.searchQuery = ''
    },
    async getUserOrEmailInfo () {
      if (this.userid.match('@')) {
        return HTTP.get(`getUserByEmail`, {
          params: {
            email: this.userid,
            password: this.password
          }
        })
      } else {
        return HTTP.get(`getUserById`, {
          params: {
            userid: this.userid,
            password: this.password
          }
        })
      }
    },
    async getProfile () {
      return HTTP.get(`getProfileById`, {
        params: {
          userid: this.userid,
          id: this.id
        }
      })
    },
    async getAvatar () {
      const config = {
        params: {
          userid: this.userid
        },
        responseType: 'blob'
      }
      return HTTP.get ('getAvatar', config)
    },
    tryLogin: function () {
      this.waiting = true
      console.log('1waiting: ' + this.waiting)
      setTimeout(function () {
        console.log('3waiting: ' + this.waiting)
        this.waiting = false
        console.log('4waiting: ' + this.waiting)
      }.bind(this), 10000)

      var authentication = false
      this.getUserOrEmailInfo().then(response => {
        this.waiting = false
        console.log('1au: ' + authentication)
        console.log('status: ' + JSON.stringify(response.data.status))
        console.log('id: ' + JSON.stringify(response.data.id))
        console.log('verified: ' + JSON.stringify(response.data.verified))
        if (response.data.status == 'success') {
          authentication = true
          this.id = response.data.id
          if (this.userid.match('@')) {
            this.userid = response.data.userid
          } else {
            this.email = response.data.email
          }
          this.verified = response.data.verified
        }
        console.log('2au: ' + authentication)
        console.log('4au: ' + authentication)
        if (authentication) {
          this.$cookie.set('userid', this.userid, 1)
          this.$cookie.set('password', this.password, 1)
          this.$cookie.set('id', this.id, 1)
          this.$cookie.set('isLoggedIn', this.isLoggedIn, 1)
          this.$cookie.set('verified', this.verified, 1)
          this.isLoggedIn = true
        } else {
          this.$cookie.delete('userid')
          this.$cookie.delete('password')
          this.$cookie.delete('id')
          this.$cookie.delete('isLoggedIn')
          this.$cookie.delete('verified')
          this.isLoggedIn = false
          this.password = ''
          this.id = ''
          this.user_pwd_not_match = true
          setTimeout(function () {
            this.user_pwd_not_match = false
          }.bind(this), 2000)
          this.$router.push('/')
        }
        if (this.isLoggedIn) {
          this.getProfile().then(response => {
            this.profileInfo = JSON.stringify(response.data)
            console.log('5-profileInfo: ' + this.profileInfo)
            this.currentProfile.firstName = response.data.data[0].firstname
            this.currentProfile.lastName = response.data.data[0].lastname
            this.currentProfile.userid = this.userid
            this.currentProfile.email = this.email
            this.currentProfile.id = this.id
          }).catch(e => {
            this.errors.push(e)
          })
          this.getAvatar().then(response => {
            console.log('1.GetAvatar')
            var reader = new window.FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function() {
              // console.log(reader.result)
              if (!reader.result.startsWith('data:application')) {
                this.currentProfile.avatar = reader.result
              } else {
                this.currentProfile.avatar = ''
              }
            }.bind(this)
          }).catch(e => {
            this.errors.push(e)
          })
        }
        return this.isLoggedIn
      }).catch(e => {
        this.$cookie.delete('userid')
        this.$cookie.delete('password')
        this.$cookie.delete('id')
        this.$cookie.delete('isLoggedIn')
        this.$cookie.delete('verified')
        this.isLoggedIn = false
        this.password = ''
        this.id = ''
        this.waiting = false
        this.errors.push(e)
      })
    },
    signIn: function (event) {
      event.preventDefault()
      if (this.waiting) {
        return
      }
      if (this.userid == '' || /[^a-zA-Z0-9_@.-]/.test(this.userid)) {
        this.userid_highlight = true
        setTimeout(function () {
          this.userid_highlight = false
        }.bind(this), 200)
        return
      }
      if (this.password == '' || /[^a-zA-Z0-9_@.-]/.test(this.password)) {
        this.password_highlight = true
        setTimeout(function () {
          this.password_highlight = false
        }.bind(this), 200)
        return
      }
      console.log('signin = ' + this.userid + ',' + this.password)
      this.tryLogin()
      this.$router.push('/')
    },
    signOut: function (event) {
      event.preventDefault()
      this.$cookie.delete('userid')
      this.$cookie.delete('password')
      this.$cookie.delete('id')
      this.$cookie.delete('isLoggedIn')
      this.$cookie.delete('verified')

      console.log('signout = ' + this.userid + ',' + this.password)
      this.isLoggedIn = false
      // this.userid = ''
      this.password = ''
      this.id = ''
      this.$router.push('/')
    },
    checkCookie: function () {
      this.userid2 = this.$cookie.get('userid')
      this.password2 = this.$cookie.get('password')
      if(this.isLoggedIn) {
        this.getProfile().then(response => {
          this.profileInfo = JSON.stringify(response.data)
          console.log('6-profileInfo: ' + this.profileInfo)
          this.currentProfile.firstName = response.data.data[0].firstname
          this.currentProfile.lastName = response.data.data[0].lastname
          this.currentProfile.userid = this.userid
          this.currentProfile.email = this.email
          this.currentProfile.id = this.id
        }).catch(e => {
          this.errors.push(e)
        })

        this.getAvatar().then(response => {
          console.log('1.GetAvatar ')
          var reader = new window.FileReader()
          reader.readAsDataURL(response.data)
          reader.onload = function() {
            // console.log(reader.result)
            if (!reader.result.startsWith('data:application')) {
              this.currentProfile.avatar = reader.result
            } else {
              this.currentProfile.avatar = ''
            }
          }.bind(this)
        }).catch(e => {
          this.currentProfile.avatar = ''
          this.errors.push(e)
        })
      }
    },
    logCookie: function () {
      console.log('checkCookie = ' + this.isLoggedIn + this.$cookie.get('userid') + ',' + this.$cookie.get('password'))
      if (!this.isLoggedIn && this.$cookie.get('userid') && this.$cookie.get('password')) {
        this.userid = this.$cookie.get('userid')
        this.password = this.$cookie.get('password')
        this.tryLogin()
        // if (!this.tryLogin()) {
          // this.userid = ''
          // this.password = ''
        // }
      } else if ((this.isLoggedIn && (!this.$cookie.get('userid') || !this.$cookie.get('password')))) {
        console.log('Logout')
        this.$cookie.delete('userid')
        this.$cookie.delete('password')
        this.$cookie.delete('id')
        this.$cookie.delete('isLoggedIn')
        this.$cookie.delete('verified')
        console.log('signout = ' + this.userid + ',' + this.password)
        this.isLoggedIn = false
        // this.userid = ''
        this.password = ''
        this.id = ''
        this.$router.push('/')
      } else if ((this.isLoggedIn && (this.$cookie.get('userid') != this.userid || this.$cookie.get('password') != this.password))) {
        this.userid = this.$cookie.get('userid')
        this.password = this.$cookie.get('password')
        this.tryLogin()
        // if (!this.tryLogin()) {
          // this.userid = ''
          // this.password = ''
        // }
      }
      if (this.isLoggedIn) {
        if(!this.verified) {
          this.$router.push('/confirmemail/' + this.userid + '&' + this.email)
        }
      }
    },
    showProfile: function (event) {
      event.preventDefault()
      this.checkCookie()
      if (this.isLoggedIn) {
        this.cnt += 1
        console.log('1cnt: ' + this.cnt)
        this.$router.push('/profile/' + this.userid)
      }
    },
    profileBtn: function (event) {
      event.preventDefault()
      this.toggleShowList()
    }
  },
  computed: {
    checkLogin: function () {
      return this.isLoggedIn
    }
  }
}
</script>

<style>
#app {
    position: relative !important;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

.header {
    display: inline-block;
    width: 100%;
    background: #2f94a1;
    height: 59px;
}

.fixedwidth {
    display: inline-block;
    width: 1012px;
}

.header .logoSection {
    width: 12%;
    float: left;
}

#logo {
    font-weight: 700;
    font-size: 25px;
    line-height: 35px;
    margin: 10px 0 10px 10px;
    display: inline-block;
    float: left;
}

.header #login {
    width: 85%;
    float: right;
}

.header #login #searchform {
    width: 20%;
    float: left;
}

.header #login #searchform input {
    display: inline-block;
    width: 100%;
    line-height: 16px;
    font-weight: 400;
    font-size: 13px;
    height: 35px;
    margin: 10px 0 10px 0;
    padding: 0 10px;
    background: #d6d9dd;
}

.header #login #logout {
    display: inline-block;
    width: 80%;
    height: 55px;
    float: right;
}

#profileBtn {
    margin: 10px 0 0 0;
    font-size: 17px;
    font-weight: 400;
    display: inline-block;
    line-height: 10px;
    //height: 10px;
    padding: 0 0;
    width: auto;
    // height: 100%;
    color: #d6d9dd;
    background-color: transparent;
    cursor: pointer;
}

#profileBtn img {
  border-radius: 50%;
  margin: 0 0 0 0;
  width: 40px;
  height: 40px;
  display: inline-block;
  // float: left;
}

.s1 {
    display: inline-block;
    // float: right;
    // height: 100%;
    margin: -30px 0 0 5px;
    vertical-align: middle;
}

.fa-down {
    font-family: FontAwesome;
    font-style: normal;
    color: white;
    margin-left: 5px;
}

.fa-down:before {
    content: "\f0d7";
}

#notify1 {
    width: 36px;
    height: 36px;
    position: relative;
    border: 2px solid #EEE;
    border-radius: 30px;
    margin: 12px 15px 0 0;
    cursor: pointer;
}

#notify1:hover {
    background-color: white;
}

.fa-con {
    font-family: FontAwesome;
    font-style: normal;
    position: absolute;
    right: 5px;
    top: 2px;
    font-size: 20px;
    // margin-right: 40px;
}

.fa-con:before {
    content: "\f0c0";
}

.fa-msg {
    font-family: FontAwesome;
    font-style: normal;
    position: absolute;
    right: 6px;
    top: 1px;
    font-size: 20px;
    // margin-right: 40px;
}

.fa-msg:before {
    content: "\f0e0";
}

.fa-notify {
    font-family: FontAwesome;
    font-style: normal;
    position: absolute;
    right: 5px;
    top: -2px;
    font-size: 24px;
    // margin-right: 40px;
}

.fa-notify:before {
    content: "\f0ac";
}

#numberNotify {
    width: 18px;
    height: 18px;
    position: absolute;
    background-color: orange;
    border-radius: 10px;
    margin: -9px 0 0 20px;
    color: white;
    font-size: 9px;
    cursor: pointer;
}

#numberNotify small {
    // position: absolute;
    display: inline-block;
    margin-top: 4px;
    text-align: center;
}

#logoutform {
    text-align: right;
    position: relative;
    display: inline-block;
    float: right;
    max-width: 200px;
    width: auto;
    height: 100%;
    margin: 0 25px 0 0;
    outline: 0px solid transparent;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    // min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    margin: 5px 0 0 0;
    right: 0px;
    z-index: 5;
    width: 75px;
    float: right;
}

.dropdown-content div {
    // width: 100px;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
}

.dropdown-content div:hover {
    background-color: #f1f1f1
}

.showClass {
    display: block;
}

/*#logout-submit {
    float: right;
}

#logout-submit, #profile-submit {
    width: 10%;
    margin: 10px 10px 10px 10px;
    font-size: 17px;
    font-weight: 400;
    display: inline-block;
    line-height: 24px;
    height: 35px;
    padding: 0 20px;
    width: auto;
    color: #d6d9dd;
    background-color: transparent;
}*/

.u1 {
    display: inline-block;
    float: right;
    // list-style-type: disc;
    height: 100%;
    padding: 0;
    margin: 0;
    width: auto;
}

.li1 {
    display: inline-block;
    // list-style: none;
    width: auto;
    height: 100%;
}

.li2 {
    display: inline-block;
    // list-style: none;
    width: auto;
    height: 100%;
}

a {
    text-decoration: none;
}

#logo a {
    color: #d6d9dd;
}

#loginform {
    height: 55px;
    text-align: right;
}

#userid, #password {
    display: inline-block;
    line-height: 16px;
    font-weight: 400;
    font-size: 13px;
    height: 35px;
    margin: 10px 5px 10px 5px;
    padding: 0 10px;
    background: #d6d9dd;
}

.uid_high, .pwd_high {
    border-color: red
}

#login-submit {
    width: 10%;
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

#loginform .link-forgot-password {
    text-decoration: none;
    background-color: transparent;
    line-height: 16px;
    font-weight: 400;
    font-size: 13px;
    height: 100%;
    color: #d6d9dd;
    margin: 0 10px 0 5px;
}
 
#menu-outer {
    height: 55px;
    display: inline-block;
    width: 100%;
    color: #ffffff;
    background: #2f94a1;
}

#menu-outer .table {
    display: inline-block;
    background: #2f94a1;
    height: 55px;
}
  
#menu-outer .table ul#horizontal-list {
    display: inline-block;
    list-style: none;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
}

#menu-outer .table ul#horizontal-list li {
    display: inline-flex;
    padding: 0 0 0 0;
}

#menu-outer .table ul#horizontal-list li a {
    text-decoration: none;
    background-color: transparent;
    line-height: 16px;
    font-weight: 400;
    font-size: 18px;
    height: 100%;
    color: #d6d9dd;
    margin: 20px 30px 0 30px;
}

#menu-outer #copyright small {
    color: black;
    float: right;
    font-size: 12px;
    margin: 0 10px;
}

#uandpwdnotmatch {
    color: red;
    font-size: 12px;
    margin: 0 10px;
}

/* .modal {
    background: transparent;
    color: black;
    position: absolute;
    margin: 20% 0 0 45%;
} */

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.bk {
    transition: all 0.05s ease-out;
}

.blur {
    filter: blur(10px);
    opacity: 0.1;
}

</style>
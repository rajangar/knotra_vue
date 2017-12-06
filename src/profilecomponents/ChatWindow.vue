<template>
  <div class="hello">
  <div :class="showChatWindow ? 'chatHdrHeight' : 'chatHdr0Height'" id="chatWindow">
        <div id="chatHeader" @click="toggleChatWindow">
          Chat
          <div id="closeChat" v-if="showChatWindow">x</div>
        </div>
        <div id="persons" v-if="showChatWindow">
            First Person
            <div id="inputBox">
                ​<textarea id="txtArea" rows="10" cols="10" v-model="message" placeholder="add multiple lines"></textarea>
                <button type="submit" id="txtBtn" @click="clickButton">Send</button>
            </div>
        </div>
      </div>
  </div>
</template>

<script>

import {HTTP} from '@/backend/index.js'

export default {
  name: 'ChatWindow',
  data () {
    return {
      showChatWindow: false,
      isConnected: false,
      socketMessage: '',
      message: ''
    }
  },
  sockets:{
    connect: function(){
      console.log('socket connected')
      this.isConnected = true
    },
    disconnect: function () {
      console.log('socket disconnected')
      this.isConnected = false
    },
    getMessage: function(val){
      console.log('messgae fired by the socket server: ' + val)
    }
    /* setUserActive: function (val) {
      console.log('setUserActive: ' + val)

      var url = 'setUserActive?userid=' + this.$cookie.get('userid') + '&active=' + val
      HTTP.put (url).then(response => {
        console.log('User Active Set')
      }).catch(e => {
        console.log('error')
      })
    } */
  },
  created () {
    this.$socket.emit('register_user', this.$cookie.get('userid'))
  },
  methods: {
      toggleChatWindow: function () {
          this.showChatWindow = !this.showChatWindow
      },
      clickButton: function (event) {
        // $socket is socket.io-client instance
        event.preventDefault()
        console.log('msg: ' + this.message)
        var sendingMessage = {
          id: 'rgarg',
          message: this.message
        }
        this.$socket.emit('send_message', sendingMessage)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.chatHdrHeight {
    height: 200px;
}

.chatHdr0Height {
    height: 25px;
}

#closeChat {
    float: right;
    decoration: none;
    margin-right: 5px;
}

#chatWindow {
    // display: none;
    position: fixed;
    bottom: 0px;
    right: 50px;
    // height: 25px;
    // background-color: rgb(237, 239, 244);
    width: 300px;
    border: 1px solid rgba(29, 49, 91, .3);
    -webkit-border-radius: 8px 8px 0px 0px !important;
    cursor: pointer;
    overflow: visible;
    resize: none;
    box-shadow: none;
    opacity: 1;
    background: grey;
    z-index: 1000001;
}

#chatHeader {
    display: inline-block;
    float: left;
    // margin-left: 20px;
    vertical-align: middle;
    width: 100%;
    height: 25px;
    -webkit-border-radius: 8px 8px 0px 0px !important;
    // border: 1px solid rgba(29, 49, 91, .3);
}

#persons {
    display: inline-block;
    border: 1px solid rgba(29, 49, 91, .3);
    float: left;
    width: 100%;
    margin-left: -1px;
}

#inputBox {
    position: fixed;
    bottom: 0;
    height: 50px;
    margin-left: -1px;
}

#txtArea {
    display: inline-block;
    float: left;
    width: 200px;
}

#txtBtn {
    display: inline-block;
}

</style>
<template>
  <div class="hello">
    <h1>Profile {{ userid }} {{ id }} </h1>
    <h1> {{ profileInfo }} </h1>
    <left-pane class="leftpane" :id="id" :userid="userid">
    <button type="submit" @click="editPhoto">Edit Image</button>
    </left-pane>
    <center-pane class="centerpane"></center-pane>
  </div>
</template>

<script>
import {HTTP} from '@/backend/index.js'
import LeftPane from '@/profilecomponents/LeftPane'
import CenterPane from '@/profilecomponents/CenterPane'
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
  components: {
    LeftPane,
    CenterPane
  },
  watch: {
    id: function (val) {
      this.getProfile()
    },
    cnt: function (val) {
      this.getProfile()
    }
  },
  methods: {
    getProfile: function () {
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
    },
    editPhoto: function (event) {
      event.preventDefault
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leftpane {
    display: inline-block;
    width: 30%;
    float: left;
    border-style: solid;
    border-width: 1px;
    border-color: #d6d9dd;
    margin: 0 0 10px 20px;
}

.centerpane {
    display: inline-block;
    width: 65%;
    float:right;
    background-color: #2f94a1;
    margin: 0 20px 10px 0;
}
</style>
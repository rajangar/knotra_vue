<template>
  <div class="hello">
    <left-pane class="leftpane" :id="id" :userid="userid">
      <h2>{{currentProfile.firstName + ' ' + currentProfile.lastName}}</h2>
      <h3>{{currentProfile.designation}}</h3>
    </left-pane>

    <center-pane class="centerpane"></center-pane>
  </div>
</template>

<script>
import LeftPane from '@/profilecomponents/LeftPane'
import CenterPane from '@/profilecomponents/CenterPane'
import {CurrentProfile, NewProfile} from '@/profilecomponents/ProfileInfo.js'

export default {
  name: 'DashBoard',
  data () {
    return {
      currentProfile: CurrentProfile,
      newProfile: NewProfile
    }
  },
  props: [
    'id',
    'userid'
  ],
  components: {
    LeftPane,
    CenterPane
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
    margin: 20px 0 0 0;
}

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
    // background-color: #2f94a1;
    margin: 0 20px 10px 0;
    border-style: solid;
    border-width: 1px;
    border-color: #d6d9dd;
}
</style>

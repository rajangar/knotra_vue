<template>
  <div class="hello">
    <div v-if="isLoggedIn">
      <h1>Dashboard {{ id }}</h1>
      <dash-board></dash-board>
    </div>
    <div id="homepage" v-else>
      <h1>KNOTRA</h1>
      <knotra-info class="info"></knotra-info>
      <sign-up class="signup"></sign-up>
    </div>
  </div>
</template>

<script>
import DashBoard from './DashBoard'
import SignUp from './SignUp'
import KnotraInfo from './KnotraInfo'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home Page'
    }
  },
  components: {
    dashBoard: DashBoard,
    signUp: SignUp,
    knotraInfo: KnotraInfo
  },
  props: [
    'isLoggedIn',
    'id'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#homepage {
    width: 100%;
}
.info {
    display: inline-block;
    width: 70%;
    float: left;
    border-style: solid;
    border-width: 1px;
    border-color: #d6d9dd;;
}

.signup {
    display: inline-block;
    width: 30%;
    float:right;
    background-color: #2f94a1;
    margin: 0 0 10px 0;
}
</style>

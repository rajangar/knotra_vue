<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'SignUpPage',
  data () {
    return {
      msg: 'Welcome to Sign Up Page'
    }
  },
  props: [
    'firstName',
    'lastName',
    'email'
  ],
  created () {
    console.log('firstname: ' + this.firstName)
    if (this.firstName == undefined) {
        this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
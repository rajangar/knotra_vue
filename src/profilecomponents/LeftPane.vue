<template>
  <div class="hello">
    <div v-if="photoAvailable">
        <img id="avatar" :src="photo" />
    </div>
    <div v-else>
        <img id="avatar" src="../assets/man.jpg" />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import {HTTP} from '@/backend/index.js'
export default {
  name: 'LeftPane',
  data () {
    return {
      photo: {},
      photoAvailable: false,
      errors: []
    }
  },
  created () {
    const config = {
        params: {
            userid: this.userid
        },
        responseType: 'blob'
    };
    HTTP.get ('getAvatar', config).then(response => {
      var reader = new window.FileReader()
      reader.readAsDataURL(response.data)
      reader.onload = function() {
        console.log(reader.result)
        this.photo = reader.result
        this.photoAvailable = true
      }.bind(this)
    }).catch(e => {
      console.log('error')
      this.errors.push(e)
    })
  },
  props: [
    'id',
    'userid'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#avatar {
    width: 50%;
    height: 100%;
    margin: 20px 0 0 0;
}

</style>

<template>
  <div class="hello">
    <div id="border">
    </div>
    <div v-if="imgDataUrl">
	    <img id="avatar" :src="imgDataUrl">
    </div>
    <div v-else>
      <div v-if="photoAvailable">
        <img id="avatar" :src="photo" />
      </div>
      <div v-else>
        <img id="avatar" src="../assets/man.jpg" />
      </div>
    </div>
    
    <h2>{{currentProfile.firstName + ' ' + currentProfile.lastName}}</h2>
    <h3>{{currentProfile.designation}}</h3>
    <slot></slot>
  </div>
</template>

<script>
import {HTTP} from '@/backend/index.js'
import {CurrentProfile, NewProfile} from '@/profilecomponents/ProfileInfo.js'

export default {
  name: 'LeftPane',
  data () {
    return {
      photo: {},
      photoAvailable: false,
      errors: [],
      currentProfile: CurrentProfile,
      newProfile: NewProfile
    }
  },
  created () {
    this.$parent.$on('remove', this.removePhoto);
    /* const config = {
        params: {
            userid: this.userid
        },
        responseType: 'blob'
    };
    HTTP.get ('getAvatar', config).then(response => {
      console.log('GetAvatar')
      var reader = new window.FileReader()
      reader.readAsDataURL(response.data)
      reader.onload = function() {
        // console.log(reader.result)
        this.photo = reader.result
        this.photoAvailable = true
      }.bind(this)
    }).catch(e => {
      console.log('error')
      this.errors.push(e)
    }) */
    console.log('11Avatar not empty: ' + CurrentProfile.avatar[100] + CurrentProfile.avatar[101])
    if(this.currentProfile.avatar != '') {
      console.log('Avatar not empty: ' + this.currentProfile.avatar[100] + this.currentProfile.avatar[101] +
      this.newProfile.avatar[100] + this.newProfile.avatar[101])
      this.photo = this.currentProfile.avatar
      this.photoAvailable = true
    } else {
      this.photo = this.currentProfile.avatar
      this.photoAvailable = false
    }
    console.log('Check leftpane created')
    this.$watch('currentProfile.avatar', function(newVal, oldVal) {
      console.log('CurrentProfile Avatar changed')
      if(this.currentProfile.avatar != '') {
        this.photo = this.currentProfile.avatar
        this.photoAvailable = true
      } else {
        this.photo = this.currentProfile.avatar
        this.photoAvailable = false
      }
    })
  },
  watch: {
    /* photo: function (newVal) {
    } */
  },
  props: [
    'id',
    'userid',
    'imgDataUrl'
  ],
  methods: {
    removePhoto: function () {
      this.photoAvailable = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#border {
    height: 55px;
    background-color: #2f94a1;
}

h2 {
    margin: 0 0 0 0;
}

h3 {
    margin: 0 0 0 0;
}

#avatar {
    width: 100px;
    height: 100px;
    margin: 20px 0 0 0;
}

</style>

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
    
    <slot></slot>

    <h2>{{currentProfile.firstName + ' ' + currentProfile.lastName}}</h2>
    <h3>{{currentProfile.designation}}</h3>
    <table class="table">
        <tr>
        <td class="n1-n1">Status</td>
        <td class="n1-n2"><small style="background-color: green; color: white; padding: 5px;">Active</small></td>
        </tr>
        <tr>
        <td class="n1-n1">User Rating</td>
        <td class="n1-n2">
            <i class="star">
            </i>
            <i class="star">
            </i>
            <i class="star">
            </i>
            <i class="star">
            </i>
            <i class="star">
            </i>
        </td>
        </tr>
        <tr>
        <td class="n1-n1">Member Since</td>
        <td class="n1-n2">Jan 7, 2017</td>
        </tr>
    </table>
    
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

.table {
    margin-top: 20px;
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
}

.n1-n1 {
    width: 50%;
    max-width: 50%;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px;
}

.n1-n2 {
    width: 50%;
    max-width: 50%;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px;
}

.star {
    font-family: FontAwesome;
    font-style: normal;
    color: orange;
}

.star:before {
    content: "\f005";
}

</style>

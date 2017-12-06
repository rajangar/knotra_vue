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
        <tbody>
        <tr>
        <td class="statushdr" style="width: 60%">Status</td>
        <td><span class="status">Active</span></td>
        </tr>
        <tr>
        <td>User Rating</td>
        <td>
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
        <td>Member Since</td>
        <td>Jan 7, 2017</td>
        </tr>
        </tbody>
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
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    background-color: transparent;
    border-spacing: 0;
    border-collapse: collapse;
    display: table;
    margin-top: 20px !important;
}

tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}

tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

td {
    padding: 8px 15px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
    display: table-cell;
}

.statushdr {
    padding: 8px 15px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
}

.status {
    background-color: #5cb85c;
    display: inline;
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
}

.star {
    
}

.star:before {
    content: "\f005";
    color: #f89c2c !important;
    width: 1.28571429em;
    text-align: center;
    display: inline-block;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
}

</style>

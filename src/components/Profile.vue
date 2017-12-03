<template>
  <div class="hello">
    <left-pane class="leftpane" :id="id" :userid="userid" :img-data-url="imgDataUrl"
    :first-name="firstName" :last-name="lastName">
    <button id="edit" type="submit" @click="editPhoto">Edit Photo</button>
    <button id="remove" type="submit" @click="removePhoto">Remove Photo</button>
    <button id="save" type="submit" @click="savePhoto" :disabled="!saveEnable">Save it as your profile</button>
    <my-upload field="img"
        @crop-success="cropSuccess"
        langType="en"
        v-model="show"
		    :width="150"
		    :height="150"
        :noRotate="false"
        img-format="png"></my-upload>
    </left-pane>
    <center-pane class="centerpane"></center-pane>
  </div>
</template>

<script>
import {HTTP} from '@/backend/index.js'
import LeftPane from '@/profilecomponents/LeftPane'
import CenterPane from '@/profilecomponents/CenterPane'
import {CurrentProfile, NewProfile} from '@/profilecomponents/ProfileInfo.js'

import 'babel-polyfill';
import myUpload from 'vue-image-crop-upload'

export default {
  name: 'Profile',
  data () {
    return {
      profileInfo: [],
      errors: [],
      show: false,
      imgDataUrl: '',
      saveEnable: false,
      firstName: '',
      lastName: '',
      currentProfile: CurrentProfile,
      newProfile: NewProfile
    }
  },
  props: [
    'userid',
    'id',
    'cnt'
  ],
  components: {
    LeftPane,
    CenterPane,
    myUpload
  },
  /* created () {
    this.getProfile()
  },
  watch: {
    id: function (val) {
      this.getProfile()
    },
    cnt: function (val) {
      console.log('cnt: ' + this.cnt)
      this.getProfile()
    }
  }, */
  methods: {
    getProfile: function () {
      HTTP.get(`getProfileById`, {
        params: {
          userid: this.userid,
          id: this.id
        }
      }).then(response => {
        this.profileInfo = JSON.stringify(response.data)
        this.firstName = response.data.data[0].firstname
        this.lastName = response.data.data[0].lastname
        console.log('4-profileInfo: ' + this.profileInfo)
      }).catch(e => {
        this.errors.push(e)
      })
    },
    editPhoto: function (event) {
      event.preventDefault()
      this.toggleShow()
    },
    removePhoto: function (event) {
      event.preventDefault()
      this.imgDataUrl = ''
      this.$emit('remove')
      this.saveEnable = true
    },
    savePhoto: function (event) {
      event.preventDefault()
      this.saveEnable = false
      this.currentProfile.avatar = this.imgDataUrl
      if (this.imgDataUrl == '') {
        HTTP.post ('removePicture', {
          userid: this.userid
        }).then(response => {
          console.log(response.data)
        }).catch(e => {
          this.errors.push(e)
        })
        return
      }
      var blob = this.dataURLtoBlob(this.imgDataUrl)
      // console.log('blob: ' + blob)
      
      var form = new FormData()
      form.append('userid', this.userid)
      form.append('avatar', blob, 'abc.png')
      
      const config = { headers: { 'content-type': 'multipart/form-data' } }
      
      HTTP.post ('savePicture', form, config).then(response => {
        console.log(response.data)
        this.imgDataUrl = ''
      }).catch(e => {
        this.errors.push(e)
      })
    },
    dataURLtoBlob: function (dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
    },
    toggleShow() {
				this.show = !this.show;
		},
		cropSuccess(imgDataUrl, field){
			// console.log('-------- crop success --------' + imgDataUrl + '\nfield: ' + field)
			this.imgDataUrl = imgDataUrl
      this.saveEnable = true
		}
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
    margin: 0 20px 10px 0;
    border-style: solid;
    border-width: 1px;
    border-color: #d6d9dd;
}

/* #edit, #remove {
    margin: 10px 5px 0px 5px;
    font-size: 17px;
    font-weight: 400;
    display: inline-block;
    line-height: 24px;
    height: 35px;
    padding: 0 2px;
    width: auto;
    color: #d6d9dd;
    background-color: #2f94a1;
} */

#edit, #remove, #save {
	-moz-box-shadow: 3px 4px 0px 0px #899599;
	-webkit-box-shadow: 3px 4px 0px 0px #899599;
	box-shadow: 3px 4px 0px 0px #899599;
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #ededed), color-stop(1, #bab1ba));
	background:-moz-linear-gradient(top, #ededed 5%, #bab1ba 100%);
	background:-webkit-linear-gradient(top, #ededed 5%, #bab1ba 100%);
	background:-o-linear-gradient(top, #ededed 5%, #bab1ba 100%);
	background:-ms-linear-gradient(top, #ededed 5%, #bab1ba 100%);
	background:linear-gradient(to bottom, #ededed 5%, #bab1ba 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ededed', endColorstr='#bab1ba',GradientType=0);
	background-color:#ededed;
	-moz-border-radius:15px;
	-webkit-border-radius:15px;
	border-radius:15px;
	border:1px solid #d6bcd6;
	display:inline-block;
	cursor:pointer;
	color:#3a8a9e;
	font-family:Arial;
	font-size:12px;
	padding:7px 5px;
	text-decoration:none;
	text-shadow:0px 1px 0px #e1e2ed;
  outline: 0px solid transparent;
}

#save {
  margin: 10px;
}

#edit:hover, #remove:hover, #save:hover:enabled {
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #bab1ba), color-stop(1, #ededed));
	background:-moz-linear-gradient(top, #bab1ba 5%, #ededed 100%);
	background:-webkit-linear-gradient(top, #bab1ba 5%, #ededed 100%);
	background:-o-linear-gradient(top, #bab1ba 5%, #ededed 100%);
	background:-ms-linear-gradient(top, #bab1ba 5%, #ededed 100%);
	background:linear-gradient(to bottom, #bab1ba 5%, #ededed 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#bab1ba', endColorstr='#ededed',GradientType=0);
	background-color:#bab1ba;
}

#edit:active, #remove:active, #save:active:enabled {
	position:relative;
	top:1px;
  outline: 0px solid transparent;
}

#save:disabled {
  color: grey;
  cursor: default;
}

/* #save {
    margin: 10px 5px 10px 5px;
    font-size: 17px;
    font-weight: 400;
    display: inline-block;
    line-height: 24px;
    height: 35px;
    padding: 0 2px;
    width: auto;
    color: #d6d9dd;
    background-color: #2f94a1;
} */
</style>
<template>
  <div class="hello">
    <h1>Profile {{ userid }} {{ id }} </h1>
    <h1> {{ profileInfo }} </h1>
    <left-pane class="leftpane" :id="id" :userid="userid" :img-data-url="imgDataUrl">
    <button type="submit" @click="editPhoto">Edit Image</button>
    <my-upload field="img"
        @crop-success="cropSuccess"
        langType="en"
        v-model="show"
		    :width="200"
		    :height="200"
		    img-format="png"></my-upload>
    </left-pane>
    <center-pane class="centerpane"></center-pane>
  </div>
</template>

<script>
import {HTTP} from '@/backend/index.js'
import LeftPane from '@/profilecomponents/LeftPane'
import CenterPane from '@/profilecomponents/CenterPane'

import 'babel-polyfill';
import myUpload from 'vue-image-crop-upload'

export default {
  name: 'Profile',
  data () {
    return {
      profileInfo: [],
      errors: [],
      show: false,
      imgDataUrl: ''
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
  created () {
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
      this.toggleShow()
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
      
      var blob = this.dataURLtoBlob(imgDataUrl)
      // console.log('blob: ' + blob)
      
      var form = new FormData()
      form.append('userid', this.userid)
      form.append('avatar', blob, 'abc.png')
      
      const config = { headers: { 'content-type': 'multipart/form-data' } }
      
      HTTP.post ('savePicture', form, config).then(response => {
        console.log(response.data)
      }).catch(e => {
        this.errors.push(e)
      })
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
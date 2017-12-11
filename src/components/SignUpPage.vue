<template>
  <div class="hello">
    <h1>Sign Up:</h1>
    <div>
    <form id="signupform">
        <br>
        <label id="labelFname">*First Name:</label>
        <br>
        <input type="text" v-bind:class="[fname_highlight ? 'fname_high' : '']" id="fname" tabindex="1" v-model.lazy="fName" @blur="checkFName" @focus="correctFName">
        <span id="sideMessage" v-if="fname_highlight">FirstName should not be empty</span>
        <br>
        <br>
        <label id="labelLname">*Last Name:</label>
        <br>
        <input type="text" v-bind:class="[lname_highlight ? 'lname_high' : '']" id="lname" tabindex="1" v-model.lazy="lName" @blur="checkLName" @focus="correctLName">
        <span id="sideMessage" v-if="lname_highlight">LastName should not be empty</span>
        <br>
        <br>
        <label id="labelEmail">*Email:</label>
        <br>
        <input type="text" v-bind:class="[email_highlight ? 'email_high' : '']" id="email" tabindex="1" v-model.lazy="emaill" @blur="checkEmail" @focus="correctEmail">
        <span id="sideMessage" v-if="emailEmpty">Email should not be empty</span>
        <span id="sideMessage" v-if="!emailFormat">Email Format is not correct</span>
        <span id="sideMessage" v-if="emailUsed">Email is already used</span>
        <br>
        <br>
        <label id="labelUid">*UserId:</label>
        <br>
        <input type="text" v-bind:class="[userid_highlight ? 'uid_high' : '']" id="userid" required tabindex="1" v-model.lazy="userid" @blur="checkUserId" @focus="correctUserId">
        <span id="sideMessage" v-if="uidEmpty">UserId should not be empty</span>
        <span id="sideMessage" v-if="!uidFormat">Only Alphanumeric and '_' is allowed</span>
        <span id="sideMessage" v-if="uidUsed">UserId is already used</span>
        <br>
        <br>
        <label id="labelPwd">*Password (more than 7 characters):</label>
        <br>
        <input type="password" v-bind:class="[password_highlight ? 'pwd_high' : '']" id="password" required tabindex="1" v-model.lazy="password" @blur="checkPassword" @focus="correctPassword">
        <span id="sideMessage" v-if="pwdEmpty">Password should not be empty</span>
        <span id="sideMessage" v-if="!pwdFormat">Password should be more than 7 characters and alphanumeric or _@.- symbols can be used</span>
        <br>
        <br>
        <label id="labelCnfPwd">*Confirm Password:</label>
        <br>
        <input type="password" v-bind:class="[cnf_password_highlight ? 'cnf_pwd_high' : '']" id="cnfpassword" required tabindex="1" v-model.lazy="cnfPassword" @blur="checkCnfPwd" @focus="correctCnfPwd">
        <span id="sideMessage" v-if="!cnfpwdFormat">Passwords do not match</span>
        <br>
        <br>
        <label id="labelGender">*Gender:</label>
        <br>
        <select class="genderBox" v-model="gender" v-bind:class="[gender_highlight ? 'gender_high' : '']" @blur="checkGender" @focus="correctGender">
          <option disabled value="">Please select one</option>
          <option>Male</option>
          <option>Female</option>
          <option>Others</option>
        </select>
        <span id="sideMessage" v-if="!genderFormat">Please select one</span>
        <br>
        <br>
        <label id="labelCountry">*Country:</label>
        <br>
        <select class="country" v-model="country" v-bind:class="[country_highlight ? 'country_high' : '']" @blur="checkCountry" @focus="correctCountry">
        <option disabled value="">Please select one</option>
    <option value="Afghanistan">Afghanistan</option>
    <option value="Albania">Albania</option>
    <option value="Algeria">Algeria</option>
    <option value="American Samoa">American Samoa</option>
    <option value="Andorra">Andorra</option>
    <option value="Angola">Angola</option>
    <option value="Anguilla">Anguilla</option>
    <option value="Antartica">Antarctica</option>
    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
    <option value="Argentina">Argentina</option>
    <option value="Armenia">Armenia</option>
    <option value="Aruba">Aruba</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Azerbaijan">Azerbaijan</option>
    <option value="Bahamas">Bahamas</option>
    <option value="Bahrain">Bahrain</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="Barbados">Barbados</option>
    <option value="Belarus">Belarus</option>
    <option value="Belgium">Belgium</option>
    <option value="Belize">Belize</option>
    <option value="Benin">Benin</option>
    <option value="Bermuda">Bermuda</option>
    <option value="Bhutan">Bhutan</option>
    <option value="Bolivia">Bolivia</option>
    <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
    <option value="Botswana">Botswana</option>
    <option value="Bouvet Island">Bouvet Island</option>
    <option value="Brazil">Brazil</option>
    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
    <option value="Brunei Darussalam">Brunei Darussalam</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="Burkina Faso">Burkina Faso</option>
    <option value="Burundi">Burundi</option>
    <option value="Cambodia">Cambodia</option>
    <option value="Cameroon">Cameroon</option>
    <option value="Canada">Canada</option>
    <option value="Cape Verde">Cape Verde</option>
    <option value="Cayman Islands">Cayman Islands</option>
    <option value="Central African Republic">Central African Republic</option>
    <option value="Chad">Chad</option>
    <option value="Chile">Chile</option>
    <option value="China">China</option>
    <option value="Christmas Island">Christmas Island</option>
    <option value="Cocos Islands">Cocos (Keeling) Islands</option>
    <option value="Colombia">Colombia</option>
    <option value="Comoros">Comoros</option>
    <option value="Congo">Congo</option>
    <option value="Congo">Congo, the Democratic Republic of the</option>
    <option value="Cook Islands">Cook Islands</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="Cota D'Ivoire">Cote d'Ivoire</option>
    <option value="Croatia">Croatia (Hrvatska)</option>
    <option value="Cuba">Cuba</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czech Republic">Czech Republic</option>
    <option value="Denmark">Denmark</option>
    <option value="Djibouti">Djibouti</option>
    <option value="Dominica">Dominica</option>
    <option value="Dominican Republic">Dominican Republic</option>
    <option value="East Timor">East Timor</option>
    <option value="Ecuador">Ecuador</option>
    <option value="Egypt">Egypt</option>
    <option value="El Salvador">El Salvador</option>
    <option value="Equatorial Guinea">Equatorial Guinea</option>
    <option value="Eritrea">Eritrea</option>
    <option value="Estonia">Estonia</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
    <option value="Faroe Islands">Faroe Islands</option>
    <option value="Fiji">Fiji</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="France Metropolitan">France, Metropolitan</option>
    <option value="French Guiana">French Guiana</option>
    <option value="French Polynesia">French Polynesia</option>
    <option value="French Southern Territories">French Southern Territories</option>
    <option value="Gabon">Gabon</option>
    <option value="Gambia">Gambia</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Ghana">Ghana</option>
    <option value="Gibraltar">Gibraltar</option>
    <option value="Greece">Greece</option>
    <option value="Greenland">Greenland</option>
    <option value="Grenada">Grenada</option>
    <option value="Guadeloupe">Guadeloupe</option>
    <option value="Guam">Guam</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Guinea">Guinea</option>
    <option value="Guinea-Bissau">Guinea-Bissau</option>
    <option value="Guyana">Guyana</option>
    <option value="Haiti">Haiti</option>
    <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
    <option value="Holy See">Holy See (Vatican City State)</option>
    <option value="Honduras">Honduras</option>
    <option value="Hong Kong">Hong Kong</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="India">India</option>
    <option value="Indonesia">Indonesia</option>
    <option value="Iran">Iran (Islamic Republic of)</option>
    <option value="Iraq">Iraq</option>
    <option value="Ireland">Ireland</option>
    <option value="Israel">Israel</option>
    <option value="Italy">Italy</option>
    <option value="Jamaica">Jamaica</option>
    <option value="Japan">Japan</option>
    <option value="Jordan">Jordan</option>
    <option value="Kazakhstan">Kazakhstan</option>
    <option value="Kenya">Kenya</option>
    <option value="Kiribati">Kiribati</option>
    <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
    <option value="Korea">Korea, Republic of</option>
    <option value="Kuwait">Kuwait</option>
    <option value="Kyrgyzstan">Kyrgyzstan</option>
    <option value="Lao">Lao People's Democratic Republic</option>
    <option value="Latvia">Latvia</option>
    <option value="Lebanon" selected>Lebanon</option>
    <option value="Lesotho">Lesotho</option>
    <option value="Liberia">Liberia</option>
    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
    <option value="Liechtenstein">Liechtenstein</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option value="Macau">Macau</option>
    <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
    <option value="Madagascar">Madagascar</option>
    <option value="Malawi">Malawi</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Maldives">Maldives</option>
    <option value="Mali">Mali</option>
    <option value="Malta">Malta</option>
    <option value="Marshall Islands">Marshall Islands</option>
    <option value="Martinique">Martinique</option>
    <option value="Mauritania">Mauritania</option>
    <option value="Mauritius">Mauritius</option>
    <option value="Mayotte">Mayotte</option>
    <option value="Mexico">Mexico</option>
    <option value="Micronesia">Micronesia, Federated States of</option>
    <option value="Moldova">Moldova, Republic of</option>
    <option value="Monaco">Monaco</option>
    <option value="Mongolia">Mongolia</option>
    <option value="Montserrat">Montserrat</option>
    <option value="Morocco">Morocco</option>
    <option value="Mozambique">Mozambique</option>
    <option value="Myanmar">Myanmar</option>
    <option value="Namibia">Namibia</option>
    <option value="Nauru">Nauru</option>
    <option value="Nepal">Nepal</option>
    <option value="Netherlands">Netherlands</option>
    <option value="Netherlands Antilles">Netherlands Antilles</option>
    <option value="New Caledonia">New Caledonia</option>
    <option value="New Zealand">New Zealand</option>
    <option value="Nicaragua">Nicaragua</option>
    <option value="Niger">Niger</option>
    <option value="Nigeria">Nigeria</option>
    <option value="Niue">Niue</option>
    <option value="Norfolk Island">Norfolk Island</option>
    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
    <option value="Norway">Norway</option>
    <option value="Oman">Oman</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Palau">Palau</option>
    <option value="Panama">Panama</option>
    <option value="Papua New Guinea">Papua New Guinea</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Peru">Peru</option>
    <option value="Philippines">Philippines</option>
    <option value="Pitcairn">Pitcairn</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Puerto Rico">Puerto Rico</option>
    <option value="Qatar">Qatar</option>
    <option value="Reunion">Reunion</option>
    <option value="Romania">Romania</option>
    <option value="Russia">Russian Federation</option>
    <option value="Rwanda">Rwanda</option>
    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
    <option value="Saint LUCIA">Saint LUCIA</option>
    <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
    <option value="Samoa">Samoa</option>
    <option value="San Marino">San Marino</option>
    <option value="Sao Tome and Principe">Sao Tome and Principe</option> 
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Senegal">Senegal</option>
    <option value="Seychelles">Seychelles</option>
    <option value="Sierra">Sierra Leone</option>
    <option value="Singapore">Singapore</option>
    <option value="Slovakia">Slovakia (Slovak Republic)</option>
    <option value="Slovenia">Slovenia</option>
    <option value="Solomon Islands">Solomon Islands</option>
    <option value="Somalia">Somalia</option>
    <option value="South Africa">South Africa</option>
    <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
    <option value="Span">Spain</option>
    <option value="SriLanka">Sri Lanka</option>
    <option value="St. Helena">St. Helena</option>
    <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
    <option value="Sudan">Sudan</option>
    <option value="Suriname">Suriname</option>
    <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
    <option value="Swaziland">Swaziland</option>
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="Syria">Syrian Arab Republic</option>
    <option value="Taiwan">Taiwan, Province of China</option>
    <option value="Tajikistan">Tajikistan</option>
    <option value="Tanzania">Tanzania, United Republic of</option>
    <option value="Thailand">Thailand</option>
    <option value="Togo">Togo</option>
    <option value="Tokelau">Tokelau</option>
    <option value="Tonga">Tonga</option>
    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
    <option value="Tunisia">Tunisia</option>
    <option value="Turkey">Turkey</option>
    <option value="Turkmenistan">Turkmenistan</option>
    <option value="Turks and Caicos">Turks and Caicos Islands</option>
    <option value="Tuvalu">Tuvalu</option>
    <option value="Uganda">Uganda</option>
    <option value="Ukraine">Ukraine</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="United States">United States</option>
    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Uzbekistan">Uzbekistan</option>
    <option value="Vanuatu">Vanuatu</option>
    <option value="Venezuela">Venezuela</option>
    <option value="Vietnam">Viet Nam</option>
    <option value="Virgin Islands (British)">Virgin Islands (British)</option>
    <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
    <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
    <option value="Western Sahara">Western Sahara</option>
    <option value="Yemen">Yemen</option>
    <option value="Yugoslavia">Yugoslavia</option>
    <option value="Zambia">Zambia</option>
    <option value="Zimbabwe">Zimbabwe</option>
</select>
        <span id="sideMessage" v-if="!countryFormat">Please select one country</span>
        <br>
        <input type="checkbox" v-bind:class="[agree_highlight ? 'agree_high' : '']" id="terms" v-model="agreed" @focus="correctAgree">
        <label for="checkbox" id="labelTerms">Agree for <router-link to="/terms">terms and conditions</router-link></label>
        <br>
        <br>
        <vue-recaptcha id="recaptcha" sitekey="6LeJcjoUAAAAALHJl7zs_u-V8UbnKGTbyeKhiMX6" v-on:verify="val => g_recaptcha_response = val"></vue-recaptcha>
        <span id="sideMessage" class="captchaerror" v-if="!recaptchaUsed">Recaptcha Error</span>
        <br>
        <button tabindex="1" id="submit" type="submit" :disabled="wait" @click="submit">Submit</button>
    </form>
    <br>
    </div>
  </div>
</template>

<script>
import {HTTP} from '@/backend/index.js'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'SignUpPage',
  data () {
    return {
      fName: '',
      lName: '',
      emaill: '',
      userid: '',
      password: '',
      cnfPassword: '',
      gender: '',
      country: '',
      agreed: false,
      userid_highlight: false,
      password_highlight: false,
      fname_highlight: false,
      lname_highlight: false,
      email_highlight: false,
      cnf_password_highlight: false,
      gender_highlight: false,
      country_highlight: false,
      agree_highlight: false,
      emailFormat: true,
      emailUsed: false,
      emailEmpty: false,
      uidFormat: true,
      uidUsed: false,
      uidEmpty: false,
      pwdFormat: true,
      pwdEmpty: false,
      cnfpwdFormat: true,
      genderFormat: true,
      countryFormat: true,
      g_recaptcha_response: '',
      recaptchaUsed: true,
      wait: false,
      errors: []
    }
  },
  props: [
    'firstName',
    'lastName',
    'email',
    'isLoggedIn'
  ],
  components: {
    VueRecaptcha
  },
  created () {
    console.log('isLoggedIn: ' + this.$cookie.get('isLoggedIn'))
    if (this.$cookie.get('isLoggedIn') && this.$cookie.get('isLoggedIn') == "true") {
      this.$router.push('/')
    }
    console.log('firstname: ' + this.firstName)
    if (this.firstName == undefined) {
      this.$router.push('/')
    }
    this.fName = this.firstName
    this.lName = this.lastName
    this.emaill = this.email
  },
  watch: {
    isLoggedIn: function (val) {
      console.log('SignUpPage: logging: ' + val)
      if (val)
        this.$router.push('/')
    }
  },
  methods: {
    /* recaptchaResponse: function (val) {
      console.log('verify called')
      this.g_recaptcha_response = val
    }, */
    submit: function (event) {
      event.preventDefault()
      var status = true
      status = this.checkFName()
      status = this.checkLName()
      status = this.checkEmail()
      status = this.checkUserId()
      status = this.checkPassword()
      status = this.checkCnfPwd()
      status = this.checkGender()
      status = this.checkCountry()
      if(!this.agreed) {
        this.agree_highlight = true
        status = false
      }
      console.log('response = ' + this.g_recaptcha_response)
      // var url= 'https://www.google.com/recaptcha/api/siteverify?secret=6LeJcjoUAAAAAFBSIYNzcZleibkmG6HMligiKvMS&response=' + this.g_recaptcha_response
      // axios.post(`https://www.google.com/recaptcha/api/siteverify`, {
        // secret: '6LeJcjoUAAAAAFBSIYNzcZleibkmG6HMligiKvMS',
        // response: this.g_recaptcha_response

      if (!status)
        return
      this.wait = true
      this.$emit('setWaiting', true)
      HTTP.get(`getEmailUser`, {
        params: {
          email: this.emaill,
        }
      }).then(response => {
        if (response.data.status == 'success') {
          this.email_highlight = true
          this.emailUsed = true
          status = false
          this.wait = false
          this.$emit('setWaiting', false)
        }
        HTTP.get(`getIdUser`, {
          params: {
            userid: this.userid,
          }
        }).then(response1 => {
          if (response1.data.status == 'success') {
            this.userid_highlight = true
            this.uidUsed = true
            status = false
            this.wait = false
            this.$emit('setWaiting', false)
          }
          if (!status) {
            return
          }
          
          HTTP.post(`addProfile`, {
              g_recaptcha_response: this.g_recaptcha_response,
              userid: this.userid,
              email: this.emaill,
              firstName: this.fName,
              lastName: this.lName,
              gender: this.gender,
              phone: '',
              address: '',
              city: '',
              country: this.country,
              s_expert: '',
              s_ready_to_help: '',
              s_to_learn: '',
              ratings: '',
              credits: '',
              credits_to_provide: '',
              helper_response_per: '',
              help_take_response_per: '',
              help_taker_pages_id: '',
              help_provider_pages_id: '',
              reviews: '',
              profile_summary: '',
              profile_explanation: '',
              password: this.password
          }).then(response2 => {
            if (response2.data.status == 'success') {
              console.log('added')
              this.$cookie.set('userid', this.userid, 1)
              this.$cookie.set('password', this.password, 1)
              this.wait = false
              this.$emit('setWaiting', false)
              this.$router.push('/confirmemail/' + this.userid + '&' + this.email)
            } else if (response2.data.status == 'errorcaptcha') {
              this.wait = false
              this.$emit('setWaiting', false)
              this.recaptchaUsed = false
              setTimeout(function () {
                this.recaptchaUsed = true
              }.bind(this), 2000)
            }
          }).catch(e => {
            this.wait = false
            this.$emit('setWaiting', false)
            this.errors.push(e)
          })
        }).catch(e => {
          this.errors.push(e)
        })
      }).catch(e => {
        this.errors.push(e)
      })
    },
    correctAgree: function () {
      this.agree_highlight = false
    },
    checkFName: function () {
      console.log('Check FName')
      if(this.fName == '' || /[^a-zA-Z0-9_@.-]/.test(this.fName)) {
        this.fname_highlight = true
        return false  
      }
      return true
    },
    correctFName: function () {
      this.fname_highlight = false
    },
    checkLName: function () {
      console.log('Check LName')
      if(this.lName == '' || /[^a-zA-Z0-9_@.-]/.test(this.lName)) {
        this.lname_highlight = true
        return false
      }
      return true
    },
    correctLName: function () {
      this.lname_highlight = false
    },
    checkEmail: function () {
      console.log('Check Email')
      if(this.emaill == '') {
        this.email_highlight = true
        this.emailEmpty = true
        return false
      }
      if(!this.emaill.match('@') || this.emaill.match(' ') || /[^a-zA-Z0-9_@.-]/.test(this.emaill)) {
        console.log('Email is incorrect')
        this.email_highlight = true
        this.emailFormat = false
        return false
      }
      /* HTTP.get(`getEmailUser`, {
        params: {
          email: this.emaill,
        }
      }).then(response => {
        if (response.data.status == 'success') {
          this.email_highlight = true
          this.emailUsed = true
          return false
        }
      }).catch(e => {
        this.errors.push(e)
      }) */
      return true
    },
    correctEmail: function () {
      this.emailFormat = true
      this.email_highlight = false
      this.emailUsed = false
      this.emailEmpty = false
    },
    checkUserId: function () {
      console.log('Check UserId')
      if(this.userid == '') {
        this.userid_highlight = true
        this.uidEmpty = true
        return false
      }
      if(/[^a-zA-Z0-9_]/.test(this.userid)) {
        console.log('UserId is incorrect')
        this.userid_highlight = true
        this.uidFormat = false
        return false
      }
      /* HTTP.get(`getIdUser`, {
        params: {
          userid: this.userid,
        }
      }).then(response => {
        if (response.data.status == 'success') {
          this.userid_highlight = true
          this.uidUsed = true
          return false
        }
      }).catch(e => {
        this.errors.push(e)
      }) */
      return true
    },
    correctUserId: function () {
      this.uidFormat = true
      this.userid_highlight = false
      this.uidUsed = false
      this.uidEmpty = false
    },
    checkPassword: function () {
      console.log('Check Password')
      if(this.password == '') {
        this.password_highlight = true
        this.pwdEmpty = true
        return false
      }
      if(this.password.length < 8 || /[^a-zA-Z0-9_@.-]/.test(this.password)) {
        console.log('Password is incorrect')
        this.password_highlight = true
        this.pwdFormat = false
        return false
      }
      return true
    },
    correctPassword: function () {
      this.pwdFormat = true
      this.password_highlight = false
      this.pwdEmpty = false
      this.correctCnfPwd()
    },
    checkCnfPwd: function () {
      console.log('Check confirm Password')
      if(this.cnfPassword != this.password) {
        this.cnf_password_highlight = true
        this.cnfpwdFormat = false
        return false
      }
      return true
    },
    correctCnfPwd: function () {
      this.cnfpwdFormat = true
      this.cnf_password_highlight = false
    },
    checkGender: function () {
      console.log('Check Gender')
      if(this.gender == '') {
        this.gender_highlight = true
        this.genderFormat = false
        return false
      }
      return true
    },
    correctGender: function () {
      this.genderFormat = true
      this.gender_highlight = false
    },
    checkCountry: function () {
      console.log('Check Country')
      if(this.country == '') {
        this.country_highlight = true
        this.countryFormat = false
        return false
      }
      return true
    },
    correctCountry: function () {
      this.countryFormat = true
      this.country_highlight = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  width:100%;
  text-align: left;
  background-color: grey;
  color: black;
  padding-left: 10px;
}

#signupform {
    width: 50%;
    border: 1px solid grey;
    text-align: left;
}

#labelUid, #labelPwd, #labelFname, #labelLname, #labelEmail, #labelCnfPwd, #labelGender, #labelCountry, #terms {
    margin: 20px 0 0 20px;
    color: black;
}

#labelTerms {
    color: black;
}

#userid, #password, #fname, #lname, #email, #cnfpassword, .genderBox, .country {
    display: inline-block;
    width: 50%;
    line-height: 16px;
    font-weight: 400;
    font-size: 13px;
    height: 35px;
    margin: 0 0 0 20px;
    padding: 0 10px;
    background: #d6d9dd;
}

.uid_high, .pwd_high, .fname_high, .lname_high, .email_high, .cnf_pwd_high, .gender_high, .country_high {
    border-color: red;
}

.agree_high {
    outline: 1px solid red;
}

#submit {
    margin: 10px 0 20px 20%;
    font-size: 17px;
    font-weight: 400;
    display: inline-block;
    line-height: 24px;
    height: 35px;
    padding: 0 20px;
    width: auto;
    color: #d6d9dd;
    background-color: grey;
}

#recaptcha {
    margin: 0 0 0 20px;
}

#sideMessage {
    color: red;
}

.captchaerror {
  margin-left: 20px;
}
</style>
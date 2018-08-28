<template>
 
<div class="logoutcomp">
  <div class="row justify-center container">
      <div class="col-12">
        <img src="~assets/logo_full.png"/>      
      </div>      
    <h5>DISPATCH SERVICE</h5>
    <!-- Errors -->
    <div v-if=response class="text-red"><p>{{response}}</p>
    </div>
    
    <div class="col-12">
      <br/>
      
      <br/>
      <!-- <q-btn class="full-width" color="secondary" @click=" doFBLogin">Sign in with FaceBook</q-btn> -->
     
       
    </div>
  </div>
</div>
</template>

<script>
import { QBtn, QIcon, QInput, QCard, QSpinner } from 'quasar'

import Vue from 'vue'
import GoogleAuth from 'vue-google-oauth'

export default {
  name: 'logoutcomponent',
  components: { QBtn, QIcon, QInput, QCard, QSpinner, Vue },
  data () {
    return {
      UserID:'',
      Password: '',
      response: '',
      serviceType: '',
      UserAuthenticated: false
    
    
    }
  },
   mounted()
   {
      console.log("In mounted section")
      var vm = this;
      
      Vue.googleAuth().signOut(function () { 
        console.log("successful Logout")
        vm.$root.UserAuthenticated = false;
        vm.$root.UserId='';
        vm.$router.push('/')

      }, function (error) {
        console.log("In error function")
         vm.$router.push('/')
      })
  
 }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'
.container
  margin 30px
  margin-top  150px

.alignleft
  text-align:left

h5
    color #F2C037
    font-weight 600




</style>

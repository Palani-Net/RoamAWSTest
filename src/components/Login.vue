<template>
  <div class="row justify-center container">
      <div class="col-12">
        <img src="~assets/logo_full.png"/>
      </div>
    <h2>DISPATCH SERVICE</h2>
    
    <div class="col-12 aligncenter" >
      <div v-if=errormessage class="text-red"><p>{{errormessage}}</p></div>
    </div>
    <div class="col-12 alignleft">
      <q-input v-model="UserID" float-label="User ID" dark color="warning" clearable/>
    </div>
    <div class="col-12 alignleft q-mt-sm">
      <q-input v-model="Password" float-label="Password" dark color="warning" type="password"  clearable/>
    </div>
    <div class="col-12">
      <br/>
      <q-btn class="full-width" color="secondary" @click="login">Login</q-btn>
      
  </div>
  <div class="col-12">
      <h5><font color="white">OR</font></h5>
  </div>
   <div class="col-12">
       <button class="google-signin-button" @click="loginGoogle"></button>
      
      
  </div>
</div>
</template>

<!--moved all the scripts to the seperate file LoginScript.js-->
<script>
import { QBtn, QIcon, QInput, QCard, QSpinner } from 'quasar'
import axios from 'axios'
import Vue from 'vue'
import GoogleAuth from 'vue-google-oauth'
   
export default {
  name: 'login',
  components: { QBtn, QIcon, QInput, QCard, QSpinner },
  data () {
    return {
      UserID:'',
      Password: '',
      errormessage: '',
      serviceType: '',
      UserAuthenticated: false,
      UserProfile: ''    

    }
  },
  methods:{
    login(){
      var vm = this
      //setting the user name to the root variable
        this.$root.UserId= this.UserID.trim().toLowerCase();
        //initializing the root variables
        this.$root.VIN = 'VIN';
        this.$root.UserAuthenticated=false;
        this.$root.PassengerCount = '1';
        this.$root.LocLatt = '';
        this.$root.LocLong = '';
        this.$root.LocLandmark = '';
        this.$root.LocAdditionalInfo = '';
        this.$root.PhoneNumber = 'phone';
        this.$root.Service='';
        console.log('Service value='+this.$root.Service)
        
        console.log('vm.UserID ='+vm.UserID)
        vm.$root.UserId = vm.UserID;
        console.log('root.UserId='+vm.$root.UserId);
        //alert("userID="+vm.$root.UserId)
        //axios.get('http://localhost:1271/api/getuserbyid/' + vm.$root.UserId )
        //.then(function (response) {
        //       vm.UserProfile = response.data
               //var mobile = vm.UserProfile.UserDetails.mobile;
        vm.getUserDetails('appAuth');
        //})   
    },
    getUserDetails(authService){
        var vm = this
        console.log('In getUserDetails:   vm.UserID ='+vm.$root.UserId)
        console.log('root.UserId='+vm.$root.UserId);
        //alert("userID="+vm.$root.UserId)
        axios.get(process.env.API + 'getuserbyid/' + vm.$root.UserId )
        .then(function (response) {
               vm.UserProfile = response.data
               //var mobile = vm.UserProfile.UserDetails.mobile;
              console.log("return data from api")
              console.log("")
              if (vm.UserProfile ==='') {
                vm.mobile='phone'
              } else {
                vm.mobile = vm.UserProfile.UserDetails.mobile
              }
              vm.$root.PhoneNumber = vm.mobile;
              console.log("vm.mobile="+vm.mobile)
              if (vm.mobile ==='phone'){
                console.log('in if statement')
                vm.$root.UserAuthenticated = false;
                vm.$router.push('/login')
                if (authService==='appAuth'){
                  vm.errormessage='Invalid user id or password, please try again';
                } else {
                  vm.errormessage='The Dispatch Service app has not been set up to use your Google Account.';
                  vm.googleLogout();
                }
                
              }else {
                console.log('valid userid')
                vm.$root.UserAuthenticated = true;
                //console.log('service='+vm.$root.Service)
                vm.$root.VehicleArray = vm.UserProfile.Vehicle;
                if (vm.$root.CaseType==='CreatACase'){
                    vm.$router.push('../app/servicescomp')
                }
                if (vm.$root.CaseType==='ExistingCase'){
                    vm.$router.push('../app/casedetailscomp')
                }

              }
        
        
      })

    },
    
    loginGoogle(){
      
      var vm = this
      console.log('In login')
      //setting the user name to the root variable
            
        //initializing the root variables
        this.$root.VIN = 'VIN';
        this.$root.UserAuthenticated=false;
        this.$root.PassengerCount = '1';
        this.$root.LocLatt = '';
        this.$root.LocLong = '';
        this.$root.LocLandmark = '';
        this.$root.LocAdditionalInfo = '';
        this.$root.PhoneNumber = 'phone';
        this.$root.Service='';
      
        Vue.googleAuth().directAccess();

        Vue.googleAuth().signIn(function (googleUser) {
         
          console.log("in googleAuth.signIn")
         
          console.log('basickprofile = ' + googleUser.getBasicProfile());
          var profile = googleUser.getBasicProfile();
           vm.$root.UserId = profile.getEmail(); 
          console.log("vm.root="+vm.$root.UserId)  
          console.log('ID: ' + profile.getId());
          console.log('Full Name: ' + profile.getName());
          console.log('Given Name: ' + profile.getGivenName());
          console.log('Family Name: ' + profile.getFamilyName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail());
          
         
          vm.$root.UserAuthenticated = true;
         
          console.log('in Login:UserAuthenticted='+vm.$root.UserAuthenticated)
          vm.getUserDetails('googleAuth');
         
        }, function (error) {
           this.response = 'Something went wrong'
           vm.$root.UserAuthenticated = false;
           vm.errormessage='Invalid user id or password, please try again'
            //this.$router.push('app/error')
        })

    
        
    },
    googleLogout(){
         var vm = this;
        Vue.googleAuth().signOut(function () { 
        console.log("successful Logout")
        vm.$root.UserAuthenticated = false;
        vm.$root.UserId='';
        
      }, function (error) {
        console.log("In error function")
      })

    }
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

.google-signin-button{
  /* This is where you control how the button looks. Be creative! */
  /*background-image: url("../css/btn_google_signin_dark_focus_web.png");*/
  background-image: url("../assets/google2_1.png");
   cursor: pointer;
  height: 52px; 
  border-radius: 3px;
  width: 250px;
  display: inline-block;
}

</style>

<template>
<div class="CreateCaseComp">

<div class="card">
<h4>Service Request Received</h4>
<div class="q-px-lg">Thank you, we've recieved your service Request
Your Roadside Service Request Number is
<div  class="case q-headline q-mt-lg">  <q-spinner-dots v-if="caseCreated!==true" size="40" color="warning" />{{CreateCase}}</div>
</div>

<div class="q-pa-lg">
We are locating a service provider<br/><br/>
What's next?<br/>
We are in the process of locating a service provider for you.<br/><br/>
Please check back for a status on your request or press the refresh button.
</div>


  </div>
<q-btn @click="$router.push('/')" push color="secondary">&nbsp;&nbsp;&nbsp;&nbsp; Cancel Request&nbsp;&nbsp;&nbsp;&nbsp;</q-btn>
<br/>
<br/>
<q-btn @click="$router.push('/')" icon="local phone" push color="secondary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Questions&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</q-btn>
<br/>
<br/>
<q-btn @click="$router.push('/app/home')" push color="secondary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Return To Home&nbsp;&nbsp;&nbsp;</q-btn>
</div>
</template>

<!--moved all the scripts to the seperate file CreateCaseScript.js-->
<script>

Vue.config.errorHandler = function (err,vm,info) {
     
      Vue.$log.debug('inside GlobalErrorHandling method of CreateCaseComponent.')
      Vue.$log.error(err.toString())
       Notify.create({
                color: 'orange',
                icon: 'error',
                textColor: '',
             message: 'Please call customer support' ,
            position: 'center',
           
           actions: [{ label: 'ok',handler: () => {console.log('dismissed')}}] })
      CommonLogging('App','error','CreateCaseComponent','user1@gmail.com','115.110.71.246',err)
     Vue.$log.debug('Exception has been logged serverside.')
}

import { QBtn, QIcon, QInput,QSpinnerDots } from 'quasar'
import axios from 'axios'
import { Notify } from 'quasar'
import Vue from 'vue'
import VueLogger from 'vuejs-logger'
const options = {
   // required ['debug', 'info', 'warn', 'error', 'fatal']
   logLevel :  'debug',
    stringifyArguments : true,
    showLogLevel : true,
   
    showMethodName : true,
    
    separator: '|',
   
    showConsoleColors: true
}

Vue.use(VueLogger,options)

export default {
  name: 'createcasecomponent',
  components: { QBtn, QIcon, QInput,QSpinnerDots },
  data () {
    return {
      CreateCase: '',
      caseCreated: false
    }
  },
  mounted ()
  {
    var vm = this
    var aPassenger = this.$root.PassengerCount
    var aLandMark = this.$root.LocLandmark
    var aAdditional = this.$root.LocAdditionalInfo
    var aService = this.$root.Service
    var aSchedule = this.$root.DateScheduled
    var aDesc =  aService + ' ' + aPassenger + ' passenger(s) Cross Streets: '+ aLandMark + ' More Info: '+ aAdditional + 'ScheduleDate: '+aSchedule;

    //alert (this.$root.PhoneNumber);

    let json = JSON.stringify({
      Phone: this.$root.PhoneNumber,
      VIN: this.$root.VIN,
      Service: aService,
      Desc: aDesc ,
      GeoLat: this.$root.LocLatt,
      GeoLong: this.$root.LocLong,
      Channel: 'Mobile'

    })
     var vm = this

      //axios.get(process.env.API + 'getcaseid/'+json)
      axios.post(process.env.API + 'postcaseid?json='+json,{
      headers: {
       'accept': 'application/json',
       'content-type': 'application/x-www-form-urlencoded'
     }
     }).then(function (response) {
          Vue.$log.info(response)
          Vue.$log.debug('inside getcaseid api call')
          var returnJson = response.data
          
          vm.$root.CaseId=returnJson.CaseNumber;
          vm.CreateCase = returnJson.CaseNumber;
          vm.caseCreated =true;
        }).catch((e) => {
          // console.log(e)
           
           this.$log.error(e)
           // swal("something went wrong !", "Please contact service admin.")
            Notify.create({
                color: 'orange',
                icon: 'error',
                textColor: '',
             message: 'Please call customer support' ,
            position: 'center',
           
           actions: [{ label: 'ok',handler: () => {console.log('dismissed')}}] })
            vm.UserID = this.$root.UserId
           CommonLogging('App','error',this.$options.name,vm.UserID,'115.110.71.246',e.stack.toString())
           Vue.$log.debug('Exception has been logged serverside.')
      })
      
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.CreateCaseComp
  margin-top 50px
  a
    color #35495E

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

.card
  color white

.case
  color #F2C037
</style>

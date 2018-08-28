<template>
  <div class="maincmp">
      <!--img src="~assets/dxc.png" width="30%" height="30%" id="logo" alt="ROAM" -->
      <div style="margin-top:65px">
              <a href="tel:+1-555-555-5555"><q-btn rounded color="negative">I NEED EMERGENCY HELP</q-btn></a>
      </div>
      <div class="q-ma-lg">
    Need Roadside assistance right now?<br/> 
</div>

    <div class="row justify-center" style="margin-top:10px;" >
       <div class="col-1"></div>
      <div class="col-5">
         <!-- <a href="tel:+1-555-555-5555"> -->
           <q-btn flat @click="OpenTel" class="btnSetting" >
          <img src="~assets/SpeakNew.png" class="ImgSetting" />
          <font class="TextStyle">Speak To an Agent</font>
        </q-btn>
        <!-- </a>  -->
        <!--<q-icon name="lock" color="yellow" size="70px" style="padding:10px;"/>-->
      </div>
      <div class="col-5">
        <q-btn flat @click="SetCaseType('CreatACase')" class="btnSetting">
          <img src="~assets/CreateCase.png" class="ImgSetting" />
          <font class="TextStyle">Create a Case</font>
        </q-btn>  <!--<q-icon name="donut small" color="yellow" size="70px" style="padding:10px;"/>-->
      </div>
     <div class="col-1"></div>

  <div class="col-1"></div>
  <div class="col-5">
    <q-btn flat @click="SetCaseType('ExistingCase')" class="btnSetting">
      <img src="../assets/ExistingCase.png" class="ImgSetting"/>
      <font class="TextStyle">Open An Existing Case</font>
    </q-btn>    <!--<q-icon name="gesture" color="yellow" size="70px" style="padding:10px;" />-->
    </div>
  
  <div class="col-1"></div>

</div>
 </div>
</template>


<script>
Vue.config.errorHandler = function (err,vm,info) {
     Vue.$log.debug('inside GlobalErrorHandling method.')
      Vue.$log.error(err.toString())
      Notify.create({color: 'orange',icon: 'error',textColor: '',message: 'Please call customer support' ,
            position: 'center',
           actions: [{label: 'ok',handler: () => {
        console.log('dismissed')
      }
    }]  
    })          
    CommonLogging('App','error','MainComponent','user1@gmail.com','115.110.71.246',err)
    Vue.$log.debug('Exception has been logged serverside.')
}

import { QBtn, QIcon } from 'quasar'
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
  name: 'maincomponent',
  components: {
    QBtn,
    QIcon
  },
   data () {
    return {
      //UserAuthenticated: false

    }
  },
  methods:{
    SetCaseType(aCaseType){
       console.log(aCaseType)
       //this.$root.Service = aServiceType
       
       this.$root.CaseType=aCaseType;
       console.log(this.$root.CaseType)
       console.log('Maincomp: UserAuthenticated='+ this.$root.UserAuthenticated)
       if (this.$root.UserAuthenticated){
          console.log('User authentication is true');
          //console.log('aCaseType = '+ aCaseType);
          if(aCaseType==='CreatACase'){
            console.log('in if statement = '+ aCaseType);
            this.$router.push('/app/servicescomp')
          }
           else if(aCaseType==='ExistingCase'){
            this.$router.push('/app/casedetailscomp')
          }
          else {
            this.$router.push('../login')
          }
       } else {
            this.$router.push('../login')
          }      
    },
OpenTel(){

  window.open("tel:+1-555-555-5555")
}

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables';
.maincmp {
  margin-top: 50px;
  color: white;

  a {
    color: #35495E;
  }
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.btnSetting
{
  width: 120px;
  height: 120px;
  margin-top: 10px;
  margin-bottom: 10px;

}
.ImgSetting
{
  width: 80px;
  height: 80px;

 }
 .TextStyle
 {
   color: #F2C037;
   margin-top:5px;
   font-size:10pt;
 }
</style>

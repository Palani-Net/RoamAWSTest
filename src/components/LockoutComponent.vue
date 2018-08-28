<template>
  <div class="Lockoutcomp">
    <!--<q-btn rounded push color="negative">I NEED EMERGENCY HELP</q-btn>-->
    <div class="row ">
      <div class="col-1">
      </div>
      <div class="col-10 q-subheading q-mt-lg" >
        To assist you with the correct service request, please answer the below questions.
      </div>
      <div class="col-1">
      </div>
    </div>

    <div class="row justify-start q-mt-lg"  >
      <div class="col-1">
    </div>
     <div class="col-10">
       <div class="q-mt-lg q-ml-xs" v-for="(lockquestn, indx) in Jsoncontent.Questions" v-bind:key="indx" 
              :id="lockquestn.id" :ref="lockquestn.id">
         <span class="q-mt-lg q-title">  {{indx+1}}.  {{lockquestn.description}} </span>
          <br/>                  
          <q-btn-toggle toggle-color="secondary" color="warning" class="q-mt-sm" push @input="OptionAction(indx)" 
          v-model="arrSelectOpt[indx]" :options = optionCtrlAppend(lockquestn.answers.options) />             
        </div>      
    </div>
     <div class="col-1">
    </div>
    </div>
    <div class="row justify-start q-mt-sm"  >
      <div class="col-1">
      </div>
      <div class="col-10">
        <q-modal v-model="showModal" minimized id="modl" content-classes="q-pa-lg">
          <span>  <b>Note:</b> {{ PopupText }} 
          </span>
          <br/>
          <q-btn color="secondary" rounded @click="showModal = false" label="Close" class="q-mt-sm vertical-bottom" />
        </q-modal>
      </div>
      <div class="col-1">
      </div>
    </div>
    <div class="row q-my-lg"  >
      <div class="col-1">
      </div>
      <div class="col-10">
        <q-btn @click="ValidateSelection" push color="secondary" >
          CONTINUE ROADSIDE REQUEST </q-btn>
        </div>
        <div class="col-1">
        </div>
    </div>

  <div class="row q-my-md" >
    <div class="col-1">
    </div>
    <div class="col-10">         
        <q-alert v-if="DisplayAlert" type="negative">
          Please answer our question
        </q-alert>
    </div>
    <div class="col-1">
    </div>
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
    CommonLogging('App','error','LockoutComponent','user1@gmail.com','115.110.71.246',err)
    Vue.$log.debug('Exception has been logged serverside.')
  }

  import { QBtn, QIcon, QInput, QRadio, QPopover } from 'quasar'
  //import Jsoncontent from 'src/store/LockoutQuestionaires.json'
  import axios from 'axios'
  import Vue from 'vue'
  import VueLogger from 'vuejs-logger'
  import { Notify } from 'quasar'
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
    name: 'lockoutcomponent',
    components: { QBtn, QIcon, QInput, QRadio, QPopover },
    data () {
      return {
        ip: '',
        option: '',
        showModal: false,
        optionSelected:'',
        PopupText : "Sample text for modal",
        Jsoncontent:[],
        //Jsoncontent, // test local
        arrSelectOpt: [],
        lastQuestn: null,
        DisplayAlert: false
      }
    },
    mounted()
    {     
    var vm = this   
    axios.get(process.env.API + 'questionnaires/lockout/')
     .then(function (response) {
       console.log(response)    
        vm.Jsoncontent = response.data
        console.log(vm.Jsoncontent)
        vm.arrSelectOpt = new Array(vm.Jsoncontent.Questions.length)   
     }).then(()=>vm.DisplayQuestions()).catch(error=>{
      console.log(error)      
     })    
    //to test local
    //this.DisplayQuestions()
    },
    methods: {
      DisplayQuestions()
      {
        var vm=this     
         for (var i in vm.Jsoncontent.Questions) {
          var id = vm.Jsoncontent.Questions[i].id
          var elmnt = document.getElementById(id)
          if (elmnt!=null){
            if (i==0){
            elmnt.style.display= 'block'
            vm.lastQuestn = id
            }
            else {
              elmnt.style.display= 'none'
            }
          }          
        }        
      },
      optionCtrlAppend(optctrls)
      {     
       var jsondat = []
       for (var i in optctrls)
        {
          jsondat.push ({
            label: optctrls[i].name,
            value: optctrls[i].link  + '|' + optctrls[i].shortdesc
          })
        }      
      return jsondat
    },
    OptionAction(indx)
    {
      this.DisplayAlert = false  
      var vals = this.arrSelectOpt[indx].split('|') // values has link and short desc
      var shortdesc = vals[1] //short description
      var lnks = vals[0].split(',') // get only the link
      var lnk = ''
      if (lnks.length>1) {
        lnk = lnks[1]
      } 
      else {
        lnk = lnks[0]
      }
     var ispopup = false
     //First - check the popups
      for (var i in this.Jsoncontent.Popups) {               
        if (this.Jsoncontent.Popups[i].id == lnk) {
            this.PopupText = this.Jsoncontent.Popups[i].description
            this.showModal =true
            ispopup = true     
        }       
      }
      //if (ispopup == true)
      //{
       for (var j in this.Jsoncontent.Questions) {
         if (j<=indx)
         {
          //alert('insdie yes loop-' + j)
         }
         else
         {
           //alert('insdie no loop-' + j)
           var elm = document.getElementById(this.Jsoncontent.Questions[j].id)
           if (elm!=null)
              elm.style.display = 'none'
            //clear the model value
          if (this.arrSelectOpt[j] !=null)
              this.arrSelectOpt[j] = ''    
          }      
        }
        //return
      //}
      //Second - display the questions      
      var elmnt = document.getElementById(lnk)
      if (elmnt!=null)
      {
        elmnt.style.display= 'block'
        this.lastQuestn = lnk
      }      
    },
    showDialog () {
        if(this.optionSelected==='Yes')
        {
          this.showModal =true;
        }
        else {
          this.showModal =false;
        }
      },
     ValidateSelection()
      {
        var vm = this   
        for (var i in vm.Jsoncontent.Questions) {
          if (vm.Jsoncontent.Questions[i].id==this.lastQuestn)
          {
            if(vm.arrSelectOpt[i]==null || vm.arrSelectOpt[i]==''){
              vm.DisplayAlert = true
              return
            }          
          }
        }
        //move to request component
        this.$router.push('requestcomp')   
      }

    }
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="stylus">
  @import '~variables';

  .Lockoutcomp {
    margin-top: 50px;
    font-size: 18px;
    color: white;
  }

  a {
    color: #35495E;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }


  .questnHeader {
    color: white;
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .questnInfo {
    background-color: grey-7;
    color: white;
    font-size: 12px;
  }

  .header {
    margin-left: 0px;
  }

  .ModalStyle {
    background-color: grayscale;
    align-content: left;
    font-size: 16px;
    padding: 8px;
  }
  </style>

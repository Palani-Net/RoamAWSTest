<template>
  <div class="requestcomp">

<div class="row" style="background-color:white;height:200px;margin-top:40px">
  <div class="col-12  q-mt-xs">
      <span class="LabelHeader carousel">Select Vehicle </span>
 </div>
  <div class="col-12">

        <q-carousel class="carousel" arrows style="width:100%;" v-model="slide" >
            <q-carousel-slide v-for="vehicle in UserProfile.Vehicle" v-bind:key="vehicle.VIN" >
                <img :src="vehicle.Image" />
             <br/>
             {{vehicle.make}}  {{vehicle.model}}
            </q-carousel-slide>
        </q-carousel>
  </div>
    </div>

    <div class="row justify-center q-mt-sm">
        <div class="col-2">
        </div>
         <div class="col-8">
             <span class="LabelHeader">Number of Passengers </span>
        </div>
         <div class="col-2">
        </div>
    </div>

<div class="row justify-center q-mt-sm" >
    <div class="col-2">
    </div>
     <div class="col-8">

         <q-btn-toggle v-model="PassengerCnt" color="warning"  rounded toggle-color="secondary"
         @input="SetPassengerCount(PassengerCnt)"
                        :options="[
                            {icon: 'person', label: 'One', value: '1'},
                            {icon: 'people', label: 'Two', value: '2'},
                            {icon: 'groupadd', label: 'Multiple', value: '3 plus'} ]"
                        />


    </div>
     <div class="col-2">
    </div>
</div>
<div class="row justify-center  q-mt-lg" >
    <div class="col-2">
    </div>
     <div class="col-8">
         <span class="LabelHeader">Vehicle Location</span>
    </div>
     <div class="col-2">
    </div>
</div>
<div class="row justify-center  q-mt-sm">
    <div class="col-2">
    </div>
     <div class="col-8">
         <q-btn @click="getVehicleLocation()" push color="secondary" class="full-width"> {{buttontext}}
    </q-btn>
    </div>
     <div class="col-2">
    </div>
</div>
<div class="row justify-center q-mt-sm">
  <div class="col-.5">
    </div>
     <div class="col-11">
        <div v-if="ShowMapDetails===true" align="center">
            <gmap-map
             :center="center"
             :zoom="16"
             style="width: 100%; height: 180px">
             <gmap-marker
               :key="index"
               v-for="(m, index) in markers"
               :position="m.position"
               :clickable="true"
               :draggable="true"
               @click="center=m.position">
             </gmap-marker>
            </gmap-map>
        </div>
    </div>
  <div class="col-.5">
</div>
</div>

<div class="row justify-center q-mt-sm">
        <div class="col-2">
        </div>
         <div class="col-8">
             <span class="LabelHeader">Schedule Service </span>
        </div>
         <div class="col-2">
        </div>
</div>

<div class="row justify-center q-mt-sm" >
    <div class="col-2">    
    </div>
     <div class="col-8">
        <q-btn-toggle
            v-model="DateScheduled"
            toggle-color="secondary"
            push @input="ServiceButton(DateScheduled)"
            color="warning" 
              :options="scheduleOptions"
        />
        
          <br/>
          <q-alert class="q-mt-sm" v-if="dateErrorVisible" type="negative">
                {{dateError}}
            </q-alert>
    </div>
     <div class="col-2">
    </div>
</div>       
<div class="row justify-center q-mt-sm">
  <div class="col-2">
  </div>
  <div class="col-8" >
        <div v-if="ShowGetDate===true" class="q-mt-sm">
           <q-datetime align="center" class="q-mt-sm" push inverted  color="secondary" type="datetime" v-model="date1" :min="min" :max="max"  
                float-label="Schedule Service Date" format='dddd MM-DD-YYYY hh:mm A' @input=SetScheduleDate(date1)  />           
        </div>
   </div>
   <div class="col-2">
    </div>
</div>

<div class="row justify-center q-mt-lg" >

    <div class="col-.5">
    </div>
     <div class="col-11 q-mb-sm">
         <span class="LabelHeader">Location: Landmark / Cross Street</span>
    </div>
     <div class="col-.5">
    </div>

    <div class="col-0.5">
    </div>
     <div class="col-11">
         <q-input type="text" v-model="Landmark" placeholder="Enter location description"
            name="landmark" dark color="warning"  value="" />

    </div>
     <div class="col-0.5">
    </div>
</div>
<div class="row justify-center q-mt-lg">
    <div class="col-0.5">
    </div>
     <div class="col-11 q-mb-sm">
         <span class="LabelHeader">Additional Notes </span>

    </div>
     <div class="col-0.5">
    </div>

    <div class="col-0.5">
    </div>
     <div class="col-11">
         <q-input type="textarea" v-model="AdditionalInfo" placeholder="Enter additional important details that will help us"
        name="additional" color="warning" dark  value="" :min-rows="8" :max-height="100" />

    </div>
     <div class="col-0.5">
    </div>
  </div>

    <div class="row justify-center q-my-lg">
    <div class="col-2">
    </div>
     <div class="col-8" >
        <q-btn push color="secondary" @click="LoadRequestData" class="full-width"> {{submitButtonText}}
    </q-btn>
    </div>
     <div class="col-2">
    </div>
  </div>
</div>
</template>

<!--moved all the scripts to the seperate file RequestScript.js-->
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
      CommonLogging('App','error','RequestComponent','user1@gmail.com','115.110.71.246',err)
      Vue.$log.debug('Exception has been logged serverside.')
}

import { Notify } from 'quasar'
import { QBtn, QIcon, QInput, QSlider, QCarousel, QCarouselSlide, QBtnGroup, QSpinnerOval,QDatetime,QAlert,date,QBtnToggle } from 'quasar'
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
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
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyALt1wn0FWOr6yEs1E5-H7x_tDN0ViauD0',
    v: 3
    // libraries: 'places', //// If you need to use place input
  }
})
const today = new Date()
const { addToDate, subtractFromDate } = date
export default {
  name: 'requestcomponent',
  components: { QBtn, QIcon, QInput, QSlider, QCarousel, QCarouselSlide, QBtnGroup, QSpinnerOval,QDatetime },
  data() {
    return {
    UserID: '',
    UserID2: '',
    selectedValue: 1,
    ScheduleType: 'Schedule Service',
    DateScheduled: 'immediate',
    slide: 0,
    PassengerCnt : '0',
    UserProfile: '',
    ShowDetails: 'false',
    ShowMapDetails: 'false',
    ShowGetDate: 'false',
    dateErrorVisible: false,
    dateError: '',
    Landmark: ' ',
    AdditionalInfo: ' ',
    buttontext: '',
    showCars:false,
    date1: new Date(),
    min: subtractFromDate(today, {days: 0}),
    max: addToDate(today, {days: 30}),
    center: {lat: 10.0, lng: 10.0},
    markers: [{
       position: {lat: 10.0, lng: 10.0}
    }, {
        position: {lat: 11.0, lng: 11.0}
    }],
    startPos: {lat: 0, lng: 0},
    Vehicle:[{make:'',model:'',Year:'',VIN:'',Image:''}],
    submitButtonText:'CREATE CASE',
    scheduleOptions:[
                 {label: 'Immediate Service', value: 'immediate'},
                 {label: 'Schedule Service', value: 'Schedule'}
              ]

    
    }
  },
  mounted()
  {
    var vm = this
    vm.DateScheduled=null;
    vm.UserID = this.$root.UserId
    vm.buttontext = 'Show vehicle location'
    axios.get(process.env.API + 'getuserbyid/' + vm.UserID )
     .then(function (response) {
      Vue.$log.info(response)
               vm.UserProfile = response.data
               //console.log('vehicle=' + vm.UserProfile.Vehicle)
               Vue.$log.info('vehicle=' + vm.UserProfile.Vehicle)
               Vue.$log.debug('inside getuserbyid api call.')
               vm.$root.VehicleArray = vm.UserProfile.Vehicle;
               
               
              
     }).catch((e) => {         
        console.log(e)
        this.$log.error(e)
         this.$log.debug('exception has been occured while calling api getuserbyid')
         //swal("something went wrong !", "Please contact service admin.")
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

     vm.ShowDetails = true;
     vm.ShowMapDetails = false;
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
                //lat: '40.4173',
                //lng: '-82.9071'
            };
            vm.startPos.lat = pos.lat;
            vm.startPos.lng = pos.lng;
            vm.center.lat = pos.lat;
            vm.center.lng = pos.lng;
            vm.markers[0].position.lat = pos.lat;
            vm.markers[0].position.lng = pos.lng;
            vm.$root.LocLatt = pos.lat;
            vm.$root.LocLong = pos.lng;
        });
    }

    if (this.$root.DateScheduled !=''){
        console.log("existing case")
        vm.submitButtonText="UPDATE CASE";
        vm.ScheduleType='Reschedule Service';
        console.log("date scheduled="+this.$root.DateScheduled)
        console.log("num Pass"+this.$root.NumberOfPassengers);
         vm.SetPassengerCount(this.$root.NumberOfPassengers);
        if (this.$root.DateScheduled =='immediate'){
            vm.date1 = null
            vm.ServiceButton('immediate');
        } else {
            
           vm.scheduleOptions[1].label='Reschedule Service';
            var actualScheduledDate = this.$root.DateScheduled;
            vm.ServiceButton('Scheduled');
            console.log('actualDate='+actualScheduledDate)
            vm.date1 = new Date(actualScheduledDate);
            //vm.date1 = new Date('2018-03-19T00:00:00')
            console.log("date1="+vm.date1)
            vm.SetScheduleDate(vm.date1);
            
        }
         

        vm.PassengerCnt=this.$root.NumberOfPassengers;
        var vin = this.$root.VIN;
        console.log("vin="+vin);
        //vm.UserProfile.Vehicle.VIN=vin;
        vm.markers[0].position.lat = this.$root.LocLatt;
        vm.markers[0].position.lng = this.$root.LocLong; 
        vm.CaseId=this.$root.CaseId;
        
        vm.Landmark=this.$root.StreetLocation;
        vm.LocAdditionalInfo=this.$root.LocAdditionalInfo;
        vm.PhoneNumber=this.$root.PhoneNumber;
      
        //vm.DateScheduled='Scheduled'
        
        var indexfound = vm.getVehicleIndex(this.$root.VehicleArray, vin);
        vm.slide=indexfound+1;
        
    } else {
        vm.submitButtonText="CREATE CASE";
        vm.PassengerCnt='1';
        vm.SetPassengerCount(1);
        vm.PhoneNumber=this.$root.PhoneNumber;
        vm.ServiceButton('immediate');

    }


  },
  methods:{
 
  SetPassengerCount(num)
  {
      var vm = this
      vm.$root.PassengerCount = num
  },
LoadRequestData() {
    if (this.UserProfile != '')
    {
        var vm = this
         if (vm.DateScheduled=='Schedule'){
             
            if (!date.isValid(vm.date1)) {
                vm.dateErrorVisible = true;
                vm.dateError = 'Please enter a schedule date, if you require immediate service, click the Immediate Service button'
            }
        }


        if (vm.dateErrorVisible != true) {
        
        var mobile = this.UserProfile.UserDetails.mobile
        this.$root.PhoneNumber= mobile
        vm.$root.LocLandmark = vm.Landmark
        vm.$root.LocAdditionalInfo = vm.AdditionalInfo
        vm.$root.VIN = this.UserProfile.Vehicle[vm.slide].VIN
        //alert(vm.$root.UserId)
        //alert(vm.slide)
        //alert(vm.$root.VIN)
        //alert(vm.$root.PassengerCount)
        //alert(vm.$root.LocLatt)
        //alert(vm.$root.LocLong)
        //alert(vm.$root.LocLandmark)
        //alert(vm.$root.LocAdditionalInfo)
        this.$router.push('createcasecomp')
        } 
            
       

    }
  },
   getVehicleLocation()
    {
      var vm = this
      if (vm.ShowMapDetails===true)
      {
          vm.buttontext = 'Show vehicle location'
          vm.ShowMapDetails = false;
      } else
      {
          vm.ShowMapDetails= true;
          vm.buttontext = 'Hide vehicle location'
      }
   },
   ServiceButton(aServiceType){
       console.log('aServiceType='+aServiceType)
      if (aServiceType==='immediate'){
          console.log('should exec ImmediateService method')
          this.ImmediateService();
          
      } else {
          console.log('should exec ScheduleService() method')
          this.ScheduleService();
      }
   },
    ImmediateService(){
      var vm = this
      vm.date1=null;
      vm.$root.DateScheduled='immediate';
      vm.DateScheduled='immediate'
     
      vm.dateErrorVisible = false;
      vm.dateError = '';
      vm.ShowGetDate = false;

  },
  ScheduleService() {
     var vm = this
     vm.$root.DateScheduled = 'Schedule'
     vm.DateScheduled = 'Schedule'
     vm.ShowGetDate = true;

  },
  SetScheduleDate(aDate){
    var vm = this
    console.log('aDate='+aDate);
    //console.log('Date='+vm.date1);
    var selectdate = new Date(aDate);
    console.log("selectdate = "+selectdate);
    if (selectdate < Date.now()){
        console.log('aDate is less than now')
        vm.dateErrorVisible = true;
        vm.dateError = 'Schedule date must be a future date'
    } else {
      var formatdate =   new Date(aDate)
      var strDate = formatdate.toISOString();
       console.log('string date = ',strDate);
       vm.dateErrorVisible = false;
       vm.dateError = '';
       //vm.$root.date1=strDate;
       vm.date1=strDate;

    }

    
   
  },
   getVehicleIndex(array, searchValue) {
       console.log('array='+array + ' and searchvalue='+searchValue)
       var length = array.length;
       console.log("length="+length)
       for(var i = 0; i < length; i++) {
           console.log("array index="+i+" arrayvalue="+array[i].VIN);

          if(array[i].VIN == searchValue) 
              return i;
       }
       return -1;
         
  }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.requestcomp
  margin-top 20px
  a
    color #35495E

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

.LabelHeader
{
font-size: 18px;
color: white;


}
.NumberTxt
{

font-size : 32px;
width : 50px;

}
.carousel
{
  color:#555;
}
</style>

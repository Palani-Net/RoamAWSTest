<template>
<div class="trackcasecomp">   
   <span class="LabelHeader">
       Technician's Location Status
   </span>
   <br/>
    <div class="row justify-center q-mt-sm">
        <div class="col-0.5">
        </div>
        <div class="col-11">
            <q-list dense>
                <q-item>
                    <q-item-side class="LabelTxt">
                      Technician Name:
                    </q-item-side>
                    <q-item-main class="CaseTxt">John Brown</q-item-main>
                </q-item>
                <q-item>
                    <q-item-side class="LabelTxt">
                      Mobile Number:
                    </q-item-side>
                    <q-item-main class="CaseTxt">{{TechnMobile}}</q-item-main>
                </q-item>                 
                <q-item>
                    <q-item-side class="LabelTxt">
                      Distance:
                    </q-item-side>
                    <q-item-main class="CaseTxt">{{DistanceMX}}</q-item-main>
                </q-item>
                <q-item>
                    <q-item-side class="LabelTxt">
                      ETA:
                    </q-item-side>
                    <q-item-main class="CaseTxt">{{TimeMX}}</q-item-main>
                </q-item>
            </q-list>          
        </div>
        <div class="col-0.5">
        </div>
    </div>

    <div class="row justify-center q-mt-md">
        <div class="col-.5 q-my-xl">
        </div>
        <div class="col-11">
            <div align="center">
                <gmap-map ref="mymap"
                    :center="center"
                    :zoom="12"
                    style="width: 100%; height: 350px">
                        <gmap-marker
                            :key="index"
                            v-for="(m, index) in markers"
                            v-if="m.position.lat!=0.0"
                            :position="m.position"
                            :clickable="true"
                            :draggable="true"
                            :icon = m.icon                                                               
                            @click="center=m.position">
                        </gmap-marker>
                </gmap-map>
            </div>                       
            <!-- <span class="LabelText q-mt-xl"> 
                Distance - {{DistanceMX}}, ETA - {{TimeMX}}
            </span> -->
        </div>
        <div class="col-.5">
        </div>
    </div>

    <div class="row justify-center q-my-md">
        <div class="col-1"></div>
        <div class="col-10">
            <q-btn push @click="$router.push('casedetailscomp')" color="secondary">Back </q-btn>
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
    CommonLogging('App','error','TrackCaseStatusComponent','user1@gmail.com','115.110.71.246',err)
    Vue.$log.debug('Exception has been logged serverside.')
}
import { QBtn, QIcon, QInput, QSlider, QCarousel, QCarouselSlide, QBtnGroup, QSpinnerOval } from 'quasar'
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
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
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD_GD8QAyMPXjL6T9iOgoxKQgYu-HtYT4Q',
     //'AIzaSyALt1wn0FWOr6yEs1E5-H7x_tDN0ViauD0',
    v: 3
    // libraries: 'places', //// If you need to use place input
  }
})
var LocateAuto
var cntr = 1
var bounds
export default {
  name: 'trackcasestatuscomponent',
  components: { QBtn, QIcon, QInput, QBtnGroup, QSpinnerOval },
  data() {
    return {    
    ShowMapDetails: 'false',
    Landmark: '',
    AdditionalInfo: '',
    buttontext: '',
    showCars:false,
    distance : 0.00,
    techpos: {lat: 12.927923, lng: 77.627108},
    techlatstart: 0.0000000,
    techlngstart: 0.0000000,
    techlngAdd: 0.0932349,
    iconimg : {url:'../assets/logo.png'},
    center: {lat: 10.0, lng: 10.0},
    markers: [
        {
        position: {lat: 10.0, lng: 10.0}     
        },
        {
        position: {lat: 0.0, lng: 0.0},
        icon:  {url:'../assets/Tow2.png'}        
        }
    ],
    startPos: {lat: 0, lng: 0},
    DistanceMX: '0.0',
    TimeMX: '0.0',
    TechnName: 'XXXXXX',
    TechnMobile: '555-555-5555'
    }    
  },
  mounted()
  {
    var vm = this
    vm.UserID = this.$root.UserId
    
    // axios.get(process.env.API + 'getuserbyid/' + vm.UserID )
    //  .then(function (response) {
    //    console.log(response)
    //            vm.UserProfile = response.data
    //            console.log('vehicle=' + vm.UserProfile.Vehicle)
    //  })
        
    var maploaded = false
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
            console.log(pos.lat)
            console.log(pos.lng)
            vm.startPos.lat = pos.lat;
            vm.startPos.lng = pos.lng;
            vm.center.lat = pos.lat;
            vm.center.lng = pos.lng;
            vm.markers[0].position.lat = pos.lat;
            vm.markers[0].position.lng = pos.lng;
            //vm.markers[1].position.lat = 12.927923;
            //vm.markers[1].position.lng = 77.627108;
            //setting the navigation location for technician initially
            vm.techlatstart = pos.lat;
            vm.techlngstart = pos.lng + vm.techlngAdd            
            vm.markers[1].position.lat = vm.techlatstart;
            vm.markers[1].position.lng = vm.techlngstart;
            //call distance matrix service to calculate the distance and ETA
            vm.DistanceMatrixSvc()
            //call direction service to plot the route in the map
            vm.DirectionRenderService()
        });            
        //this.CallAutoFunc()
        }  
  },
  created(){    
    
  },
  methods:{  
//   DistanceCalcutalor(lat1, lon1, lat2, lon2) // not in use
//     {        
//       var R = 6371; // km
//       var dLat = this.toRad(lat2-lat1);
//       var dLon = this.toRad(lon2-lon1);
//       var lat1 = this.toRad(lat1);
//       var lat2 = this.toRad(lat2);

//       var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//         Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
//       var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//       var d = R * c;
//       //alert(d.toFixed(2))      
//       return d.toFixed(1);
//     },
// toRad(Value) // not in use
//     {
//         return Value * Math.PI / 180;
//     },
//   SetTechLocation() //not in use
//     {  
//         //API will b called in the future to get the lat and long value of 
//         //technician's location
//         //API CALL ***
//         //setting th temp value to reduce the distance
//         var lat1 = this.techlatstart //- 0.001
//         var lng1 = this.techlngstart - 0.0010000
//         //setting the position of technician marker
//         this.markers[1].position.lat = lat1;
//         this.markers[1].position.lng = lng1;
//         this.techlatstart = lat1
//         this.techlngstart = lng1
//         //calculating distance using lat and long values - manual
//         this.distance =  this.DistanceCalcutalor(this.markers[0].position.lat, this.markers[0].position.lng
//                                 , this.markers[1].position.lat, this.markers[1].position.lng)
//         console.log(lat1)
//         console.log(lng1)
//         cntr = cntr + 1
//         //call google's distance matrix service to caculate distance between the user and technician
//         //and to find duration to reach the destination
//         this.DistanceMatrixSvc()
//         //clear the timer after n times - will be removed in the future
//         if (cntr> 9) //92
//         { this.StopAutoFunc(); }
//     },
//     CallAutoFunc() //not in use
//     {
//        LocateAuto = setInterval(this.SetTechLocation, 5000)
//     },
//     StopAutoFunc() //not in use
//     {
//         clearInterval(LocateAuto)
//         alert('Technician arrived!')
//     },
    DistanceMatrixSvc()
    {      
        //bounds = new google.maps.LatLngBounds();
        var service = new google.maps.DistanceMatrixService();
        var origin = new google.maps.LatLng(this.markers[0].position.lat, this.markers[0].position.lng)
        var destination = new google.maps.LatLng(this.markers[1].position.lat, this.markers[1].position.lng)
        //bounds.extend(origin)
       // bounds.extend(destination)      
        service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: 'DRIVING',
            //transitOptions: TransitOptions,
            drivingOptions: {
                departureTime: new Date(Date.now()),// + N),  // for the time N milliseconds from now.
                trafficModel: 'bestguess' //'optimistic'
            },
            unitSystem: google.maps.UnitSystem.IMPERIAL // UnitSystem,
            //avoidHighways: Boolean,
            //avoidTolls: Boolean,
        }, (response, status) => {
            console.log(response)         
            if (status == 'OK') {
                var origins = response.originAddresses;
                var destinations = response.destinationAddresses;
                console.log('origin - ' + origins)
                console.log('destination - ' + destinations)
                for (var i = 0; i < origins.length; i++) {
                    var results = response.rows[i].elements;
                    for (var j = 0; j < results.length; j++) {
                        var element = results[j];
                        var distance = element.distance.text;
                        var duration = element.duration.text;                       
                        this.DistanceMX = distance
                        this.TimeMX = duration
                        var from = origins[i];
                        var to = destinations[j];
                    }
                }
            }
        });
    //this.$refs.mymap.fitBounds(bounds);
    //map.fitBounds(bounds)
    //map.panToBounds(bounds)
    },
    DirectionRenderService()
    {
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var orgn = new google.maps.LatLng(this.markers[0].position.lat, this.markers[0].position.lng)
        var destn = new google.maps.LatLng(this.markers[1].position.lat, this.markers[1].position.lng)

        var request = {
            origin: orgn,
            destination: destn,
            travelMode: 'DRIVING',
            drivingOptions: {
                    departureTime: new Date(Date.now()),// + N),  // for the time N milliseconds from now.
                    trafficModel: 'bestguess' //'optimistic'
                },
            //provideRouteAlternatives: true        
        };
        directionsDisplay.setMap(this.$refs.mymap.$mapObject)
        directionsService.route(request, function(response, status){
            console.log(response)
            if (status == 'OK') {
                console.log("Directions service successful")
                directionsDisplay.setDirections(response)
            }
            else {
                console.log("error :" + status)
            }
        });  
    }  
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.trackcasecomp
  margin-top 60px
  a
    color #35495E

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

.CaseTxt
  font-size 100%
  color orange
  font-weight: bold
  
.LabelTxt
  font-size 100%
  color white
  font-weight: normal
  
.LabelHeader
{
font-size: 18px;
color: white;
}
.NumberTxt
{
font-size : 24px;
width : 50px;
color: yellow;
}

</style>

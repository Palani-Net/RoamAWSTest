<template>
<div class="CaseDetailscomp" v-if=" this.existingCases === true ">
    <!--<q-btn rounded push color="negative">I NEED EMERGENCY HELP</q-btn>-->

    <div class="row ">
        <div class="col-1"> </div>
        <div class="col-10 q-title" >
            <span v-if="numofcases === 1 ">You Have One Active Case</span>
            <span v-else>To view Details please select from one of the Case ID's below</span>
            <br/><br/><span class="LabelTextwhite">Driver Name:</span><span class="CaseText"> {{drivername}}</span>
            <br/><span class="LabelTextwhite">Mobile Number:</span> <span class="CaseText">{{drivermobile}}</span>
        </div>
    </div>

       <span class="row justify-start q-mt-sm"  />
        <div class="case q-headline q-mt-lg">

            <p v-for="(usercase, indx) in CaseDetails.UserCaseDetails" v-bind:key="usercase.caseid">
                <!--span  v-for="idx in this.thislen" v-bind:key="idx"-->
                <br/>
                <q-list dense>
                    
                    <q-spinner-dots v-if="caseCreated!==true" size="40" color="warning" />
                    <q-collapsible v-model="models[indx].modelname.name" icon="explore" :label=  usercase.caseid class="CaseText">
                    <!--q-collapsible v-model="usercase.vmodelstate" icon="explore" :label= usercase.caseid class="CaseText"-->
                        <div>
                            <q-list dense style="background-color:white" >
                                <q-item class="col-1">
                                <q-item-side class="LabelText">
                                    Service Technician assigned : 
                                </q-item-side>
                                    <span v-if=" usercase.caseActive === true">
                                        <q-item-main class="CaseText"> Yes </q-item-main>
                                    </span>
                                    <span v-else>
                                        <q-item-main class="CaseText"> In Progress </q-item-main>
                                    </span>
                                </q-item>
                                 <q-item class="col-1">
                                    <q-item-side class="LabelText">
                                        Service Request:
                                    </q-item-side>
                                    <q-item-main class="CaseText">{{usercase.serviceType}} </q-item-main>
                                </q-item>
                                <q-item class="col-1">
                                    <q-item-side class="LabelText">
                                        Number of Passengers:
                                    </q-item-side>
                                    <q-item-main class="CaseText">{{usercase.nomofPassengers}} </q-item-main>
                                </q-item>
                                <q-item class="col-1">
                                    <q-item-side class="LabelText">
                                        Vehicle Make:
                                    </q-item-side>
                                    <q-item-main class="CaseText">{{usercase.vehiclemake}} </q-item-main>
                                </q-item>
                                <q-item class="col-1">
                                    <q-item-side class="LabelText">
                                        Vehicle Model:
                                    </q-item-side>
                                    <q-item-main class="CaseText">{{usercase.vehiclemodel}} </q-item-main>
                                    <q-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img :src="usercase.Image" width="70%" height="70%"/></q-item>
                                </q-item>
                                <q-item class="col-1">
                                    <q-item-side class="LabelText">
                                        Vehicle Year:
                                    </q-item-side>
                                    <q-item-main class="CaseText">{{usercase.vehicleyear}} </q-item-main>
                                </q-item>
                                    <q-item class="col-1">
                                    <q-item-side class="LabelText">
                                        Vehicle VIN:
                                    </q-item-side>
                                    <q-item-main class="CaseText">{{usercase.vehiclevin}} </q-item-main>
                                </q-item>
                                <q-item class="col-1">
                                    <q-item-side class="LabelText">
                                        Vehicle Street Location:
                                    </q-item-side>
                                     <q-item-main> </q-item-main>
                                </q-item>
                                <q-item class="col-1">
                                    <q-item-side class="CaseText">
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{usercase.casestreet}}
                                    </q-item-side>
                                    <q-item-main> </q-item-main>
                                </q-item>
                                <q-item class="col-1">
                                    <q-item-side class="LabelText">
                                        Scheduled For: 
                                    </q-item-side>
                                    <q-item-main class="CaseText">{{formatDate(usercase.scheduled)}}</q-item-main>
                                </q-item>
                                <q-item class="col-1" v-if="usercase.caseActive===true">
                                    <q-item-side class="LabelText">
                                        Service Technician Name:
                                    </q-item-side>
                                    <q-item-main class="CaseText">{{usercase.servicetechnicianname}} </q-item-main>
                                </q-item>
                                <q-item class="col-1" v-if="usercase.caseActive===true">
                                    <q-item-side class="LabelText">
                                        Service Technician mobile:
                                    </q-item-side>
                                    <q-item-main class="CaseText">{{usercase.servicetechphone}}</q-item-main>
                                </q-item>
                            </q-list>
                        </div>
                        <br/>
                        <span v-if=" usercase.caseActive === true">
                            <!-- <q-btn push @click="send(usercase.caseActive,usercase.name,usercase.mobile,usercase.nomofPassengers,usercase.vehiclemake,usercase.vehiclemodel,usercase.vehicleyear,usercase.vehiclevin,usercase.casestreet,usercase.servicetechnicianname,usercase.servicetechphone)" color="secondary"> Status </q-btn> -->
                            <q-btn push @click="$router.push('trackcasecomp')" color="secondary">Track Technician </q-btn>
                        </span>
                         <span v-else>
                             <q-btn push @click="resched(usercase.caseActive,usercase.name,usercase.mobile,usercase.nomofPassengers,usercase.vehiclemake,usercase.vehiclemodel,usercase.vehicleyear,usercase.vehiclevin,usercase.casestreet,usercase.servicetechnicianname,usercase.servicetechphone,usercase.scheduled,usercase.serviceType)" color="secondary"> Schedule </q-btn>
                         </span>
                      
                        <span>
                          <q-btn push @click.native="prompt(usercase.caseid,indx)" color="secondary"> Cancel Case </q-btn>     
                        
                                        <q-dialog
                                            v-model="customDialogModel[indx].Dialogname.name"
                                            prevent-close
                                            @cancel="onCancel"
                                            @ok="onOk(usercase.caseid)"
                                         
                                        >
                                         <span slot="title" >Confirm</span>
                                         <span slot="message">Do you wish to cancel this case?</span>
                                                <template slot="buttons" slot-scope="props">
                                                <q-btn flat label="Yes" @click="props.ok"/>
                                                <q-btn flat label="No" @click="props.cancel" />
                                                </template>

                                        </q-dialog>
                        
                        </span> 
                    </q-collapsible>
                </q-list>

            </p>
          <q-btn  @click="$router.push('/app/home')" push color="secondary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</q-btn>   
        </div>
    </div>
<div class="CaseDetailscomp" v-else>
        <div class="row ">
            <div class="col-1"> </div>
            <div class="col-10 q-title" > You have no currently assigned cases.</div>
        </div>

         <div class="row ">           
            <div class="col-1"> </div>
            <div class="col-10 q-title" >
                <br/>
                 <q-btn  @click="$router.push('/app/home')" push color="secondary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</q-btn>   
            </div>
        </div> 
</div>
</template>

<script>
import { QBtn, QIcon, QInput, QRadio, QPopover, QDatetime, QCollapsible, QResizeObservable, QSpinnerDots, QDialog,date } from 'quasar'
import axios from 'axios'
// import axios from 'axios'
export default {
  name: 'casedetailscomponent',
  components: { QBtn, QIcon, QInput, QRadio, QPopover, QCollapsible, QResizeObservable, QSpinnerDots, QDialog  },
  data () {
        return {
        ip: '',
        option: '',
        mobile:'',
        UserProfile:'',
        CaseDetails:'',
        UserID:'',
        caseCreated:false,
        open:true,
        viewbutton:true,
        len:0,
        existingCases:false,
        numofcases:0,
        models:[],
        drivername:'',
        drivermobile:'',
        numofcases:0,
        customDialogModel:[],
        
        }
    },
   mounted()
  {
    var vm = this
    
    vm.UserID = vm.$root.UserId
    console.log("in CaseDetail userid="+vm.UserID)
    axios.get(process.env.API + 'GetCaseDetails/'+vm.UserID)
     .then(function (response) {
         //success
        console.log(response)
        vm.CaseDetails = response.data;
        vm.caseCreated=true;
        vm.viewbutton=false;
        vm.drivername = vm.CaseDetails.UserCaseDetails[0].name;
        vm.drivermobile = vm.CaseDetails.UserCaseDetails[0].mobile;
        vm.existingCases=true;
        console.log("loaded the page");
        
        vm.len = vm.CaseDetails.UserCaseDetails.length;
        

      
        if (vm.len >= 1){
            vm.existingCases=true;
        }

        for(var i=1;i<vm.len+1;i++){
           vm.models.push ({
               modelname: {name : false}
            }),
            vm.customDialogModel.push ({
               Dialogname: {name : false}
            })
        }

       if(vm.len === 1) {
           vm.numofcases=1;
           vm.models[0].modelname.name = true;
         }
    })
    .catch((error) => {
        if(error.response){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }else if(error.request){
            //the request was made but no response was recieved.
            console.log(error.request);
        }else{
            //Something happened in setting up the request that triggered an Error
            console.log('Error',error.message);
        }
       console.log(error.config); 
    })
   
  },
  methods: {
        resched(caseActive,name,mobile,nomofPassengers,vehiclemake,vehiclemodel,vehicleyear,vehiclevin,casestreet,servicetechnicianname,servicetechphone,servicescheduled,servicetype){
            this.$root.Activecase =caseActive;
            this.$root.VehicleOwnerName=name;
            this.$root.VehicleOwnerMobile=mobile;
            this.$root.NumberOfPassengers=nomofPassengers;
            this.$root.VehicleMake=vehiclemake;
            this.$root.VehicleModel=vehiclemodel;
            this.$root.VehicleYear=vehicleyear;
            this.$root.VIN=vehiclevin;
            this.$root.StreetLocation=casestreet;
            this.$root.ServiceTechName=servicetechnicianname;
            this.$root.ServiceTechMobil=servicetechphone;
            this.$root.DateScheduled=servicescheduled;
            this.$root.Service=servicetype;
            this.$router.push('requestcomp')
        },
        send(caseActive,name,mobile,nomofPassengers,vehiclemake,vehiclemodel,vehicleyear,vehiclevin,casestreet,servicetechnicianname,servicetechphone){
            this.$root.Activecase =caseActive;
            this.$root.VehicleOwnerName=name;
            this.$root.VehicleOwnerMobile=mobile;
            this.$root.NumberOfPassengers=nomofPassengers;
            this.$root.VehicleMake=vehiclemake;
            this.$root.VehicleModel=vehiclemodel;
            this.$root.VehicleYear=vehicleyear;
            this.$root.VIN=vehiclevin;
            this.$root.StreetLocation=casestreet;
            this.$root.ServiceTechName=servicetechnicianname;
            this.$root.ServiceTechMobil=servicetechphone;
            this.$router.push('requestcomp')
        },
        prompt(caseid,index){
            this.customDialogModel[index].Dialogname.name=true;
          
        },
        cancel(caseid){
            //console.log("case id is "+ caseid);
            var vm = this
            vm.UserID = 'user2@gmail.com'
            axios.get(process.env.API +   'GetCaseDetails/'+vm.UserID) //'GetCaseDetails/'+vm.UserID
            .then(function (response) {
                console.log(response)
                vm.CaseDetails = response.data;
                console.log("loaded the page");
                vm.len = vm.CaseDetails.UserCaseDetails.length;
                if (vm.len >= 1){
                    vm.existingCases=true;
                    vm.drivername = vm.CaseDetails.UserCaseDetails[0].name;
                    vm.drivermobile = vm.CaseDetails.UserCaseDetails[0].mobile;
                    vm.caseCreated=true;
                    vm.viewbutton=false;
                    vm.models[0].modelname.name = true
                }else{
                    vm.existingCases=false;
                }

                if(vm.len === 1) {
                    vm.numofcases=1;
                    vm.models[0].modelname.name = true;
                }

            })
            .catch(function(e){
                alert("caught an error");
                this.errors.push(e)
            })
        },
        //deletes the case
        onOk (data) {this.cancel(data) },

        // when props.cancel() gets called - nothing happens Dialog closes
        onCancel () { },
        formatDate(aDate)
        {
            var vm = this
            var strDate = ''
            console.log("adate="+aDate)
            if (aDate === 'immediate'){
                strDate = aDate;
            } else {
               var formatdate =   new Date(aDate)
               var strDate = date.formatDate(formatdate, 'dddd MM-DD-YYYY hh:mm A')
            }
          
                  
          return strDate;

    }
                
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.CaseDetailscomp
  margin-top 50px
  font-size 18px
  color white

.CaseDetailsAddress
  margin-top 5px
  font-size 14px
  color orange

.CaseText
  font-size 77%
  color orange
  font-weight: bold

  
.LabelText
  font-size 80%
  color black
  font-weight: bold

.LabelTextwhite
  font-size 14px
  color white
  font-weight: bold


a
    color #35495E

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

h5
  color white

.questnHeader
{
color: white;
font-size: 20px;
margin-left : 10px;
margin-right : 10px;
}
.questnInfo
{
  background-color:grey-7;
color: white;
font-size: 12px;

}
.header
{
margin-left:0px;
}
.ModalStyle
{
  background-color : grayscale;
  align-content : left;
  font-style : italic;
  font-size: 16px;
  padding : 8px;
  
}

.ButtonStyle
{
  background-color : blue;
  
}

.col-1{
    height:25px;
}
</style>
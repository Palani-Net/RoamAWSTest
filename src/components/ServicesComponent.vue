<template>
  <div class="maincmp">
      <!--<img src="~assets/dxc.png" width="30%" height="30%" id="logo" alt="ROAM" >-->
      <div style="margin-top:65px">
              <q-btn rounded color="negative">I NEED EMERGENCY HELP</q-btn>
      </div>
      <div class="q-ma-lg">
    Need Roadside assistance right now?<br/> Choose the service and get connected to an agent
</div>

    <div class="row justify-center" style="margin-top:10px;" >
       <div class="col-1"></div>
      <div class="col-5">
        <q-btn flat @click="SetServiceType('lockout')" class="btnSetting" >
          
           <img src="../assets/lockout.png" class="ImgSetting" />
          <font class="TextStyle">Lock Out</font>
        </q-btn> <!--<q-icon name="lock" color="yellow" size="70px" style="padding:10px;"/>-->
      </div>
      <div class="col-5">
        <q-btn flat @click="SetServiceType('flattire')" class="btnSetting">
          <img src="../assets/FlatTire.jpg" class="ImgSetting" />
          <font class="TextStyle">Flat Tire</font>
        </q-btn>  <!--<q-icon name="donut small" color="yellow" size="70px" style="padding:10px;"/>-->
      </div>
     <div class="col-1"></div>

  <div class="col-1"></div>
  <div class="col-5">
    <q-btn flat class="btnSetting">
      <img src="../assets/towing.jpg" class="ImgSetting"/>
      <font class="TextStyle">Towing</font>
    </q-btn>    <!--<q-icon name="gesture" color="yellow" size="70px" style="padding:10px;" />-->
    </div>
  <div class="col-5">
    <q-btn flat class="btnSetting">
      <img src="../assets/jumpstart.jpg" class="ImgSetting"/>
      <font class="TextStyle">JUMP START</font>
      </q-btn>    <!--<q-icon name="toll" color="yellow" size="70px" style="padding:10px;"/>-->
    </div>
    <div class="col-1"></div>

  <div class="col-1"></div>
  <div class="col-5">
    <!--<q-icon name="battery charging full" color="yellow" size="70px" style="padding:10px;"/>-->
    <q-btn flat class="btnSetting">
      <img src="../assets/gas1.png" class="ImgSetting"/>
      <font class="TextStyle">FUEL</font>
      </q-btn>
      </div>
  <div class="col-5">
    <!--<q-icon name="supervisor account" color="yellow" size="70px" style="padding:10px;"/>-->
    <q-btn flat class="btnSetting">
      <img src="../assets/Others.png" class="ImgSetting"/>
      <font class="TextStyle">OTHERS</font>
      </q-btn>
  </div>
  <div class="col-1"></div>

</div>
 </div>
</template>

<!--moved all the scripts to the seperate file MainScript.js-->
<script>
import { QBtn, QIcon } from 'quasar'
export default {
  name: 'servicesecomp',
  components: {
    QBtn,
    QIcon
  },
  methods:{
    SetServiceType(aServiceType){
       console.log(aServiceType)
       this.$root.Service = aServiceType
       this.$root.DateScheduled='';
       if (this.$root.UserAuthenticated){
          console.log('User authentication is true');
          if (this.$root.Service==='lockout'){
            this.$router.push('lockoutcomp')
          }
          if (this.$root.Service==='flattire'){
            this.$router.push('flattirecomp')
          }
       } else {
         this.$router.push('../login')
       }
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

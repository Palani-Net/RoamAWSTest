<template>
  <div class="splash fixed-center" style="width:95%">
    <img src="~assets/logo_full.png"/>
    <h2>DISPATCH SERVICE</h2>
    <br/>
    <q-spinner-oval size="40" color="white" />
 </div>
</template>

<script>
import { QBtn, QIcon, QSpinnerOval } from 'quasar'
export default {
  name: 'Splash',
  components: { QBtn, QIcon, QSpinnerOval },
  mounted () {
    this.$root.UserAuthenticated = false;
    setTimeout(()=>this.$router.push('/app/home'), 2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'
h2
  color #F2C037
  font-weight 600
</style>

<template>
<div>
  <q-layout ref="layout" view="hHh lpr fff">
    <q-layout-header>
      <q-toolbar class='toolbarbkground'>
        <q-btn flat @click="showLeft = !showLeft">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          DISPATCH SERVICE
        </q-toolbar-title>
        <img src="~assets/logo_small.png" />
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer side="left" v-model="showLeft">
      <q-list-header class="menulogo"> </q-list-header>
      <q-item item to="/app/home">
        <q-item-main label="Home" />
      </q-item>
      <q-item item to="/app/servicescomp">
        <q-item-main label="Services" />
      </q-item>
      <q-item item to="/app/home">
        <q-item-main label="Dealers" />
      </q-item>
      <q-item item to="/app/home">
        <q-item-main label="Technology" />
      </q-item>
      <q-item item to="/app/home">
        <q-item-main label="Contact" />
      </q-item>
      <q-item link @click.native="openURL('https://d11tr1dje9ehqy.cloudfront.net/client.html')">
          <q-item-side icon="chat" />
      <q-item-main label="Chat Channel" sublabel="Digital Bot" />
        </q-item>
      <q-item item to="/app/logoutcomp">
          <q-item-main label="Logout" />
        </q-item>
    </q-layout-drawer>


    <q-page-container>
      <!-- Page insertion point -->
      <router-view></router-view>
    </q-page-container>

  </q-layout>
</div>
</template>

<script>
import { openURL} from 'quasar'
import {
  QLayout,
  QToolbar,
  QBtn,
  QIcon,
  QItemMain,
  QLayoutHeader
  
 
} from 'quasar'
export default {
  name: 'PageLayout',
  components: {
    QLayout,
    QToolbar,
    QBtn,
    QIcon,
    QItemMain,
    QLayoutHeader,
    openURL
  },
  data() {
    return {
      showLeft: true
    }
  },
    methods:{
    openURL
  }
}
</script>

<style>
.toolbarbkground {
  background-color: black;

}

.menulogo {
  background-color: black;
  height: 45px;
}
</style>

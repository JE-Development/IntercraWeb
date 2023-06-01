<template>
<div class="center-horizontal opacity-fade-in">
  <YesNoPopup :show="showPopup" :onPositive="yesClicked" :onNegative="noClicked">
    <div class="center-horizontal">
      <h2>Do you want to remove this plugin from this preset?</h2>
    </div>
  </YesNoPopup>
  <div>
    <SettingsPresetView/>
    <div class="white-border" v-if="activePlugins.length > 0">
      <PluginSettings
          v-for="(pl) in activePlugins"
          :name="pl"
      />
    </div>
  </div>
</div>
</template>

<script>

import SettingsPresetView from "./views/SettingsPresetView.vue";
import EventBus from "./intercraSystemCode/classes/EventBusEvent";
import PluginSettings from "./views/PluginSettings.vue";
import {PluginController} from "./intercraSystemCode/controllers/PluginController";
import YesNoPopup from "./views/YesNoPopup.vue";

export default {
  name: "SettingsPage",
  components: {YesNoPopup, SettingsPresetView, PluginSettings},

  created() {
    EventBus.addEventListener('display-plugins', (event) => {
      this.activePlugins = []
      let pc = new PluginController()
      let ap = event.data
      for(let i = 0; i < ap.length; i++){
        let name = pc.getNameFromId(ap[i])
        this.activePlugins.push(name)
      }
    })

    EventBus.addEventListener('show-popup', (event) => {
      this.showPopup = true
    })
  },

  mounted() {

  },

  data(){
    return{
      activePlugins: [],
      showPopup: false,
    }
  },

  methods: {
    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(true){
        return this.$cookies.set(key, value, 2147483647);
      }
    },
    yesClicked(){
      this.showPopup = false
      console.log("yes")
    },
    noClicked(){
      this.showPopup = false
      console.log("no")
    }
  },

}
</script>